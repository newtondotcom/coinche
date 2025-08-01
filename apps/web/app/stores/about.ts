import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { usePlayersStore } from './players';
import { useGameStore } from './game';

export const useAboutStore = defineStore('about', () => {
    const playersStore = usePlayersStore();
    const gameStore = useGameStore();

    const myId = ref<string>('0');
    const gameId = ref<string>('0');
    const isCreator = ref<boolean>(false);
    const timeToBidding = ref<boolean>(false);
    const timeDistrib = ref<boolean>(false);
    const turnToPlay = ref<boolean>(false);
    const turnToBidding = ref<boolean>(false);
    const authenticated = ref<boolean>(false);

    const atout = computed(() => gameStore.biddingElected.suite);

    const hand = computed(() =>
        playersStore.players.find((p) => p.id === myId.value)?.hands || [],
    );

    const colorAsked = computed(() => {
        if (Array.isArray(gameStore.currentPli) && gameStore.currentPli.length > 0) {
            return gameStore.currentPli[0].card.suite;
        }
        if (
            typeof gameStore.currentPli === 'object' &&
            gameStore.currentPli !== null &&
            !Array.isArray(gameStore.currentPli) &&
            Array.isArray(gameStore.currentPli.plays) &&
            gameStore.currentPli.plays.length > 0
        ) {
            return gameStore.currentPli.plays[0].card.suite;
        }
        return undefined;
    });

    const hasAtout = computed(() =>
        hand.value.some((card) => card.suite === atout.value),
    );

    const hasAskedColor = computed(() =>
        hand.value.some((card) => card.suite === colorAsked.value),
    );

    const highestAtoutInPli = computed(() => {
        const currentPli = Array.isArray(gameStore.currentPli) ? gameStore.currentPli : [];
        const atouts = currentPli.filter(
            (play) => play.card.suite === atout.value,
        );
        return atouts.length > 0
            ? Math.max(...atouts.map((p) => p.card.valueNum))
            : NaN;
    });

    const atoutIsAsked = computed(() => colorAsked.value === atout.value);

    return {
        myId,
        gameId,
        isCreator,
        timeToBidding,
        timeDistrib,
        turnToPlay,
        turnToBidding,
        authenticated,
        atout,
        hand,
        colorAsked,
        hasAtout,
        hasAskedColor,
        highestAtoutInPli,
        atoutIsAsked,
    };
});
