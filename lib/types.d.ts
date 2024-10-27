type CardSuite = 'diamonds' | 'clubs' | 'hearts' | 'spades' | 'tout-atout' | 'sans-atout' | 'NA';
type CardValue = '7' | '8' | '9' | 'J' | 'Q' | 'K' | '10' | 'A';
type Annonce = 80 | 90 | 100 | 110 | 120 | 130 | 140 | 150 | 160 | 0;
type PlayerPosition = 1 | 2 | 3 | 4;
type PlayerId = string;

interface ICard {
    suite: CardSuite;
    value: CardValue;
    valueNum: number;
}

interface IAnnonce {
    suite: CardSuite;
    annonce: Annonce;
}

type GameStatus = 'new' | 'paused' | 'active' | 'complete';

interface ITimeInfo {
    ms: number;
    secs: number;
    mins: number;
    hrs?: number;
    days?: number;
}
