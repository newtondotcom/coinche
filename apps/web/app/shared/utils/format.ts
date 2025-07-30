import type {
  bidding,
  CardSuite,
  CardValue,
  Ibidding,
  ICard,
} from "@/shared/types";

export function formatbidding(bidding: Ibidding): string {
  return `${bidding.bidding}|${bidding.suite}`;
}

export function deformatBidding(bidding: string, playerId: string): Ibidding {
  const [biddingValue, suite] = bidding.split("|");
  return {
    bidding: parseInt(biddingValue || "0") as bidding,
    suite: (suite || "NA") as CardSuite,
    playerId: playerId,
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
    value: (value || "7") as CardValue,
    suite: (suite || "NA") as CardSuite,
    valueNum: parseInt(valueNum || "0"),
  };
  return {
    pli_number: parseInt(pli_number || "0"),
    card: card,
    number_in_pli: parseInt(number_in_pli || "0"),
  };
}

export function formatCarteToDistribute(
  card: ICard,
  pli_number: number,
): string {
  return `${pli_number}|${card.value}|${card.suite}`;
}
export function deformatCarteToDistribute(carte: string) {
  const [pli_number, value, suite] = carte.split("|");
  const card = {
    value: (value || "7") as CardValue,
    suite: (suite || "NA") as CardSuite,
    valueNum: parseInt(value || "0"),
  };
  return {
    pli_number: parseInt(pli_number || "0"),
    card: card,
  };
}

// first player id is the one starting the next pli
export function formatTeam(player1: string, player2: string): string {
  return `${player1}|${player2}`;
}

export function deformatTeam(team: string): [string, string] {
  const [player1, player2] = team.split("|");
  return [player1 || "", player2 || ""];
}

export function formatPoints(team1_score: number, team2_score: number): string {
  return `${team1_score} - ${team2_score}`;
}

export function unformatPoints(points: string): [number, number] {
  const [team1, team2] = points.split(" - ");
  return [parseInt(team1 || "0"), parseInt(team2 || "0")];
}
