import genIdCuid from "@coinche/shared/src/gen_id";
import Master from "../game";
import supabase from "../supabase";

export async function emitCanPlay(playerId: string, gameId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "can_play",
      playerId: "master",
      gameId: gameId,
      value: Master.getInstance(gameId).getLastPli().current_player_id,
    },
  ]);
}

export async function emitCanAnnonce(playerId: string, gameId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "can_annonce",
      playerId: "master",
      gameId: gameId,
      value: Master.getInstance(gameId).getLastPli().current_player_id,
    },
  ]);
}
