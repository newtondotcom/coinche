import { sendWS } from "@/lib/websocket/ws";
import { useStateStore } from "@/stores/state";

export async function emitSound(name: string) {
  const storeState = useStateStore();
  const gameId = storeState.gameId;
  sendWS({
    id: Bun.randomUUIDv7(),
    type: "sound",
    playerId: storeState.getMyId,
    gameId: gameId,
    value: name,
    timestamp: new Date().toISOString(),
  });
}
