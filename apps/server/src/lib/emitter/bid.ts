import genIdCuid from '@/lib/utils/gen_id';
import { formatbidding } from '@/lib/utils/format';
import type { EventInsert, Ibidding } from '@/lib/types';

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