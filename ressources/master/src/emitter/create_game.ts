import { formatPoints } from "@coinche/shared";
import Master from "../game";
import supabase from "../supabase";
import genIdCuid from "@coinche/shared/src/gen_id";

export async function emitGameCreation(gameId: string) {
  // Check if there are any events for this gameId
  const { data: existingEvents, error: selectError } = await supabase
    .from("Events")
    .select("*")
    .eq("gameId", gameId)
    .eq("type", "join");

  if (selectError) {
    console.error("Error fetching events:", selectError);
    return;
  }

  if (existingEvents?.length === 0) {
    // create or update the score record
    const { data: existingEvents, error: selectError } = await supabase
      .from("Events")
      .select("*")
      .eq("gameId", gameId)
      .eq("type", "score");
    if (selectError) {
      console.error("Error fetching events:", selectError);
      return;
    }
    if (existingEvents?.length === 0) {
      await supabase.from("Events").insert([
        {
          id: await genIdCuid(),
          type: "annonce",
          playerId: "master",
          gameId: gameId,
          value: formatPoints(0, 0),
        },
      ]);
    }
  }
}
