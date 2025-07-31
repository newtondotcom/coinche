import { formatbidding, genIdCuid } from '@coinche/shared';
import type { EventInsert, Ibidding } from '@coinche/shared';

export async function emitBid(
  bid: Ibidding,
  gameId : string,
  publish: (payload: any) => void
) {
  const event: EventInsert = {
    id: await genIdCuid(),
    type: 'bid',
    playerId: bid.playerId,
    gameId: gameId,
    value: formatbidding(bid),
    timestamp: new Date().toISOString(),
  };
  publish(event);
}