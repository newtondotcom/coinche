import { sendWS } from "@/shared/utils/ws";
import { formatbidding, genIdCuid } from "@coinche-reborn/api";
import type { Ibidding } from "@coinche-reborn/api";
import { useStateStore } from "@/stores/state";

export default async function emitBid(bidding: Ibidding) {
  const storeState = useStateStore();
  const gameId = storeState.gameId;
  sendWS({
    id: await genIdCuid(),
    type: "bidding",
    playerId: bidding.playerId,
    gameId: gameId,
    value: formatbidding(bidding),
    timestamp: new Date().toISOString(),
  });
}
