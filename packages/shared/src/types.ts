export type ICardSuite =
    | 'diamonds'
    | 'clubs'
    | 'hearts'
    | 'spades'
    | 'tout-atout'
    | 'sans-atout'
    | 'NA';

export type ICardValue = '7' | '8' | '9' | 'J' | 'Q' | 'K' | '10' | 'A';
export type bidding = 0 | 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 160 | 0 | 250 | 251 | 252 | 500 | 501 | 502;
export type PlayerPosition = 0 | 1 | 2 | 3;
export type PlayerId = string;

export type IGameStatus = 'waiting' | 'playing' | 'finished';

export interface ICard {
    suite: ICardSuite;
    value: ICardValue;
    valueNum: number;
}

export interface Ibidding {
    suite: ICardSuite;
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