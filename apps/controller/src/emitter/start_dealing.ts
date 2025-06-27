import emitDealing from "@/emitter/dealing";
import controller from "@/game";
import supabase from "@/supabase";
import { generateDeckCards } from "@/utils";
import genIdCuid from "../../../game/shared/utils/gen_id";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitStartDealing(gameId: string, publish: (payload: any) => void) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_distribution",
      playerId: "controller",
      gameId: gameId,
      value: "idPlayerStarting",
    },
  ]);
  if (controller.getInstance(gameId).game.rounds.length === 1) {
    controller.getInstance(gameId).game.deck = generateDeckCards();
  }
  await emitDealing(
    controller.getInstance(gameId).getLastPli().player_starting_id,
    gameId,
    publish
  );
}
