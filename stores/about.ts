export const useAboutStore = defineStore('about', () => {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const myId = ref<string>('0');
    const mySurname = ref<string>('player1');
    const gameId = ref<string>('0');
    const isCreator = ref<boolean>(false);
    const timeToAnnonce = ref<boolean>(false);
    const timeDistrib = ref<boolean>(false);

    const atout = computed(() => storeGame.last_annonce.suite);

    const hand: ComputedRef<ICard[]> = computed(
        () => storePlayers.players.find((p) => p.id === myId.value)?.hands || [],
    );
    const pli: Ref<ICard[]> = computed(() => storeGame.current_pli);

    const colorAsked: ComputedRef<CardSuite | undefined> = computed(() =>
        storeGame.current_pli.length > 0 ? storeGame.current_pli[0].suite : undefined,
    );

    const hasAtout: ComputedRef<boolean> = computed(
        () =>
            storePlayers.players
                .find((player) => player.id == myId.value)
                ?.hands.some((card: ICard) => card.suite === storeGame.last_annonce.suite) || false,
    );

    const hasAskedColor: ComputedRef<boolean> = computed(
        () =>
            storePlayers.players
                .find((player) => player.id == myId.value)
                ?.hands.some((card: ICard) => card.suite === colorAsked.value) || false,
    );

    const highestAtoutInPli: ComputedRef<number> = computed(() => {
        const atoutsInPli = storeGame.current_pli.filter(
            (c) => c.suite === storeGame.last_annonce.suite,
        );
        if (atoutsInPli.length === 0) return NaN;
        return atoutsInPli.sort((a, b) => b.valueNum - a.valueNum)[0].valueNum;
    });

    const atoutIsAsked = computed(() => colorAsked.value === storeGame.last_annonce.suite);

    function setMyId(id: string) {
        myId.value = id;
    }

    function setMySurname(surname: string) {
        mySurname.value = surname;
    }

    function setCreator(creator: boolean) {
        isCreator.value = creator;
    }

    function setGameId(id: string) {
        gameId.value = id;
    }

    function setTimeToAnnonce(time: boolean) {
        timeToAnnonce.value = time;
    }

    function setTimeDistrib(time: boolean) {
        timeDistrib.value = time;
    }

    return {
        myId,
        mySurname,
        setMyId,
        setMySurname,
        setCreator,
        hasAskedColor,
        hasAtout,
        highestAtoutInPli,
        atoutIsAsked,
        colorAsked,
        atout,
        hand,
        pli,
        setGameId,
        gameId,
        isCreator,
        setTimeToAnnonce,
        timeToAnnonce,
        timeDistrib,
        setTimeDistrib,
    };
});
