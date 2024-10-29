export const useGameStore = defineStore('game', () => {
    const current_pli = ref<ICard[]>([]);
    const pli_number = ref<number>(0);
    const team1_point_current_pli = ref<number>(0);
    const team2_point_current_pli = ref<number>(0);

    const current_player_id = ref<PlayerId>('');
    const player_starting_id = ref<PlayerId>('0');

    const status = ref<GameStatus>('new');

    const last_annonce = ref<IAnnonce>({ suite: 'NA', annonce: 0, playerId: '0' });
    const coinched = ref<boolean>(false);
    const surcoinched = ref<boolean>(false);

    const team1_score = ref<number>(0);
    const team2_score = ref<number>(0);

    const annonces_pli = ref<IAnnonce[]>([]);

    function setCurrentPli(currentPli: ICard[]) {
        current_pli.value = currentPli;
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
        team1_point_current_pli.value = 0;
        team2_point_current_pli.value = 0;
    }

    function setPlayerStartingId(playerId: PlayerId) {
        console.log('Setting player starting id', playerId);
        player_starting_id.value = playerId;
    }

    function setTeam1Score(score: number) {
        team1_score.value = score;
    }

    function setTeam2Score(score: number) {
        team2_score.value = score;
    }

    function addAnnonceToPli(annonce: IAnnonce) {
        annonces_pli.value.push(annonce);
    }

    return {
        current_pli,
        current_player_id,
        status,
        pli_number,
        team1_point_current_pli,
        team2_point_current_pli,
        last_annonce,
        coinched,
        surcoinched,
        player_starting_id,
        team1_score,
        team2_score,
        setCurrentPli,
        setCurrentPlayerId,
        setStatus,
        setLastAnnonce,
        setCoinched,
        setSurcoinched,
        setNewPli,
        setPlayerStartingId,
        setTeam1Score,
        setTeam2Score,
        annonces_pli,
        addAnnonceToPli,
    };
});
