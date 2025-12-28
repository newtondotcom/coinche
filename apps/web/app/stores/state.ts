import { defineStore } from "pinia";
import type {
  IGameState,
  IGameStateClient,
  ICard,
  IPlayer,
  ITrick,
  Ibidding,
  PlayerId,
  ICardSuite,
} from "@coinche-reborn/api";

export const useStateStore = defineStore("state", {
  state: (): IGameStateClient => ({
    myId: "",
    isLoadingPlayerList: false,
    game: {
      gameId: "",
      status: "waiting",
      players: [],
      team1: [],
      team2: [],
      currentRound: {
        tricks: [],
        biddings: [],
        biddingElected: {
          playerId: "",
          bidding: 80,
          suite: "NA",
        },
        coinched: false,
        surcoinched: false,
      },
      team1PointsCurrentGame: 0,
      team2PointsCurrentGame: 0,
      deck: [],
      phases: {
        timeToBid: "",
        timeDistrib: "",
        timeToPlay: "",
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
    players(state): IPlayer[] {
      return state.game.players;
    },
    currentTrick(state): ITrick | undefined {
      const tricks = state.game.currentRound?.tricks || [];
      return tricks[tricks.length - 1];
    },
    biddingElected(state): Ibidding {
      return state.game.currentRound.biddingElected;
    },
    coinched(state): boolean {
      return state.game.currentRound.coinched;
    },
    surcoinched(state): boolean {
      return state.game.currentRound.surcoinched;
    },
    deck(state): ICard[] {
      return state.game.deck;
    },
    biddings(state): Ibidding[] {
      return state.game.currentRound?.biddings || [];
    },
    currentPlayerId(state): PlayerId {
      return state.game.phases.timeToPlay;
    },
    team1Score(state): number {
      // Sum of all tricks' team1Score in the current round
      const tricks = state.game.currentRound?.tricks || [];
      return tricks.reduce((sum, trick) => sum + (trick.team1Score || 0), 0);
    },
    team2Score(state): number {
      // Sum of all tricks' team2Score in the current round
      const tricks = state.game.currentRound?.tricks || [];
      return tricks.reduce((sum, trick) => sum + (trick.team2Score || 0), 0);
    },
    team1PointsCurrentGame(state): number {
      return state.game.team1PointsCurrentGame;
    },
    team2PointsCurrentGame(state): number {
      return state.game.team2PointsCurrentGame;
    },
    timeToBidding(state): boolean {
      return state.game.phases.timeToBid !== "";
    },
    timeDistrib(state): boolean {
      return state.game.phases.timeDistrib !== "";
    },
    turnToPlay(state): boolean {
      return state.game.phases.timeToPlay === state.myId;
    },
    turnToBidding(state): boolean {
      return state.game.phases.timeToBid === state.myId;
    },
    trump(state): ICardSuite {
      return state.game.currentRound.biddingElected.suite || "";
    },
    hand(state): ICard[] {
      const player = state.game.players.find((p) => p.id === state.myId);
      return player && Array.isArray(player.hands) ? player.hands : [];
    },
    colorAsked(): ICardSuite {
      const trick = this.currentTrick;
      if (Array.isArray(trick) && trick.length > 0 && trick[0] && trick[0].card) {
        return trick[0].card.suite;
      }
      if (
        typeof trick === "object" &&
        trick !== null &&
        !Array.isArray(trick) &&
        Array.isArray((trick as any).plays) &&
        (trick as any).plays.length > 0 &&
        (trick as any).plays[0] &&
        (trick as any).plays[0].card
      ) {
        return (trick as any).plays[0].card.suite;
      }
      return "NA";
    },
    hasTrump(): boolean {
      const hand = this.hand as ICard[];
      return Array.isArray(hand) && hand.some((card) => card.suite === this.trump);
    },
    hasAskedColor(): boolean {
      const hand = this.hand as ICard[];
      return Array.isArray(hand) && hand.some((card) => card.suite === this.colorAsked);
    },
    highestTrumpInTrick(): number {
      const trick = this.currentTrick;
      const trump = this.trump;
      let currentTrickArr: any[] = Array.isArray(trick) ? trick : [];
      const trumps = currentTrickArr.filter((play) => play.card && play.card.suite === trump);
      return trumps.length > 0 ? Math.max(...trumps.map((p) => p.card.valueNum)) : NaN;
    },
    trumpIsAsked(): boolean {
      return this.colorAsked === this.trump;
    },
  },
});
