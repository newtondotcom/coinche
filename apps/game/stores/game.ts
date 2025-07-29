import type { IBid, ICard, IPlay, PlayerId } from '@coinche/shared';

export const useGameStore = defineStore('game', () => {
    const storePlayers = usePlayersStore();
    const current_trick = ref<IPlay[]>([]);
    const trick_number = ref<number>(0);
    const team1_point_current_game = ref<number>(0);
    const team2_point_current_game = ref<number>(0);
    const last_bid = ref<IBid>({ suite: 'NA', bidding: 0, playerId: '0' });
    const coinched = ref<boolean>(false);
    const surcoinched = ref<boolean>(false);
    const deck = ref<ICard[]>([]);
    const bids_round = ref<IBid[]>([]);
    const current_player_id = ref<PlayerId>('');
    const player_starting_id = ref<PlayerId>('0');

    const team1_score = ref<number>(0);
    const team2_score = ref<number>(0);

    function addCardToTrickAndRemove(card: ICard, playerId: PlayerId) {
        current_trick.value.push({ card, playerId });
        storePlayers.removeCard(card, playerId);
        deck.value.push(card);
    }

    function setCurrentPlayerId(playerId: PlayerId) {
        current_player_id.value = playerId;
    }

    function setLastBid(bid: IBid) {
        last_bid.value = bid;
    }

    function setCoinched(newCoinched: boolean) {
        coinched.value = newCoinched;
    }

    function setSurcoinched(newSurcoinched: boolean) {
        surcoinched.value = newSurcoinched;
    }

    function setNewTrick() {
        current_trick.value = [];
        trick_number.value += 1;
    }

    function setNewRound() {
        coinched.value = false;
        surcoinched.value = false;
        bids_round.value = [];
        last_bid.value = { suite: 'NA', bidding: 0, playerId: '0' };
        current_trick.value = [];
        trick_number.value += 0;
        team1_point_current_game.value = 0;
        team2_point_current_game.value = 0;
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

    function addGlobalScoreToTeam1(score: number) {
        team1_score.value = team1_score.value + score;
    }
    function addGlobalScoreToTeam2(score: number) {
        team2_score.value = team2_score.value + score;
    }

    function addBidToRound(bid: IBid) {
        bids_round.value.push(bid);
    }

    function setDeck(deckf: ICard[]) {
        deck.value = deckf;
    }

    return {
        current_trick,
        current_player_id,
        trick_number,
        team1_point_current_game,
        team2_point_current_game,
        last_bid,
        coinched,
        surcoinched,
        player_starting_id,
        team1_score,
        team2_score,
        addCardToTrickAndRemove,
        setCurrentPlayerId,
        setLastBid,
        setCoinched,
        setSurcoinched,
        setNewTrick,
        setPlayerStartingId,
        addScoreToTeam,
        bids_round,
        addBidToRound,
        deck,
        setDeck,
        addScoreToTeam1,
        addScoreToTeam2,
        addGlobalScoreToTeam1,
        addGlobalScoreToTeam2,
        setNewRound,
    };
});
