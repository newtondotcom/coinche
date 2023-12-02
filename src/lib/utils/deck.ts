export function generateRandomDeck(): IPlayCard[] {
    const suites: CardSuite[] = ['diamonds', 'clubs', 'hearts', 'spades'];
    const values: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: IPlayCard[] = [];

    while (deck.length < 8) {
        const randomSuite: CardSuite = suites[Math.floor(Math.random() * suites.length)];
        const randomValue: CardValue = values[Math.floor(Math.random() * values.length)];
        const key: string = Math.random().toString();
        const valueNum: number = values.indexOf(randomValue) + 1;
        const isDuplicate = deck.some((card) => card.suite === randomSuite && card.value === randomValue);
        if (!isDuplicate) {
            deck.push({ suite: randomSuite, value: randomValue, key, valueNum });
        }
    }
    return deck;
}

export function generateRiver(): IPlayCard[] {
    const suites: CardSuite[] = ['diamonds', 'clubs', 'hearts', 'spades'];
    const values: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck: IPlayCard[] = [];

    while (deck.length < 4) {
        const randomSuite: CardSuite = suites[Math.floor(Math.random() * suites.length)];
        const randomValue: CardValue = values[Math.floor(Math.random() * values.length)];
        const key: string = Math.random().toString();
        const valueNum: number = values.indexOf(randomValue) + 1;
        const isDuplicate = deck.some((card) => card.suite === randomSuite && card.value === randomValue);
        if (!isDuplicate) {
            deck.push({ suite: randomSuite, value: randomValue, key, valueNum });
        }
    }
    return deck;
}