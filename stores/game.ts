export const useGameStore = defineStore('game', () => {
    const game = ref<IGame>({
        current_pli: [],
        current_player_id: '',
        current_player_position: 0,
        status: 'new',
        pli_number: 0,
        team1_point_current_pli: 0,
        team2_point_current_pli: 0,
        last_annonce: { suite: 'NA', annonce: 0, playerId: '0' },
        coinched: false,
        surcoinched: false,
    });

    function setGame(newGame: IGame) {
        game.value = newGame;
    }

    function setCurrentPli(currentPli: ICard[]) {
        game.value.current_pli = currentPli;
    }

    function setCurrentPlayerPosition(currentPlayerPosition: PlayerPosition, playerId: PlayerId) {
        game.value.current_player_position = currentPlayerPosition;
        game.value.current_player_id = playerId;
    }

    function setStatus(status: GameStatus) {
        game.value.status = status;
    }

    function setLastAnnonce(annonce: IAnnonce) {
        game.value.last_annonce = annonce;
    }

    function setCoinched(coinched: boolean) {
        game.value.coinched = coinched;
    }

    function setSurcoinched(surcoinched: boolean) {
        game.value.surcoinched = surcoinched;
    }

    function setNewPli() {
        game.value.current_pli = [];
        game.value.pli_number += 1;
        game.value.team1_point_current_pli = 0;
        game.value.team2_point_current_pli = 0;
    }

    return {
        game,
        setGame,
        setCurrentPli,
        setCurrentPlayerPosition,
        setStatus,
        setLastAnnonce,
        setCoinched,
        setSurcoinched,
        setNewPli,
    };
});
