<template>
    <CoincheDeck :pressed="cardPressed" />

    <CoincheRiver />

    <CoincheInterfaceAnnonces v-if="timeToAnnonce" :emitAnnonce="emitAnnonce" />

    <div class="flex flex-row justify-between" v-if="storePlayers.players.length == 4">
        <CoincheInterfacePoints />
        <CoincheInterfaceTurn />
    </div>

    <CoincheInterfaceSavedAnnonce v-if="storeGame.game.last_annonce.suite != 'NA'" />

    <CoincheInterfaceJoin v-if="storePlayers.players.length < 4" />
</template>

<script setup lang="ts">
    import { useToast } from '@/components/ui/toast/use-toast';
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

    let atout = ref<CardSuite>('spades');
    watch(atout, () => {});

    let turn = ref<boolean>(true);
    watch(turn, () => {});

    let timeToAnnonce = ref<boolean>(false);

    async function cardPressed(suite: CardSuite, value: CardValue) {
        const selectedCardIndex = storeAbout.hand.findIndex(
            (card) => card.suite === suite && card.value === value,
        );
        if (selectedCardIndex !== -1) {
            const [selectedCard] = storeAbout.hand.splice(selectedCardIndex, 1);
            const pli: ICard[] = [...storeAbout.pli, selectedCard];
            storeGame.setCurrentPli(pli);
        }
        storeAbout.hand = storeAbout.hand.filter(
            (card: ICard) => card.suite !== suite || card.value !== value,
        );

        console.log('Atout : ', atout.value);
        console.log('has atout : ', storeAbout.hasAtout);
        console.log('color Asked : ', storeAbout.colorAsked);
        console.log('atoutIsAsked  : ', storeAbout.atoutIsAsked);
        console.log('hasAskedColor : ', storeAbout.hasAskedColor);
        console.log('highestAtoutInPli : ', storeAbout.highestAtoutInPli);
    }

    async function emitAnnonce(ann: IAnnonce) {
        storeGame.setLastAnnonce(ann);
        console.log('Annonce faite : ', storeGame.game.last_annonce);
    }

    onMounted(async () => {
        startListening();
        await $fetch('/api/io/join', {
            method: 'POST',
            query: { id, gameId, surname },
        });
    });

    onBeforeUnmount(async () => {
        await $fetch('/api/io/leave', {
            method: 'POST',
            query: { id, gameId },
        });
    });

    async function startListening() {
        const config = useRuntimeConfig();
        const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

        const handleInserts = (payload: any) => {
            console.log('Change received!', payload.new);
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
