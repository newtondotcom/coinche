import type { Ibidding, ICard, ICardSuite, ICardValue, bidding } from './types';

export function formatbidding(bidding: Ibidding): string {
  return `${bidding.suite}|${bidding.bidding}`;
}

export function deformatBidding(value: string, playerId: string): Ibidding {
  const [suite, biddingStr] = value.split('|');
  return {
    suite: suite as ICardSuite,
    bidding: parseInt(biddingStr) as bidding, 
    playerId,
  };
}

export function formatCarteToDistribute(card: ICard, pli_number: number): string {
  return `${pli_number}|${card.value}|${card.suite}`;
}

export function deformatCarteToDistribute(carte: string) {
  const [pli_number, value, suite] = carte.split("|");
  const card = {
    value: value as ICardValue,
    suite: suite as ICardSuite,
    valueNum: parseInt(value),
  };
  return {
    pli_number: parseInt(pli_number),
    card: card,
  };
}

export function deformatCarteToPlay(carte: string) {
  const [pli_number, value, suite, valueNum, number_in_pli] = carte.split("|");
  const card = {
    value: value as ICardValue,
    suite: suite as ICardSuite,
    valueNum: parseInt(valueNum),
  };
  return {
    pli_number: parseInt(pli_number),
    card: card,
    number_in_pli: parseInt(number_in_pli),
  };
}


export function formatCarteToPlay(
    card: ICard,
    pli_number: number,
    number_in_pli: number,
  ): string {
    return `${pli_number}|${card.value}|${card.suite}|${card.valueNum}|${number_in_pli}`;
}

export function formatTeam(player1Id: string, player2Id: string): string {
  return `${player1Id}-${player2Id}`;
}

export function formatPoints(team1Points: number, team2Points: number): string {
  return `${team1Points}-${team2Points}`;
}

export function deformatTeam(team: string): [string, string] {
  const [player1Id, player2Id] = team.split('-');
  return [player1Id!, player2Id!];
}

export function unformatPoints(points: string): [number, number] {
  const [team1Points, team2Points] = points.split('-').map(Number);
  return [team1Points!, team2Points!];
} 