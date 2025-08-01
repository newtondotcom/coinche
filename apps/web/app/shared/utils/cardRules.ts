import type { ICard, IPlay, IPlayer } from '@coinche/shared';

interface CardRulesContext {
    currentPlayerId: string;
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
    const { currentPlayerId, myId, current_pli, colorAsked, atout, hand } = context;
    
    // If it's not the player's turn, they can't play
    if (currentPlayerId !== myId) {
        return false;
    }

    // If it's the first card of the trick (entame), any card can be played
    if (current_pli.length === 0) {
        return true;
    }

    const currentCardSuite = card.suite;
    const currentCardValue = card.valueNum;

    // Special cases for Sans Atout and Tout Atout variants
    if (atout === 'sans-atout') {
        // No trump exists, only need to follow suit if possible
        const hasColorAsked = hand.some((c: ICard) => c.suite === colorAsked);
        if (hasColorAsked) {
            return currentCardSuite === colorAsked;
        }
        return true; // Can play any card if don't have the color asked
    }

    if (atout === 'tout-atout') {
        // All colors are trump, must always try to go higher when possible
        const hasColorAsked = hand.some((c: ICard) => c.suite === colorAsked);
        if (hasColorAsked) {
            if (currentCardSuite === colorAsked) {
                // Must play higher if possible
                const highestInPli = Math.max(...current_pli
                    .filter(p => p.card.suite === colorAsked)
                    .map(p => p.card.valueNum));
                
                const hasHigher = hand.some((c: ICard) => 
                    c.suite === colorAsked && c.valueNum > highestInPli);
                
                if (hasHigher) {
                    return currentCardValue > highestInPli;
                }
                // If no higher card available, can play any card of the asked color
                return true;
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
        if (currentCardSuite !== colorAsked) {
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
                    return currentCardValue > highestAtout;
                }
                // FIXED: Allow playing lower trump if no higher trump available
                return currentCardSuite === atout;
            }
        }
        return true;
    }

    // Rule 2: If can't follow suit, check if partner is winning
    const isPartnerWinning = (): boolean => {
        if (current_pli.length === 0) return false;
        
        // IMPROVED: More robust partner detection
        const getTeam = (playerId: string): number => {
            // Try to parse as number first, fallback to string comparison
            const numId = parseInt(playerId);
            if (!isNaN(numId)) {
                return numId % 2;
            }
            // Fallback for non-numeric IDs
            return playerId.charCodeAt(0) % 2;
        };
        
        const myTeam = getTeam(myId);
        
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
        
        return getTeam(winningPlay?.playerId || '') === myTeam;
    };

    // Rule 3: If partner is winning, can play any card (défausse)
    if (isPartnerWinning()) {
        return true;
    }

    // Rule 4: If partner is not winning and we have trump, must play trump
    if (hasAtout && currentCardSuite === atout) {
        // Check if opponent has already played trump
        const storePlayers = usePlayersStore();
        const getTeamMateId = (playerId: string): string => {
            const players = storePlayers.players;
            const player = players.find((p: IPlayer) => p.id === playerId);
            if (!player || typeof player.position !== 'number') {
                return '';
            }
            // Ensure correct order of operations and handle undefined
            const teammatePosition = (player.position + 2) % 4;
            const teamMate = players.find((p: IPlayer) => p.position === teammatePosition);
            return teamMate?.id ?? '';
        };
        
        const myTeam = getTeamMateId(myId);
        const opponentAtouts = current_pli
            .filter(p => p.card.suite === atout)
            .filter(p => p.playerId !== myTeam);

        if (opponentAtouts.length > 0) {
            const highestOpponentAtout = Math.max(...opponentAtouts.map(p => p.card.valueNum));
            const hasHigherAtout = hand.some((c: ICard) => 
                c.suite === atout && c.valueNum > highestOpponentAtout);
            
            // Must play higher trump if available, otherwise any trump is allowed
            if (hasHigherAtout) {
                return currentCardValue > highestOpponentAtout;
            }
            // Can play any trump even if lower (forcing to "pisser")
            return true;
        }
        
        // No opponent trump yet, can play any trump
        return true;
    }

    // Rule 5: If no trump available and partner not winning, must discard
    // FIXED: Allow any non-trump card when player has no trump
    if (!hasAtout) {
        return currentCardSuite !== atout; // Can play any non-trump card
    }

