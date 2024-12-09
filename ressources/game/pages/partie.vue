<template>
    <div>
        <!--<CoincheInterfaceDebug />-->
        <CoincheDeck />

        <OthersSoundboard />

        <CoincheRiver />

        <CoincheInterfaceAnnonces v-if="storeAbout.timeToAnnonce" />

        <div v-if="storePlayers.players.length == 4" class="flex flex-row justify-between">
            <CoincheInterfacePoints />
            <CoincheInterfaceTurn />
        </div>

        <CoincheInterfaceSavedAnnonce v-if="storeGame.last_annonce.suite != 'NA'" />

        <CoincheInterfaceJoin v-if="storePlayers.players.length < 4" />
    </div>
</template>

<script setup lang="ts">
    import { join, leave } from '@/lib/emitter/join';
    import translateEvent from '@/lib/utils/listener';
    import { createClient } from '@supabase/supabase-js';
    import type { EventInsert } from '@coinche/shared';

    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    const route = useRoute();
    const id = route.query.id as string;
    const gameId = route.query.gameId as string;
    if (!id || !gameId) {
        navigateTo('/');
    }
    storeAbout.setMyId(id);
    storeAbout.setGameId(gameId);

    onMounted(async () => {
        await startListening();
        join();
        if (window.location.hostname !== 'localhost') {
            window.onbeforeunload = (event: BeforeUnloadEvent) => {
                event.preventDefault();
                return 'Are you sure you want to leave this page? Changes you made may not be saved.';
            };
        }
    });

    onBeforeUnmount(async () => {
        leave();
    });

    async function startListening() {
        const config = useRuntimeConfig();
        const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

        const handleInserts = (payload: EventInsert) => {
            translateEvent(payload.new as EventInsert);
        };

        supabase
            .channel(gameId)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'Events' },
                handleInserts,
            )
            .subscribe();
    }
</script>
