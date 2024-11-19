export const useGameStore = defineStore('game', () => {
    const storePlayers = usePlayersStore();
    const current_pli = ref<IPlay[]>([]);
    const pli_number = ref<number>(0);
    const team1_point_current_game = ref<number>(0);
    const team2_point_current_game = ref<number>(0);
    const last_annonce = ref<IAnnonce>({ suite: 'NA', annonce: 0, playerId: '0' });
    const coinched = ref<boolean>(false);
    const surcoinched = ref<boolean>(false);
    const deck = ref<ICard[]>([]);
    const annonces_pli = ref<IAnnonce[]>([]);
    const current_player_id = ref<PlayerId>('');
    const player_starting_id = ref<PlayerId>('0');

    const status = ref<GameStatus>('new');

    const team1_score = ref<number>(0);
    const team2_score = ref<number>(0);

    function addCardToPliAndRemove(card: ICard, playerId: PlayerId) {
        current_pli.value.push({ card, playerId });
        storePlayers.removeCard(card, playerId);
        deck.value.push(card);
    }

    function setCurrentPlayerId(playerId: PlayerId) {
        current_player_id.value = playerId;
    }

    function setStatus(newStatus: GameStatus) {
        status.value = newStatus;
    }

    function setLastAnnonce(annonce: IAnnonce) {
        last_annonce.value = annonce;
    }

    function setCoinched(newCoinched: boolean) {
        coinched.value = newCoinched;
    }

    function setSurcoinched(newSurcoinched: boolean) {
        surcoinched.value = newSurcoinched;
    }

    function setNewPli() {
        current_pli.value = [];
        pli_number.value += 1;
    }

    function setNewGame() {
        coinched.value = false;
        surcoinched.value = false;
        annonces_pli.value = [];
        last_annonce.value = { suite: 'NA', annonce: 0, playerId: '0' };
    }

    function setPlayerStartingId(playerId: PlayerId) {
        console.log('Setting player starting id', playerId);
        player_starting_id.value = playerId;
    }

    function addScoreToTeam(score: number, num: number) {
        if (num == 1) {
            team1_score.value += score;
        } else {
            team2_score.value += score;
        }
    }

    function addScoreToTeam1(score: number) {
        team1_point_current_game.value = team1_point_current_game.value + score;
    }
    function addScoreToTeam2(score: number) {
        team2_point_current_game.value = team2_point_current_game.value + score;
    }

    function addAnnonceToPli(annonce: IAnnonce) {
        annonces_pli.value.push(annonce);
    }

    function setDeck(deckf: ICard[]) {
        deck.value = deckf;
    }

    return {
        current_pli,
        current_player_id,
        status,
        pli_number,
        team1_point_current_game,
        team2_point_current_game,
        last_annonce,
        coinched,
        surcoinched,
        player_starting_id,
        team1_score,
        team2_score,
        addCardToPliAndRemove,
        setCurrentPlayerId,
        setStatus,
        setLastAnnonce,
        setCoinched,
        setSurcoinched,
        setNewPli,
        setPlayerStartingId,
        addScoreToTeam,
        annonces_pli,
        addAnnonceToPli,
        deck,
        setDeck,
        addScoreToTeam1,
        addScoreToTeam2,
        setNewGame,
    };
});
