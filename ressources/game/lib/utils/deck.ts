const values: CardValue[] = ['7', '8', '9', 'J', 'Q', 'K', '10', 'A'];
const suites: CardSuite[] = ['diamonds', 'clubs', 'hearts', 'spades'];

export function setValueAccordingToAtout(deck: ICard[]): ICard[] {
    const storeAbout = useAboutStore();
    const atout = storeAbout.atout;
    return deck.map((card) => {
        // Traditional Atout: Set values for the chosen atout suit
        if (atout !== 'tout-atout' && atout !== 'sans-atout') {
            if (card.suite === atout) {
                switch (card.value) {
                    case '7':
                    case '8':
                        card.valueNum = 0;
                        break;
                    case '9':
                        card.valueNum = 14;
                        break;
                    case 'J':
                        card.valueNum = 20;
                        break;
                    case 'Q':
                        card.valueNum = 3;
                        break;
                    case 'K':
                        card.valueNum = 4;
                        break;
                    case '10':
                        card.valueNum = 10;
                        break;
                    case 'A':
                        card.valueNum = 11;
                        break;
                    default:
                        break;
                }
            } else {
                // Set default values for non-atout cards
                switch (card.value) {
                    case '7':
                    case '8':
                    case '9':
                        card.valueNum = 0;
                        break;
                    case 'J':
                        card.valueNum = 2;
                        break;
                    case 'Q':
                        card.valueNum = 3;
                        break;
                    case 'K':
                        card.valueNum = 4;
                        break;
                    case '10':
                        card.valueNum = 10;
                        break;
                    case 'A':
                        card.valueNum = 11;
                        break;
                    default:
                        break;
                }
            }
        }
        // Sans-Atout: Set values for all cards (no atout suit)
        else if (atout === 'sans-atout') {
            switch (card.value) {
                case 'J':
                    card.valueNum = 2;
                    break;
                case 'Q':
                    card.valueNum = 3;
                    break;
                case 'K':
                    card.valueNum = 4;
                    break;
                case '10':
                    card.valueNum = 10;
                    break;
                case 'A':
                    card.valueNum = 19;
                    break;
                case '7':
                case '8':
                case '9':
                    card.valueNum = 0;
                    break;
                default:
                    break;
            }
        }
        // Tout-Atout: All cards are assigned specific values
        else if (atout === 'tout-atout') {
            switch (card.value) {
                case '9':
                    card.valueNum = 9;
                    break;
                case 'J':
                    card.valueNum = 14;
                    break;
                case 'Q':
                    card.valueNum = 2;
                    break;
                case 'K':
                    card.valueNum = 3;
                    break;
                case '10':
                    card.valueNum = 5;
                    break;
                case 'A':
                    card.valueNum = 7;
                    break;
                case '7':
                case '8':
                    card.valueNum = 0;
                    break;
                default:
                    break;
            }
        }

        return card;
    });
}

export function orderCards(cards: ICard[], value: boolean, tri: boolean): ICard[] {
    let orderedCards: ICard[] = [...cards];

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
            diamonds.sort((a, b) => b.valueNum - a.valueNum);
            clubs.sort((a, b) => b.valueNum - a.valueNum);
            hearts.sort((a, b) => b.valueNum - a.valueNum);
            spades.sort((a, b) => b.valueNum - a.valueNum);
        }
        orderedCards = diamonds.concat(clubs, hearts, spades);
    }

    return orderedCards;
}

function shuffleArray(array: any[]): any[] {
    let currentIndex = array.length,
        randomIndex,
        temporaryValue;

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
