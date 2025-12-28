import type { Ibidding, ICard, IPlayer, ITrick, PlayerId } from "./types";

export interface IGameState {
  // Identifiants de base
  gameId: string;

  status: "waiting" | "playing" | "finished";

  // Joueurs
  players: IPlayer[];
  team1: PlayerId[];
  team2: PlayerId[];

  // Current round state
  currentRound: {
    tricks: ITrick[];
    biddings: Ibidding[];
    biddingElected: Ibidding;
    coinched: boolean;
    surcoinched: boolean;
  };

  // État global du jeu
  team1PointsCurrentGame: number;
  team2PointsCurrentGame: number;
  deck: ICard[];

  // États de phase
  phases: {
    timeToBid: PlayerId;
    timeDistrib: PlayerId;
    timeToPlay: PlayerId;
  };

  // Métadonnées
  createdAt?: Date;
  updatedAt?: Date;
}

export type ChangeCallback = (changeType: string, data: any, state: IGameState) => void;

export interface WSPayload {
  changeType: string;
  state: IGameState;
}

export interface IGameStateClient {
  myId: PlayerId;
  isLoadingPlayerList: boolean;
  game: IGameState;
}
