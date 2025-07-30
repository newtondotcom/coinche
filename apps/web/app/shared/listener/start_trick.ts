import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import type { EventInsert } from '@/shared/types';
import { toast } from 'vue-sonner';

/**
 * Handles the 'start_trick' event from the server.
 * Sets the current player to the one who starts the trick and logs the event.
 * @param event The event object (type: 'start_trick')
 */
export default function translateStartTrick(event: EventInsert) {
  const storeGame = useGameStore();
  const playerId = event.playerId
  storeGame.setCurrentPlayerId(playerId);
  storeGame.setNewRound();
  console.info(`[start_trick] It's now ${playerId}'s turn to start the trick.`);
  toast.message(`${playerId} commence le round`);
} 