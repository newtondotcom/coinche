const values: CardValue[] = ['7', '8', '9', 'J', 'Q', 'K','10','A'];
const suites: CardSuite[] = ['diamonds', 'clubs', 'hearts', 'spades'];

export function generateRandomDeck(): IPlayCard[] {
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

export function orderCards(cards: IPlayCard[], value: boolean, tri: boolean): IPlayCard[] {
    let orderedCards: IPlayCard[] = [...cards];

    let diamonds = orderedCards.filter((card) => card.suite === 'diamonds');
    let clubs = orderedCards.filter((card) => card.suite === 'clubs');
    let hearts = orderedCards.filter((card) => card.suite === 'hearts');
    let spades = orderedCards.filter((card) => card.suite === 'spades');

    if (!tri) {
        orderedCards = shuffleArray(orderedCards);
    } else {            
        if (value) {
            diamonds.sort((a, b) => a.valueNum - b.valueNum);
            clubs.sort((a, b) => a.valueNum - b.valueNum);
            hearts.sort((a, b) => a.valueNum - b.valueNum);
            spades.sort((a, b) => a.valueNum - b.valueNum);

        } else {
            diamonds.sort((a,b)=> b.valueNum - a.valueNum);
            clubs.sort((a,b)=> b.valueNum - a.valueNum);
            hearts.sort((a,b)=> b.valueNum - a.valueNum);
            spades.sort((a,b)=> b.valueNum - a.valueNum);
        }
        orderedCards = diamonds.concat(clubs, hearts, spades);
    }

    return orderedCards;
}

function shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex, temporaryValue;
    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap elements
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}
