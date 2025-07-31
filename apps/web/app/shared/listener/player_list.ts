import { usePlayersStore } from "@/stores/players";
import type { IPlayer } from "@coinche/shared";
import { toast } from "vue-sonner";

/**
 * Updates the player store with the full player list from the server.
 * @param event The event object received from the server (type: 'player_list')
 * @param storePlayers The Pinia/Vue store for players
 */
export function translatePlayerList(event: any) {
  if (Array.isArray(event.value)) {
    const storePlayers = usePlayersStore();
    handlePlayerListNotification(event.value, storePlayers.players);
    const buildPlayers = event.value.map((player: IPlayer, index: number) => ({
      id: player.id,
      position: player.position,
      hands: player.hands,
      classement: player.classement,
    }));
    storePlayers.setPlayers(buildPlayers);
    console.log("There are now : " + event.value.length + " players");
  } else {
      console.error("error in translatePlayerList", event.value);
  }
}

/**
 * Compares the new player list to the previous one and triggers notifications for joins/leaves.
 * @param newPlayers The new array of player objects
 * @param prevPlayers The previous array of player objects
 */
export function handlePlayerListNotification(newPlayers: IPlayer[], prevPlayers: IPlayer[]) {
  // Extract player IDs for comparison
  const newPlayerIds = newPlayers.map(p => p.id);
  const prevPlayerIds = prevPlayers.map(p => p.id);
  
  // Find joined players
  const joined = newPlayerIds.filter(id => !prevPlayerIds.includes(id));
  // Find left players
  const left = prevPlayerIds.filter(id => !newPlayerIds.includes(id));
  
  joined.forEach(playerId => toast(`${playerId} joined the game!`));
  left.forEach(playerId => toast(`${playerId} left the game!`));
} 