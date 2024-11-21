import { translateEvent } from "./src/listener";
import supabase from "./src/supabase";

const handleInserts = (payload: any) => {
  translateEvent(payload.new);
};

const gameId = "0";
supabase
  .channel(gameId)
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "Events" },
    handleInserts,
  )
  .subscribe();

console.log("Listening for changes in game", gameId);
