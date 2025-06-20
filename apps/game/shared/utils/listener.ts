import translateAnnonce from "@/shared/listener/annonce";
import {
  translateCoinche,
  translateSurcoinche,
} from "@/shared/listener/coinche";
import { translateDistribution } from "@/shared/listener/distribution";
import { translateEndDistribution } from "@/shared/listener/end_distribution";
import { translateEndGame } from "@/shared/listener/end_game";
import { translateEndRound } from "@/shared/listener/end_round";
import { translateJoin } from "@/shared/listener/join";
import translatePlay from "@/shared/listener/play";
import { translatePoints } from "@/shared/listener/points";
import { translatePointsRound } from "@/shared/listener/points_round";
import { translateSound } from "@/shared/listener/sound";
import { translateStartDistribution } from "@/shared/listener/start_distribution";
import { translateStartPli } from "@/shared/listener/start_pli";
import { translateStartRound } from "@/shared/listener/start_round";
import { translateWinPli } from "@/shared/listener/win_pli";
import { createClient } from "@supabase/supabase-js";
import { translateStart } from "@/shared/listener/start_game";
import type { Database, EventInsert } from "@/shared/utils/format";

import { translateCanAnnonce, translateCanPlay } from "@/shared/listener/can";

const config = useRuntimeConfig();
export const supabase = createClient<Database>(
  config.public.SUPABASE_URL,
  config.public.SUPABASE_ANON_KEY,
);

function translateLeave(event: EventInsert) {
  const storePlayers = usePlayersStore();
  storePlayers.players = storePlayers.players.filter(
    (player) => player.id !== event.playerId,
  );
  return;
}

function translateError(event: EventInsert) {
  console.log(event.value);
  return;
}

export default async function translateEvent(event: EventInsert) {
  switch (event.type) {
    case "annonce":
      return translateAnnonce(event);
    case "coinche":
      return translateCoinche(event);
    case "surcoinche":
      return translateSurcoinche(event);
    case "play":
      return translatePlay(event);
    case "end_game":
      return translateEndGame(event);
    case "end_round":
      return translateEndRound(event);
    case "start_game":
      return translateStart(event);
    case "start_pli":
      return translateStartPli(event);
    case "leave":
      return translateLeave(event);
    case "join":
      return translateJoin(event);
    case "error":
      return translateError(event);
    case "win_pli":
      return translateWinPli(event);
    case "distribution":
      return translateDistribution(event);
    case "score":
      return translatePoints(event);
    case "score_round":
      return translatePointsRound(event);
    case "start_distribution":
      return translateStartDistribution(event);
    case "start_annonce":
      return translateEndDistribution(event);
    case "can_play":
      return translateCanPlay(event);
    case "can_annonce":
      return translateCanAnnonce(event);
    case "start_round":
      return translateStartRound(event);
    case "sound":
      return translateSound(event);
    default:
      return "";
  }
}
