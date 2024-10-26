type CardSuite = 'diamonds' | 'clubs' | 'hearts' | 'spades' | 'tout-atout' | 'sans-atout';
type CardValue = '7' | '8' | '9' | 'J' | 'Q' | 'K' | '10' | 'A';

interface ICard {
    suite: CardSuite;
    value: CardValue;
    valueNum: number;
}

type GameStatus = 'new' | 'paused' | 'active' | 'complete';

interface ITimeInfo {
    ms: number;
    secs: number;
    mins: number;
    hrs?: number;
    days?: number;
}
