type CardSuite =
  | "diamonds"
  | "clubs"
  | "hearts"
  | "spades"
  | "tout-atout"
  | "sans-atout"
  | "NA";
type CardValue = "7" | "8" | "9" | "J" | "Q" | "K" | "10" | "A";
type Annonce =
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
type PlayerPosition = 0 | 1 | 2 | 3;
type PlayerId = string;
type PlayerSurname = string;

interface ICard {
  suite: CardSuite;
  value: CardValue;
  valueNum: number;
}

interface IAnnonce {
  suite: CardSuite;
  annonce: Annonce;
  playerId: PlayerId;
}

interface IPlay {
  card: ICard;
  playerId: PlayerId;
}

interface IPlayer {
  id: PlayerId;
  surname: PlayerSurname;
  position: PlayerPosition;
  hands: ICard[];
  classement: number;
  last_annonce?: IAnnonce;
}

interface IRound {
  pli: IPlay[];
  annonces: IAnnonce[];
  pli_number: number;
  current_player_id: PlayerId;
  player_starting_id: PlayerId;

  status: GameStatus;
  team1_point_current_game: number;
  team2_point_current_game: number;
  team1_score: number;
  team2_score: number;
  last_annonce: IAnnonce;
  coinched: boolean;
  surcoinched: boolean;
}

interface IGame {
  rounds: IRound[];
}

type EventType =
  | "annonce"
  | "coinche"
  | "surcoinche"
  | "start_distribution"
  | "start_annonce"
  | "start_pli"
  | "win_pli"
  | "start_game"
  | "end_game"
  | "win_game"
  | "play"
  | "leave"
  | "join"
  | "error"
  | "score"
  | "score_pli"
  | "distribution";
type GameStatus = "new" | "paused" | "active" | "complete";

interface EventShared {
  id: string;
  timestamp: number;
  playerId: PlayerId;
  type: EventType;
  value: string | ICard | IAnnonce;
  gameId: string;
}
