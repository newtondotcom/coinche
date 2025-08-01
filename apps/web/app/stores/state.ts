import { defineStore } from 'pinia';
import type { IGameState } from '@coinche/shared';

export const useStateStore = defineStore('state', {
  state: (): IGameState => ({
    gameId: '',
    players: [],
    team1: [],
    team2: [],

    currentRound: {
      plis: [],
      biddings: [],
      biddingElected: {
        playerId: '',
        bidding: 80,
        suite: 'NA',
      },
      coinched: false,
      surcoinched: false,
    },

    team1PointsCurrentGame: 0,
    team2PointsCurrentGame: 0,
    team1Score: 0,
    team2Score: 0,
    deck: [],

    phases: {
      timeToBid: '',
      timeDistrib: '',
      timeToPlay: '',
    },

    createdAt: undefined,
    updatedAt: undefined,
  }),

  actions: {
    setState(newState: IGameState) {
      Object.assign(this, newState);
    },
  },
});