    // FIXED: If we have trump but trying to play non-trump while partner not winning
    // This should only be allowed if we're forced to discard (no trump to play)
    return false;
}

/**
 * Checks if a player has any playable cards
 * @param context The game context
 * @returns true if the player has at least one playable card, false otherwise
 */
export function hasPlayableCards(context: CardRulesContext): boolean {
    const { hand } = context;
    
    // If it's not the player's turn, they can't play anything
    if (context.currentPlayerId !== context.myId) {
        return false;
    }
    
    // If it's the first card of the trick, any card can be played
    if (context.current_pli.length === 0) {
        return hand.length > 0;
    }
    
    // Check each card to see if at least one is playable
    return hand.some(card => cardCanBePlayed(card, context));
}

/**
 * Gets all playable cards for a player
 * @param context The game context
 * @returns Array of playable cards
 */
export function getPlayableCards(context: CardRulesContext): ICard[] {
    const { hand } = context;
    
    if (context.currentPlayerId !== context.myId) {
        return [];
    }
    
    return hand.filter(card => cardCanBePlayed(card, context));
}

/**
 * Gets the best playable card for a player (for autoplay)
 * @param context The game context
 * @returns The best card to play, or null if no cards are playable
 */
export function getBestPlayableCard(context: CardRulesContext): ICard | null {
    const playableCards = getPlayableCards(context);
    
    if (playableCards.length === 0) {
        return null;
    }
    
    // If it's the first card of the trick, play the lowest card
    if (context.current_pli.length === 0) {
        const sortedCards = playableCards.sort((a, b) => a.valueNum - b.valueNum);
        return sortedCards[0] || null;
    }
    
    // If we have the asked color, play the lowest card of that color
    const { colorAsked } = context;
    if (colorAsked) {
        const cardsOfAskedColor = playableCards.filter(card => card.suite === colorAsked);
        if (cardsOfAskedColor.length > 0) {
            const sortedCards = cardsOfAskedColor.sort((a, b) => a.valueNum - b.valueNum);
            return sortedCards[0] || null;
        }
    }
    
    // Otherwise, play the lowest card
    const sortedCards = playableCards.sort((a, b) => a.valueNum - b.valueNum);
    return sortedCards[0] || null;
}

/**
 * Enhanced fallback function with detailed logging
 * @param card The card to check
 * @param context The game context
 * @returns true if the card can be played (with fallback logic), false otherwise
 */
export function cardCanBePlayedWithFallback(card: ICard, context: CardRulesContext): boolean {
    // First try normal rules
    if (cardCanBePlayed(card, context)) {
        return true;
    }
    
    // Check if this is a valid turn
    if (context.currentPlayerId !== context.myId) {
        return false;
    }
    
    // If no cards are playable with normal rules, apply emergency fallback
    const playableCards = getPlayableCards(context);
    if (playableCards.length === 0) {
        console.warn('EMERGENCY FALLBACK: No cards playable with normal rules');
        console.warn('Context:', {
            colorAsked: context.colorAsked,
            atout: context.atout,
            current_pli: context.current_pli,
            hand_suites: context.hand.map(c => c.suite),
            card_suite: card.suite
        });
        
        // Emergency rule: If truly no cards are playable, allow the lowest card
        const lowestCard = context.hand.reduce((lowest, current) => 
            current.valueNum < lowest.valueNum ? current : lowest);
        
        return card === lowestCard;
    }
    
    return false;
}

/**
 * Debug function to analyze why a card cannot be played
 * @param card The card to analyze
 * @param context The game context
 * @returns Debug information about rule violations
 */
export function debugCardPlayability(card: ICard, context: CardRulesContext): string[] {
    const issues: string[] = [];
    const { currentPlayerId, myId, current_pli, colorAsked, atout, hand } = context;
    
    if (currentPlayerId !== myId) {
        issues.push("Not player's turn");
        return issues;
    }
    
    if (current_pli.length === 0) {
        return []; // First card, should be playable
    }
    
    const hasColorAsked = hand.some((c: ICard) => c.suite === colorAsked);
    const hasAtout = hand.some((c: ICard) => c.suite === atout);
    
    if (hasColorAsked && card.suite !== colorAsked) {
        issues.push(`Must follow suit (${colorAsked}) but played ${card.suite}`);
    }
    
    if (!hasColorAsked && !hasAtout && card.suite === atout) {
        issues.push("Cannot play trump when having no trump cards");
    }
    
    // Add more specific rule violations as needed
    
    return issues;
}