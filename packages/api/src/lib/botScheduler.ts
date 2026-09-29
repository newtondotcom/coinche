import type { ICard, Ibidding, ICardSuite, IPlayer } from "@coinche-reborn/api";
import {
  cardSuites,
  cardValues,
  formatbidding,
  formatCarteToPlay,
  genIdCuid,
} from "@coinche-reborn/api";
import controller from "./game";
import logger from "./logger";
import translateBidding from "./listener/bidding";
import translatePlay from "./listener/play";
import { isBotId } from "./bot";

const BOT_ACTION_DELAY_MS = 300;
const pendingActions = new Set<string>();

export function maybeScheduleBotTurn(gameId: string) {
  const state = controller.getInstance(gameId).state;
  const bidderId = state.phases.timeToBid;
  if (bidderId && isBotId(bidderId)) {
    scheduleBotBid(gameId, bidderId);
  }

  const playerId = state.phases.timeToPlay;
  if (playerId && isBotId(playerId)) {
    scheduleBotPlay(gameId, playerId);
  }
}

function scheduleBotBid(gameId: string, playerId: string) {
  const key = `${gameId}:bid:${playerId}`;
  if (pendingActions.has(key)) {
    return;
  }
  pendingActions.add(key);
  setTimeout(async () => {
    pendingActions.delete(key);
    await runBotBid(gameId, playerId);
  }, BOT_ACTION_DELAY_MS);
}

function scheduleBotPlay(gameId: string, playerId: string) {
  const key = `${gameId}:play:${playerId}`;
  if (pendingActions.has(key)) {
    return;
  }
  pendingActions.add(key);
  setTimeout(async () => {
    pendingActions.delete(key);
    await runBotPlay(gameId, playerId);
  }, BOT_ACTION_DELAY_MS);
}

async function runBotBid(gameId: string, playerId: string) {
  const state = controller.getInstance(gameId).state;
  if (state.status !== "playing") {
    return;
  }
  if (state.phases.timeToBid !== playerId) {
    return;
  }

  const player = state.players.find((p) => p.id === playerId);
  if (!player) {
    logger.warn(`[bot] Player ${playerId} not found in game ${gameId}`);
    return;
  }

  const bid = selectBotBid(player, state.currentRound.biddingElected.bidding);
  const event = {
    id: await genIdCuid(),
    type: "bidding",
    playerId,
    gameId,
    value: formatbidding(bid),
    timestamp: new Date().toISOString(),
  };

  logger.info(`[bot] Bid ${bid.bidding} ${bid.suite} for ${playerId} in game ${gameId}`);
  await translateBidding(event);
}

async function runBotPlay(gameId: string, playerId: string) {
  const state = controller.getInstance(gameId).state;
  if (state.status !== "playing") {
    return;
  }
  if (state.phases.timeToPlay !== playerId) {
    return;
  }

  const player = state.players.find((p) => p.id === playerId);
  const currentTrick = state.currentRound.tricks[state.currentRound.tricks.length - 1];
  if (!player || !currentTrick) {
    logger.warn(`[bot] Cannot play: missing player or trick in game ${gameId}`);
    return;
  }

  const card = selectBotCard(player.hands);
  if (!card) {
    logger.warn(`[bot] No card to play for ${playerId} in game ${gameId}`);
    return;
  }

  const event = {
    id: await genIdCuid(),
    type: "play",
    playerId,
    gameId,
    value: formatCarteToPlay(card, currentTrick.number, currentTrick.plays.length),
    timestamp: new Date().toISOString(),
  };

  logger.info(`[bot] Played ${card.suite}-${card.value} for ${playerId} in game ${gameId}`);
  await translatePlay(event);
}

function selectBotBid(player: IPlayer, currentBid: number): Ibidding {
  if (currentBid && currentBid !== 0) {
    return { bidding: 0, suite: "NA", playerId: player.id };
  }

  const suit = pickPreferredSuit(player.hands);
  return { bidding: 80, suite: suit, playerId: player.id };
}

function pickPreferredSuit(hand: ICard[]): ICardSuite {
  const counts = new Map<ICardSuite, number>();
  cardSuites.forEach((suite) => counts.set(suite, 0));
  hand.forEach((card) => {
    if (counts.has(card.suite)) {
      counts.set(card.suite, (counts.get(card.suite) ?? 0) + 1);
    }
  });

  let bestSuit: ICardSuite = cardSuites[0] ?? "hearts";
  let bestCount = -1;
  for (const suite of cardSuites) {
    const count = counts.get(suite) ?? 0;
    if (count > bestCount) {
      bestSuit = suite;
      bestCount = count;
    }
  }
  return bestSuit;
}

function selectBotCard(hand: ICard[]): ICard | null {
  if (!hand || hand.length === 0) {
    return null;
  }

  const valueRanks = new Map(cardValues.map((value, index) => [value, index]));
  const sorted = [...hand].sort((a, b) => {
    const diff = a.valueNum - b.valueNum;
    if (diff !== 0) {
      return diff;
    }
    return (valueRanks.get(a.value) ?? 0) - (valueRanks.get(b.value) ?? 0);
  });

  return sorted[0] ?? null;
}
