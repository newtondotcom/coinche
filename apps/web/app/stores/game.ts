import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useStateStore } from './state';

export const useGameStore = defineStore('game', () => {
      const state = useStateStore();

    const currentPli = computed(() => {
            const plis = state.currentRound.plis;
            return plis[plis.length - 1] || [];
      });

      const biddingElected = computed(() => state.currentRound.biddingElected);
      const coinched = computed(() => state.currentRound.coinched);
      const surcoinched = computed(() => state.currentRound.surcoinched);
      const deck = computed(() => state.deck);
      const biddingsPli = computed(() => state.currentRound.biddings);
      const currentPlayerId = computed(() => state.phases.timeToPlay);
      const team1Score = computed(() => state.team1Score);
      const team2Score = computed(() => state.team2Score);
      const team1PointsCurrentGame = computed(() => state.team1PointsCurrentGame);
      const team2PointsCurrentGame = computed(() => state.team2PointsCurrentGame);

      return {
            currentPli,
            biddingElected,
            coinched,
            surcoinched,
            deck,
            biddingsPli,
            currentPlayerId,
            team1Score,
            team2Score,
            team1PointsCurrentGame,
            team2PointsCurrentGame,
      };
});
