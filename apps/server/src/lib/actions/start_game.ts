import { emitStartTrick } from "./start_trick";
import controller from '@/lib/game';


export async function emitGameStarting(playerId: string, gameId: string) {
  controller.getInstance(gameId).state.status = 'playing';
  controller.getInstance(gameId).sendState();
  await emitStartTrick(gameId,playerId);
}
