/**
 * Join values together by space. Great for CSS names
 * @param array Elements to join
 */
export const spaceJoin = (array: any[]): string => {
    return array
        .map((e) => {
            try {
                return e.toString();
            } catch (e) {
                return '';
            }
        })
        .filter((x) => x !== '')
        .join(' ');
};

// https://cheatsheets.joshuatz.com/snippets/js/
export const msToParts = (e: number) => {
    return {
        days: Math.floor(e / 864e5),
        hrs: Math.floor((e % 864e5) / 36e5),
        mins: Math.floor(((e % 864e5) % 36e5) / 6e4),
        secs: Math.floor((((e % 864e5) % 36e5) % 6e4) / 1e3),
        ms: Math.floor((((e % 864e5) % 36e5) % 6e4) % 1e3),
    };
};

export const leftPad = (input: number | string, length: number, padWith: string) => {
    let out = input.toString();
    while (out.length < length) {
        out = padWith + out;
    }
    return out;
};

export const delay = (delayMs: number): Promise<void> => {
    return new Promise((res) => {
        setTimeout(res, delayMs);
    });
};

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

export const generateCardAssortment = (targetSum?: number) => {
    // generate card grid data
    const suites: Array<CardSuite> = ['diamonds', 'clubs', 'hearts', 'spades'];
    let indexes: Array<CardValue> = ['7', '8', '9', 'J', 'Q', 'K', '10', 'A'];
    indexes.splice(targetSum - 1);
    const cards: ICard[] = [];
    suites.forEach((s) => {
        indexes.forEach((i) => {
            cards.push({
                value: i,
                valueNum: 0,
                suite: s,
            });
        });
    });

    const totalCardCount = suites.length * indexes.length;
    const maxStackCount = 3 * 4;

    // Determine how many stacks to split cards into, where total cards can be split evenly
    let stackCount = 2;
    let tempStackCount = stackCount;
    let stackDepth = totalCardCount / stackCount;
    while (tempStackCount < maxStackCount && stackDepth > 2) {
        tempStackCount++;
        stackDepth = totalCardCount / tempStackCount;
        if (stackDepth % 1 === 0) {
            stackCount = tempStackCount;
        }
    }
    stackDepth = totalCardCount / stackCount;

    // Shuffle cards and split into stacks
    // Example: standard target of 10 uses 3 x 4 (12 stacks of 3)
    shuffleArr(cards);

    // Split into stacks of x (example, std 10, stackDepth = 3)
    const stacks: Array<Array<ICard>> = chunkArr(cards, stackDepth);

    // Group by rows (example, std 10, x = 4)
    let yHeight = getMedianDivisor(stackCount);
    let rowLength = stackCount / yHeight;

    // If rows cannot be split evenly (e.g. 7 stacks), then just shoot for max of four stacks wide
    if (yHeight === 1 && stackCount > 4) {
        rowLength = 4;
    }

    const rows: Array<Array<Array<ICard>>> = chunkArr(stacks, rowLength, true);

    return { stacks, rows, cards };
};

export const getCardByKey = (key: string, rows: ICard[][][]) => {
    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        for (let s = 0; s < row.length; s++) {
            const stack = row[s];
            for (let i = 0; i < stack.length; i++) {
                const card = stack[i];
                if (card.key === key) {
                    return {
                        card,
                        row: r,
                        stack: s,
                        index: i,
                    };
                }
            }
        }
    }
};

export const getMedianDivisor = (input: number) => {
    let divisor = input;
    const res = [];
    while (divisor > 0) {
        if (!(input % divisor)) {
            res.push(divisor);
        }
        divisor--;
    }
    return res[Math.floor(res.length / 2)];
};

export const getCardCrossfade = () => {
    const [send, receive] = crossfade({
        duration: (d) => Math.sqrt(d * 200),
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
            };
        },
    });
    return { send, receive };
};
