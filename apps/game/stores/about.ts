import type { CardSuite, ICard } from '@coinche/shared';

export const useAboutStore = defineStore('about', () => {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const myId = ref<string>('0');
    const gameId = ref<string>('0');
    const isCreator = ref<boolean>(false);
    const timeTobidding = ref<boolean>(false);
    const timeDistrib = ref<boolean>(false);
    const turnToPlay = ref<boolean>(false);
    const turnTobidding = ref<boolean>(false);

    const authentificated = ref<boolean>(false);

    const setTurnToPlay = (value: boolean) => {
        turnToPlay.value = value;
    };

    const setTurnTobidding = (value: boolean) => {
        turnTobidding.value = value;
    };

    const atout: ComputedRef<CardSuite> = computed(() => storeGame.last_bidding.suite);

    const hand: ComputedRef<ICard[]> = computed(
        () => storePlayers.players.find((p) => p.id === myId.value)?.hands || [],
    );

    const colorAsked: ComputedRef<CardSuite | undefined> = computed(() =>
        storeGame.current_pli.length > 0 ? storeGame.current_pli[0].card.suite : undefined,
    );

    const hasAtout: ComputedRef<boolean> = computed(
        () =>
            storePlayers.players
                .find((player) => player.id == myId.value)
                ?.hands.some((card: ICard) => card.suite === storeGame.last_bidding.suite) || false,
    );

    const hasAskedColor: ComputedRef<boolean> = computed(
        () =>
            storePlayers.players
                .find((player) => player.id == myId.value)
                ?.hands.some((card: ICard) => card.suite === colorAsked.value) || false,
    );

    const highestAtoutInPli: ComputedRef<number> = computed(() => {
        const atoutsInPli = storeGame.current_pli.filter(
            (c) => c.card.suite === storeGame.last_bidding.suite,
        );
        if (atoutsInPli.length === 0) return NaN;
        const orderedAtouts = atoutsInPli.sort((a, b) => b.card.valueNum - a.card.valueNum);
        return orderedAtouts[0].card.valueNum;
    });

    const atoutIsAsked = computed(() => colorAsked.value === atout.value);

    function setMyId(id: string) {
        myId.value = id;
    }

    function setCreator(creator: boolean) {
        isCreator.value = creator;
    }

    function setGameId(id: string) {
        gameId.value = id;
    }

    function setTimeTobidding(time: boolean) {
        timeTobidding.value = time;
    }

    function setTimeDistrib(time: boolean) {
        timeDistrib.value = time;
    }

    function setAuthentificated(value: boolean) {
        authentificated.value = value;
    }

    return {
        myId,
        setMyId,
        setCreator,
        hasAskedColor,
        hasAtout,
        highestAtoutInPli,
        atoutIsAsked,
        colorAsked,
        atout,
        hand,
        setGameId,
        gameId,
        isCreator,
        setTimeTobidding,
        timeTobidding,
        timeDistrib,
        setTimeDistrib,
        turnToPlay,
        turnTobidding,
        setTurnTobidding,
        setTurnToPlay,
        authentificated,
        setAuthentificated,
    };
});
