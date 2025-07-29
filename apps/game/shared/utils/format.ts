import type {
  bidding,
  CardSuite,
  CardValue,
  IBid,
  ICard,
} from "@coinche/shared/types";

export function formatBid(bid: IBid): string {
  return `${bid.bidding}|${bid.suite}`;
}

export function deformatBid(bidString: string, playerId: string): IBid {
  const [biddingValue, suite] = bidString.split("|");
  return {
    bidding: parseInt(biddingValue) as bidding,
    suite: suite as CardSuite,
    playerId: playerId,
  };
}

export function formatCarteToPlay(
  card: ICard,
  trick_number: number,
  number_in_trick: number,
): string {
  return `${trick_number}|${card.value}|${card.suite}|${card.valueNum}|${number_in_trick}`;
}
export function deformatCarteToPlay(carte: string) {
  const [trick_number, value, suite, valueNum, number_in_trick] = carte.split("|");
  const card = {
    value: value as CardValue,
    suite: suite as CardSuite,
    valueNum: parseInt(valueNum),
  };
  return {
    trick_number: parseInt(trick_number),
    card: card,
    number_in_trick: parseInt(number_in_trick),
  };
}

export function formatCarteToDistribute(
  card: ICard,
  trick_number: number,
): string {
  return `${trick_number}|${card.value}|${card.suite}`;
}
export function deformatCarteToDistribute(carte: string) {
  const [trick_number, value, suite] = carte.split("|");
  const card = {
    value: value as CardValue,
    suite: suite as CardSuite,
    valueNum: parseInt(value),
  };
  return {
    trick_number: parseInt(trick_number),
    card: card,
  };
}

// first player id is the one starting the next trick
export function formatTeam(player1: string, player2: string): string {
  return `${player1}|${player2}`;
}

export function deformatTeam(team: string): [string, string] {
  const [player1, player2] = team.split("|");
  return [player1, player2];
}

export function formatPoints(team1_score: number, team2_score: number): string {
  return `${team1_score} - ${team2_score}`;
}

export function unformatPoints(points: string): [number, number] {
  const [team1, team2] = points.split(" - ");
  return [parseInt(team1), parseInt(team2)];
}
