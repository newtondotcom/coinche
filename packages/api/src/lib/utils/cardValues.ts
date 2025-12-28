import type { ICard, ICardSuite } from "@coinche-reborn/api";

/**
 * Calculate card values according to the trump suit
 * This function sets valueNum for each card based on the trump rules
 */
export function setValueAccordingToTrump(deck: ICard[], trump: ICardSuite): ICard[] {
  return deck.map((card) => {
    // Traditional Trump: Set values for the chosen trump suit
    if (trump !== "tout-atout" && trump !== "sans-atout") {
      if (card.suite === trump) {
        // Trump cards have special values
        switch (card.value) {
          case "7":
          case "8":
            card.valueNum = 0;
            break;
          case "9":
            card.valueNum = 14;
            break;
          case "J":
            card.valueNum = 20;
            break;
          case "Q":
            card.valueNum = 3;
            break;
          case "K":
            card.valueNum = 4;
            break;
          case "10":
            card.valueNum = 10;
            break;
          case "A":
            card.valueNum = 11;
            break;
          default:
            card.valueNum = 0;
            break;
        }
      } else {
        // Set default values for non-trump cards
        switch (card.value) {
          case "7":
          case "8":
          case "9":
            card.valueNum = 0;
            break;
          case "J":
            card.valueNum = 2;
            break;
          case "Q":
            card.valueNum = 3;
            break;
          case "K":
            card.valueNum = 4;
            break;
          case "10":
            card.valueNum = 10;
            break;
          case "A":
            card.valueNum = 11;
            break;
          default:
            card.valueNum = 0;
            break;
        }
      }
    }
    // Sans-Atout: Set values for all cards (no trump suit)
    else if (trump === "sans-atout") {
      switch (card.value) {
        case "J":
          card.valueNum = 2;
          break;
        case "Q":
          card.valueNum = 3;
          break;
        case "K":
          card.valueNum = 4;
          break;
        case "10":
          card.valueNum = 10;
          break;
        case "A":
          card.valueNum = 19;
          break;
        case "7":
        case "8":
        case "9":
          card.valueNum = 0;
          break;
        default:
          card.valueNum = 0;
          break;
      }
    }
    // Tout-Atout: All cards are assigned specific values
    else if (trump === "tout-atout") {
      switch (card.value) {
        case "9":
          card.valueNum = 9;
          break;
        case "J":
          card.valueNum = 14;
          break;
        case "Q":
          card.valueNum = 2;
          break;
        case "K":
          card.valueNum = 3;
          break;
        case "10":
          card.valueNum = 5;
          break;
        case "A":
          card.valueNum = 7;
          break;
        case "7":
        case "8":
          card.valueNum = 0;
          break;
        default:
          card.valueNum = 0;
          break;
      }
    }

    return card;
  });
}
