import type { ICard } from "@coinche-reborn/api";

export function orderCards(cards: ICard[], value: boolean): ICard[] {
  let orderedCards: ICard[] = [...cards];

  const diamonds = orderedCards.filter((card) => card.suite === "diamonds");
  const clubs = orderedCards.filter((card) => card.suite === "clubs");
  const hearts = orderedCards.filter((card) => card.suite === "hearts");
  const spades = orderedCards.filter((card) => card.suite === "spades");
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

  return orderedCards;
}
