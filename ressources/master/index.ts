import { createClient } from "@supabase/supabase-js";
import { translateEvent } from "./src/listener";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
