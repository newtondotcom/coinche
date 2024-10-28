export const useAboutStore = defineStore('about', () => {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const myId = ref<string>('0');
    const mySurname = ref<string>('player1');
    const isCreator = ref<boolean>(false);

    const atout = computed(() => storeGame.game.last_annonce.suite);

    const hand: ICard[] = storePlayers.players.find((p) => p.id === myId.value)?.hands || [];
    const pli: Ref<ICard[]> = computed(() => storeGame.game.current_pli);

    const colorAsked: ComputedRef<CardSuite | undefined> = computed(() =>
        storeGame.game.current_pli.length > 0 ? storeGame.game.current_pli[0].suite : undefined,
    );

    const hasAtout: ComputedRef<boolean> = computed(
        () =>
            storePlayers.players
                .find((player) => player.id == myId.value)
                ?.hands.some((card: ICard) => card.suite === storeGame.game.last_annonce.suite) ||
            false,
    );

    const hasAskedColor: ComputedRef<boolean> = computed(
        () =>
            storePlayers.players
                .find((player) => player.id == myId.value)
                ?.hands.some((card: ICard) => card.suite === colorAsked.value) || false,
    );

    const highestAtoutInPli: ComputedRef<number> = computed(() => {
        const atoutsInPli = storeGame.game.current_pli.filter(
            (c) => c.suite === storeGame.game.last_annonce.suite,
        );
        if (atoutsInPli.length === 0) return NaN;
        return atoutsInPli.sort((a, b) => b.valueNum - a.valueNum)[0].valueNum;
    });

    const atoutIsAsked = computed(() => colorAsked.value === storeGame.game.last_annonce.suite);

    function setMyId(id: string) {
        myId.value = id;
    }

    function setMySurname(surname: string) {
        mySurname.value = surname;
    }

    function setCreator(creator: boolean) {
        isCreator.value = creator;
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
    };
});
