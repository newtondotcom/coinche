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
export type bidding = 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 160 | 0 | 250 | 251 | 252 | 500 | 501 | 502;
export type PlayerPosition = 0 | 1 | 2 | 3;
export type PlayerId = string;

export interface ICard {
    suite: CardSuite;
    value: CardValue;
    valueNum: number;
}

export interface IBid {
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
    last_bid?: IBid;
}

export interface IRound {
    tricks: ITrick[];
    bids: IBid[];
    team1_point_current_game: number;
    team2_point_current_game: number;
    last_bid: IBid;
    coinched: boolean;
    surcoinched: boolean;
}

export interface ITrick {
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
    | 'start_round'
    | 'end_round'
    | 'start_trick'
    | 'win_trick'
    | 'score'
    | 'score_round'
    | 'start_distribution'
    | 'distribution'
    | 'start_bidding'
    | 'bid'
    | 'play'
    | 'error'
    | 'win_game'
    | 'sound'
    | 'leave';

export type ClassementRow = Database['public']['Tables']['Points']['Row'];
export type EventInsert = Database['public']['Tables']['Events']['Insert'];
export type HistoriqueRow = Database['public']['Tables']['Game']['Row'];
