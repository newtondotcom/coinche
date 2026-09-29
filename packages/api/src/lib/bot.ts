import type { IGameState, IPlayer, PlayerId, PlayerPosition } from "@coinche-reborn/api";

const BOT_ID_PREFIX = "bot:";

export function isBotId(playerId: PlayerId): boolean {
  return playerId.startsWith(BOT_ID_PREFIX);
}

export function getBotId(gameId: string, position: PlayerPosition): PlayerId {
  return `${BOT_ID_PREFIX}${gameId}:${position}`;
}

export function createBotPlayer(gameId: string, position: PlayerPosition): IPlayer {
  return {
    id: getBotId(gameId, position),
    position,
    hands: [],
    classement: 0,
  };
}

export function replacePlayerIdInState(
  state: IGameState,
  previousId: PlayerId,
  nextId: PlayerId,
) {
  if (previousId === nextId) {
    return;
  }

  const player = state.players.find((p) => p.id === previousId);
  if (player) {
    player.id = nextId;
  }

  state.team1 = state.team1.map((id) => (id === previousId ? nextId : id));
  state.team2 = state.team2.map((id) => (id === previousId ? nextId : id));

  if (state.phases.timeToBid === previousId) {
    state.phases.timeToBid = nextId;
  }
  if (state.phases.timeToPlay === previousId) {
    state.phases.timeToPlay = nextId;
  }
  if (state.phases.timeDistrib === previousId) {
    state.phases.timeDistrib = nextId;
  }

  state.currentRound.biddings.forEach((bid) => {
    if (bid.playerId === previousId) {
      bid.playerId = nextId;
    }
  });

  if (state.currentRound.biddingElected.playerId === previousId) {
    state.currentRound.biddingElected.playerId = nextId;
  }

  state.currentRound.tricks.forEach((trick) => {
    if (trick.playerStartingId === previousId) {
      trick.playerStartingId = nextId;
    }
    trick.plays.forEach((play) => {
      if (play.playerId === previousId) {
        play.playerId = nextId;
      }
    });
  });
}
