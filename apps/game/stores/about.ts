import type { CardSuite, ICard } from "@coinche/shared";

export const useAboutStore = defineStore("about", () => {
  const gameId = ref<string>("");
  const myId = ref<string>("");
  const sound = ref<boolean>(true);
  const coinche = ref<boolean>(false);
  const surcoinche = ref<boolean>(false);

  const storeGame = useGameStore();
  const storePlayers = usePlayersStore();

  function setGameId(id: string) {
    gameId.value = id;
  }
  function setMyId(id: string) {
    myId.value = id;
  }
  function setCoinche(newCoinche: boolean) {
    coinche.value = newCoinche;
  }
  function setSurcoinche(newSurcoinche: boolean) {
    surcoinche.value = newSurcoinche;
  }

  const atout: ComputedRef<CardSuite> = computed(() => storeGame.last_bid.suite);

  const playersOfMyTeam = computed(() =>
    storePlayers.getPlayers().filter(
      (player) => player.id === myId.value || player.position === 2
    )
  );

  const canCutAtout = computed(
    () =>
      playersOfMyTeam.value.find((player) => player.id === myId.value)
        ?.hands.some((card: ICard) => card.suite === storeGame.last_bid.suite) || false,
  );

  const pliHasAtout = computed(() => {
    return (
      storeGame.current_trick.some(
        (c) => c.card.suite === storeGame.last_bid.suite,
      ) || false
    );
  });

  return {
    gameId,
    myId,
    sound,
    setGameId,
    setMyId,
    atout,
    canCutAtout,
    pliHasAtout,
    coinche,
    surcoinche,
    setCoinche,
    setSurcoinche,
  };
});
