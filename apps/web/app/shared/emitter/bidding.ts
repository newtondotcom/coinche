import { sendWS } from "@/shared/utils/ws";
import { formatbidding } from "@coinche-reborn/api";
import type { Ibidding } from "@coinche-reborn/api";
import { useStateStore } from "@/stores/state";

export default async function emitBid(bidding: Ibidding) {
  const storeState = useStateStore();
  const gameId = storeState.gameId;
  sendWS({
    id: Bun.randomUUIDv7(),
    type: "bidding",
    playerId: bidding.playerId,
    gameId: gameId,
    value: formatbidding(bidding),
    timestamp: new Date().toISOString(),
  });
}
