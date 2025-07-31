import type { Ibidding, ICard, IPlay, PlayerId } from '@coinche/shared';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePlayersStore } from './players';

export const useGameStore = defineStore('game', () => {
    const storePlayers = usePlayersStore();
    const current_pli = ref<IPlay[]>([]);
    const pli_number = ref<number>(0);
    const team1_point_current_game = ref<number>(0);
    const team2_point_current_game = ref<number>(0);
    const last_bidding = ref<Ibidding>({ suite: 'NA', bidding: 0, playerId: '0' });
    const coinched = ref<boolean>(false);
    const surcoinched = ref<boolean>(false);
    const deck = ref<ICard[]>([]);
    const biddings_pli = ref<Ibidding[]>([]);
    const current_player_id = ref<PlayerId>('');
    const player_starting_id = ref<PlayerId>('0');

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

    function setLastbidding(bidding: Ibidding) {
        last_bidding.value = bidding;
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

    function setNewRound() {
        coinched.value = false;
        surcoinched.value = false;
        biddings_pli.value = [];
        last_bidding.value = { suite: 'NA', bidding: 0, playerId: '0' };
        current_pli.value = [];
        pli_number.value += 0;
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

    function addbiddingToPli(bidding: Ibidding) {
        biddings_pli.value.push(bidding);
    }

    function setDeck(deckf: ICard[]) {
        deck.value = deckf;
    }

    return {
        current_pli,
        current_player_id,
        pli_number,
        team1_point_current_game,
        team2_point_current_game,
        last_bidding,
        coinched,
        surcoinched,
        player_starting_id,
        team1_score,
        team2_score,
        addCardToPliAndRemove,
        setCurrentPlayerId,
        setLastbidding,
        setCoinched,
        setSurcoinched,
        setNewPli,
        setPlayerStartingId,
        addScoreToTeam,
        biddings_pli,
        addbiddingToPli,
        deck,
        setDeck,
        addScoreToTeam1,
        addScoreToTeam2,
        addGlobalScoreToTeam1,
        addGlobalScoreToTeam2,
        setNewRound,
    };
});
