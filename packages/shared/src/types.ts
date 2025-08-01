export type CardSuite =
    | 'diamonds'
    | 'clubs'
    | 'hearts'
    | 'spades'
    | 'tout-atout'
    | 'sans-atout'
    | 'NA';

export type CardValue = '7' | '8' | '9' | 'J' | 'Q' | 'K' | '10' | 'A';
export type bidding = 0 | 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 160 | 0 | 250 | 251 | 252 | 500 | 501 | 502;
export type PlayerPosition = 0 | 1 | 2 | 3;
export type PlayerId = string;

export interface ICard {
    suite: CardSuite;
    value: CardValue;
    valueNum: number;
}

export interface Ibidding {
    suite: CardSuite;
    bidding: bidding;
    playerId: PlayerId;
}

export interface IPlay {
    card: ICard;
    playerId: PlayerId;
}

export interface IPlayer {
    id: PlayerId;
    position: PlayerPosition;
    hands: ICard[];
    classement: number;
    biddingElected?: Ibidding;
}

export interface IRound {
    plis: IPli[];
    biddings: Ibidding[];
    team1PointsCurrentGame: number;
    team2PointsCurrentGame: number;
    biddingElected: Ibidding;
    coinched: boolean;
    surcoinched: boolean;
}

export interface IPli {
    plays: IPlay[];
    currentPlayerId: PlayerId;
    playerStartingId: PlayerId;
}

export interface IGame {
    rounds: IRound[];
    playersMap: Map<string, IPlayer>
    gameId: string;
    deck: ICard[];
    team1_score: number;
    team2_score: number;
}

export type Event =
    | 'join'
    | 'can_play'
    | 'can_bid'
    | 'start_game'
    | 'end_game'
    | 'start_trick'
    | 'end_trick'
    | 'start_pli'
    | 'win_pli'
    | 'score'
    | 'score_trick'
    | 'start_distribution'
    | 'distribution'
    | 'start_bidding'
    | 'bidding'
    | 'play'
    | 'error'
    | 'win_game'
    | 'sound'
    | 'leave';

// Database types for events
export interface EventInsert {
    id: string;
    gameId: string;
    playerId: string;
    type: string;
    value?: string;
    metadata?: string;
    timestamp?: string;
}

// Database interface
export interface Database {
  public: {
    Tables: {
      Points: {
        Row: {
          id: string;
          player_id: string;
          total_points: number;
          games_played: number;
          games_won: number;
          games_lost: number;
          win_rate: number;
          last_game_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          player_id: string;
          total_points?: number;
          games_played?: number;
          games_won?: number;
          games_lost?: number;
          win_rate?: number;
          last_game_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          player_id?: string;
          total_points?: number;
          games_played?: number;
          games_won?: number;
          games_lost?: number;
          win_rate?: number;
          last_game_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      Events: {
        Row: {
          id: string;
          gameId: string;
          playerId: string;
          type: string;
          value: string | null;
          metadata: string | null;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          gameId: string;
          playerId: string;
          type: string;
          value?: string | null;
          metadata?: string | null;
          timestamp?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          gameId?: string;
          playerId?: string;
          type?: string;
          value?: string | null;
          metadata?: string | null;
          timestamp?: string;
          created_at?: string;
        };
      };
      Game: {
        Row: {
          id: string;
          player1_id: string;
          player2_id: string;
          player3_id: string;
          player4_id: string;
          team1_score: number;
          team2_score: number;
          status: string;
          started_at: string | null;
          ended_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          player1_id: string;
          player2_id: string;
          player3_id: string;
          player4_id: string;
          team1_score?: number;
          team2_score?: number;
          status?: string;
          started_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          player1_id?: string;
          player2_id?: string;
          player3_id?: string;
          player4_id?: string;
          team1_score?: number;
          team2_score?: number;
          status?: string;
          started_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 