import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { toast } from "vue-sonner";
import { deformatBidding, type EventInsert } from "@coinche/shared";

export default async function translateBidding(event: EventInsert) {
  const storeGame = useGameStore();
  const storePlayers = usePlayersStore();
  const bidding = deformatBidding(event.value as string, event.playerId);
  const playerName = event.playerId;
  if (bidding.bidding === 0) {
    toast.message("Passe", {
      description: `${playerName} passe`,
    });
  } else { 
      storeGame.setLastbidding(bidding);
  }
  storeGame.addbiddingToPli(bidding);
  storePlayers.setLastbidding(bidding, event.playerId);
  return;
}
