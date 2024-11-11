<template>
    <CoincheInterfaceDebug />
    <CoincheDeck />

    <CoincheRiver />

    <CoincheInterfaceAnnonces v-if="storeAbout.timeToAnnonce" />

    <div class="flex flex-row justify-between" v-if="storePlayers.players.length == 4">
        <CoincheInterfacePoints />
        <CoincheInterfaceTurn />
    </div>

    <CoincheInterfaceSavedAnnonce v-if="storeGame.last_annonce.suite != 'NA'" />

    <CoincheInterfaceJoin v-if="storePlayers.players.length < 4" />
</template>

<script setup lang="ts">
    import { useToast } from '@/components/ui/toast/use-toast';
    import { join, leave } from '@/lib/supabase/io';
    import translateEvent from '@/lib/utils/listener';
    import { createClient } from '@supabase/supabase-js';

    const { toast } = useToast();

    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    const route = useRoute();
    const id = route.query.id as string;
    const surname = route.query.surname as string;
    const gameId = route.query.gameId as string;
    storeAbout.setMyId(id);
    storeAbout.setMySurname(surname);
    storeAbout.setGameId(gameId);

    onMounted(async () => {
        await startListening();
        join();
    });

    onBeforeUnmount(async () => {
        leave();
    });

    async function startListening() {
        const config = useRuntimeConfig();
        const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

        const handleInserts = (payload: any) => {
            translateEvent(payload.new);
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
