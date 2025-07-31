import type { ICard, IPlay } from '@coinche/shared';

interface CardRulesContext {
    current_player_id: string;
    myId: string;
    current_pli: IPlay[];
    colorAsked?: string;
    atout: string;
    hand: ICard[];
}

/**
 * Determines if a card can be played according to Coinche rules
 * @param card The card to check
 * @param context The game context (current player, hand, etc.)
 * @returns true if the card can be played, false otherwise
 */
export function cardCanBePlayed(card: ICard, context: CardRulesContext): boolean {
    const { current_player_id, myId, current_pli, colorAsked, atout, hand } = context;
    
    // If it's not the player's turn, they can't play
    if (current_player_id !== myId) {
        return false;
    }

    // If it's the first card of the trick (entame), any card can be played
    if (current_pli.length === 0) {
        return true;
    }

    const cardSuite = card.suite;
    const cardValue = card.valueNum;

    // Special cases for Sans Atout and Tout Atout variants
    if (atout === 'sans-atout') {
        // No trump exists, only need to follow suit if possible
        const hasColorAsked = hand.some((c: ICard) => c.suite === colorAsked);
        if (hasColorAsked) {
            return cardSuite === colorAsked;
        }
        return true; // Can play any card if don't have the color asked
    }

    if (atout === 'tout-atout') {
        // All colors are trump, must always try to go higher when possible
        const hasColorAsked = hand.some((c: ICard) => c.suite === colorAsked);
        if (hasColorAsked) {
            if (cardSuite === colorAsked) {
                // Must play higher if possible
                const highestInPli = Math.max(...current_pli
                    .filter(p => p.card.suite === colorAsked)
                    .map(p => p.card.valueNum));
                
                const hasHigher = hand.some((c: ICard) => 
                    c.suite === colorAsked && c.valueNum > highestInPli);
                
                if (hasHigher) {
                    return cardValue > highestInPli;
                }
                return true; // Can play any card of the asked color if no higher available
            }
            return false; // Must play the asked color if available
        }
        return true; // Can play any card if don't have the color asked
    }

    // Normal game rules with specific trump suit
    const hasColorAsked = hand.some((c: ICard) => c.suite === colorAsked);
    const hasAtout = hand.some((c: ICard) => c.suite === atout);

    // Rule 1: Must always follow suit if possible
    if (hasColorAsked) {
        if (cardSuite !== colorAsked) {
            return false;
        }

        // If trump is asked, must go higher when possible
        if (colorAsked === atout) {
            const atoutsInPli = current_pli.filter(p => p.card.suite === atout);
            if (atoutsInPli.length > 0) {
                const highestAtout = Math.max(...atoutsInPli.map(p => p.card.valueNum));
                const hasHigherAtout = hand.some((c: ICard) => 
                    c.suite === atout && c.valueNum > highestAtout);
                
                if (hasHigherAtout) {
                    return cardValue > highestAtout;
                }
            }
        }
        return true;
    }

    // Rule 2: If can't follow suit, check if partner is winning
    const isPartnerWinning = (): boolean => {
        if (current_pli.length === 0) return false;
        
        // Determine who the partner is (players 0&2 vs 1&3)
        const myTeam = parseInt(myId) % 2;
        const partnerIds = ['0', '1', '2', '3'].filter(id => parseInt(id) % 2 === myTeam);
        
        // Find the currently winning card
        let winningPlay = current_pli[0];
        const atoutsInPli = current_pli.filter(p => p.card.suite === atout);
        
        if (atoutsInPli.length > 0) {
            // If there are trumps, highest trump wins
            winningPlay = atoutsInPli.reduce((highest, current) => 
                current.card.valueNum > highest.card.valueNum ? current : highest);
        } else {
            // Otherwise, highest card of asked color wins
            const suitCards = current_pli.filter(p => p.card.suite === colorAsked);
            if (suitCards.length > 0) {
                winningPlay = suitCards.reduce((highest, current) => 
                    current.card.valueNum > highest.card.valueNum ? current : highest);
            }
        }
        
        return partnerIds.includes(winningPlay?.playerId || '');
    };

    // Rule 3: If partner is winning, can play any card (défausse)
    if (isPartnerWinning()) {
        return true;
    }

    // Rule 4: If partner is not winning and we have trump, must play trump
    if (hasAtout && cardSuite === atout) {
        // Check if opponent has already played trump
        const opponentAtouts = current_pli
            .filter(p => p.card.suite === atout)
            .filter(p => {
                const playerTeam = parseInt(p.playerId) % 2;
                const myTeam = parseInt(myId) % 2;
                return playerTeam !== myTeam;
            });

        if (opponentAtouts.length > 0) {
            const highestOpponentAtout = Math.max(...opponentAtouts.map(p => p.card.valueNum));
            const hasHigherAtout = hand.some((c: ICard) => 
                c.suite === atout && c.valueNum > highestOpponentAtout);
            
            // Must play higher trump if available, otherwise any trump is allowed
            if (hasHigherAtout) {
                return cardValue > highestOpponentAtout;
            }
            // Can play any trump even if lower (forcing to "pisser")
            return true;
        }
        
        // No opponent trump yet, can play any trump
        return true;
    }

    // Rule 5: If no trump available and partner not winning, must discard
    if (!hasAtout) {
        return cardSuite !== atout; // Can play any non-trump card
    }

    // If we have trump but trying to play non-trump while partner not winning
    return false;
} 