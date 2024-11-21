export type CardSuite =
  | "diamonds"
  | "clubs"
  | "hearts"
  | "spades"
  | "tout-atout"
  | "sans-atout"
  | "NA";
export type CardValue = "7" | "8" | "9" | "J" | "Q" | "K" | "10" | "A";
export type Annonce =
  | 80
  | 90
  | 100
  | 110
  | 120
  | 130
  | 140
  | 150
  | 160
  | 0
  | "capot"
  | "generale";
export type PlayerPosition = 0 | 1 | 2 | 3;
export type PlayerId = string;
export type PlayerSurname = string;

export interface ICard {
  suite: CardSuite;
  value: CardValue;
  valueNum: number;
}

export interface IAnnonce {
  suite: CardSuite;
  annonce: Annonce;
  playerId: PlayerId;
}

export interface IPlay {
  card: ICard;
  playerId: PlayerId;
}

export interface IPlayer {
  id: PlayerId;
  surname: PlayerSurname;
  position: PlayerPosition;
  hands: ICard[];
  classement: number;
  last_annonce?: IAnnonce;
}

export interface IRound {
  pli: IPlay[];
  annonces: IAnnonce[];
  pli_number: number;
  current_player_id: PlayerId;
  player_starting_id: PlayerId;

  team1_point_current_game: number;
  team2_point_current_game: number;
  last_annonce: IAnnonce;
  coinched: boolean;
  surcoinched: boolean;
}

export interface IGame {
  rounds: IRound[];
  players: IPlayer[];
  gameId: string;
  deck: ICard[];
  team1_score: number;
  team2_score: number;

  status: GameStatus;
}

export type Event =
  | "join"
  | "start_game"
  | "end_game"
  | "start_round"
  | "end_round"
  | "start_pli"
  | "win_pli"
  | "score"
  | "start_distribution"
  | "distribution"
  | "start_annonce"
  | "annonce"
  | "coinche"
  | "surcoinche"
  | "play"
  | "error"
  | "win_game"
  | "leave";
export type GameStatus = "new" | "paused" | "active" | "complete";

export interface EventShared {
  id: string;
  timestamp: number;
  playerId: PlayerId;
  type: Event;
  value: string | ICard | IAnnonce;
  gameId: string;
}
