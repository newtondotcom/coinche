import type { Database } from './database.types';

export type CardSuite =
    | 'diamonds'
    | 'clubs'
    | 'hearts'
    | 'spades'
    | 'tout-atout'
    | 'sans-atout'
    | 'NA';
export type CardValue = '7' | '8' | '9' | 'J' | 'Q' | 'K' | '10' | 'A';
export type bidding = 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 160 | 0 | 'capot' | 'generale';
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
    last_bidding?: Ibidding;
}

export interface IRound {
    plis: IPli[];
    biddings: Ibidding[];
    team1_point_current_game: number;
    team2_point_current_game: number;
    last_bidding: Ibidding;
    coinched: boolean;
    surcoinched: boolean;
}

export interface IPli {
    plays: IPlay[];
    current_player_id: PlayerId;
    player_starting_id: PlayerId;
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
    | 'coinche'
    | 'surcoinche'
    | 'play'
    | 'error'
    | 'win_game'
    | 'sound'
    | 'leave';

export type ClassementRow = Database['public']['Tables']['Points']['Row'];
export type EventInsert = Database['public']['Tables']['Events']['Insert'];
export type HistoriqueRow = Database['public']['Tables']['Game']['Row'];
