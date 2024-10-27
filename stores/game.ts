export const useGameStore = defineStore('game', () => {
    const game = ref<IGame>({
        current_pli: [],
        current_player_position: 0,
        current_player_id: '0',
        status: 'new',
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

    return {
        game,
        setGame,
        setCurrentPli,
        setCurrentPlayerPosition,
        setStatus,
    };
});
