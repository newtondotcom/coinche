import { deformatBid } from "@/shared/utils/format";
import { toast } from "vue-sonner";
import type { EventInsert } from "@coinche/shared";

export default async function translateBid(event: EventInsert) {
  const storeGame = useGameStore();
  const storePlayers = usePlayersStore();
  const bid = deformatBid(event.value as string, event.playerId);
  const playerName = event.playerId;
  if (bid.bidding === 0) {
    toast.message("Passe", {
      description: `${playerName} passe`,
    });
  } else {
    storeGame.setLastBid(bid);
  }
  storeGame.addBidToRound(bid);
  storePlayers.setLastBid(bid, event.playerId);
  return;
}
