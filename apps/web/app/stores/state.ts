import { defineStore } from 'pinia';
import type { IGameState, IGameStateClient, ICard, IPlayer, IPli, Ibidding, PlayerId, ICardSuite } from '@coinche/shared';

export const useStateStore = defineStore('state', {
  state: (): IGameStateClient => ({
    myId: '',
    isLoadingPlayerList: false,
    game: {
      gameId: '',
      status: 'waiting',
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
      deck: [],
      phases: {
        timeToBid: '',
        timeDistrib: '',
        timeToPlay: '',
      },
      createdAt: undefined,
      updatedAt: undefined,
    },
  }),
  actions: {
    setState(newState: IGameState) {
      Object.assign(this.game, newState);
    },
    setLoadingState(loading: boolean) {
      this.isLoadingPlayerList = loading;
    },
    setMyId(id: string) {
      this.myId = id;
    },
    setGameId(id: string) {
      this.game.gameId = id;
    },
  },
  getters: {
    getMyId(state): PlayerId {
      return state.myId;
    },
    gameId(state): string {
      return state.game.gameId;
    },
    players(state) : IPlayer[] {
      return state.game.players;
    },
    currentPli(state) : IPli {
      const plis = state.game.currentRound.plis;
      return plis[plis.length - 1];
    },
    biddingElected(state) : Ibidding {
      return state.game.currentRound.biddingElected;
    },
    coinched(state) : boolean {
      return state.game.currentRound.coinched;
    },
    surcoinched(state)  : boolean {
      return state.game.currentRound.surcoinched;
    },
    deck(state)  : ICard[] {
      return state.game.deck;
    },
    biddingsPli(state) : Ibidding[] {
      return state.game.currentRound.biddings;
    },
    currentPlayerId(state) : PlayerId {
      return state.game.phases.timeToPlay;
    },
    team1Score() : number {
      return this.currentPli?.team1Score || 0;
    },
    team2Score() : number {
      return this.currentPli?.team2Score || 0;
    },
    team1PointsCurrentGame(state) : number {
      return state.game.team1PointsCurrentGame;
    },
    team2PointsCurrentGame(state) : number {
      return state.game.team2PointsCurrentGame;
    },
    timeToBidding(state) : boolean {
      return state.game.phases.timeToBid !== '';
    },
    timeDistrib(state) : boolean {
      return state.game.phases.timeDistrib !== '';
    },
    turnToPlay(state) : boolean {
      return state.game.phases.timeToPlay === state.myId;
    },
    turnToBidding(state) : boolean {
      return state.game.phases.timeToBid === state.myId;
    },
    atout(state) : ICardSuite {
      return state.game.currentRound.biddingElected.suite || '';
    },
    hand(state): ICard[] {
      const player = state.game.players.find((p) => p.id === state.myId);
      return player && Array.isArray(player.hands) ? player.hands : [];
    },
    colorAsked() : ICardSuite {
      const pli = this.currentPli;
      if (Array.isArray(pli) && pli.length > 0 && pli[0] && pli[0].card) {
        return pli[0].card.suite;
      }
      if (
        typeof pli === 'object' && pli !== null &&
        !Array.isArray(pli) && Array.isArray((pli as any).plays) &&
        (pli as any).plays.length > 0 && (pli as any).plays[0] && (pli as any).plays[0].card
      ) {
        return (pli as any).plays[0].card.suite;
      }
      return "NA";
    },
    hasAtout() : boolean {
      const hand = this.hand as ICard[];
      return Array.isArray(hand) && hand.some((card) => card.suite === this.atout);
    },
    hasAskedColor() : boolean {
      const hand = this.hand as ICard[];
      return Array.isArray(hand) && hand.some((card) => card.suite === this.colorAsked);
    },
    highestAtoutInPli() : number {
      const pli = this.currentPli;
      const atout = this.atout;
      let currentPliArr: any[] = Array.isArray(pli) ? pli : [];
      const atouts = currentPliArr.filter((play) => play.card && play.card.suite === atout);
      return atouts.length > 0
        ? Math.max(...atouts.map((p) => p.card.valueNum))
        : NaN;
    },
    atoutIsAsked() : boolean {
      return this.colorAsked === this.atout;
    },
  },
});