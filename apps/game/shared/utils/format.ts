import type {
  Annonce,
  CardSuite,
  CardValue,
  IAnnonce,
  ICard,
} from "@coinche/shared/types";

export function formatAnnonce(annonce: IAnnonce): string {
  return `${annonce.annonce}|${annonce.suite}`;
}

export function deformatAnnonce(annonce: string, playerId: string): IAnnonce {
  const [annonceValue, suite] = annonce.split("|");
  return {
    annonce: parseInt(annonceValue) as Annonce,
    suite: suite as CardSuite,
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
    value: value as CardValue,
    suite: suite as CardSuite,
    valueNum: parseInt(valueNum),
  };
  return {
    pli_number: parseInt(pli_number),
    card: card,
    number_in_pli: parseInt(number_in_pli),
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
    value: value as CardValue,
    suite: suite as CardSuite,
    valueNum: parseInt(value),
  };
  return {
    pli_number: parseInt(pli_number),
    card: card,
  };
}

// first player id is the one starting the next pli
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
