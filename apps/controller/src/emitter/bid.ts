import type { Ibidding } from '@coinche/shared';
import genIdCuid from '../../../game/shared/utils/gen_id';
import type { EventInsert } from '@/../index'; // Adjust import if EventInsert type is elsewhere
import { formatbidding } from '../../../game/shared/utils/format';

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