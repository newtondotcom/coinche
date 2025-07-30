import type { Ibidding, ICard } from '@/lib/types';

export function formatbidding(bidding: Ibidding): string {
  return `${bidding.suite}-${bidding.bidding}`;
}

export function deformatBidding(value: string, playerId: string): Ibidding {
  const [suite, biddingStr] = value.split('-');
  return {
    suite: suite as any,
    bidding: parseInt(biddingStr) as any,
    playerId,
  };
}

export function formatCarteToDistribute(card: ICard, pli_number: number): string {
  return `${pli_number}|${card.value}|${card.suite}`;
}

export function deformatCarteToDistribute(carte: string) {
  const [pli_number, value, suite] = carte.split("|");
  const card = {
    value: value as any,
    suite: suite as any,
    valueNum: parseInt(value),
  };
  return {
    pli_number: parseInt(pli_number),
    card: card,
  };
}

export function formatCarteToPlay(
  card: ICard,
  pli_number: number,
  number_in_pli: number,
): string {
  return `${pli_number}|${card.value}|${card.suite}|${card.valueNum}|${number_in_pli}`;
}

export function deformatCarteToPlay(carte: string) {
  const [pli_number, value, suite, valueNum, number_in_pli] = carte.split("|");
  const card = {
    value: value as any,
    suite: suite as any,
    valueNum: parseInt(valueNum),
  };
  return {
    pli_number: parseInt(pli_number),
    card: card,
    number_in_pli: parseInt(number_in_pli),
  };
}

export function formatTeam(player1Id: string, player2Id: string): string {
  return `${player1Id}-${player2Id}`;
}

export function formatPoints(team1Points: number, team2Points: number): string {
  return `${team1Points}-${team2Points}`;
} 