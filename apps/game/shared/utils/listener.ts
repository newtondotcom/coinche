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
import { translateWinPli } from "@/shared/listener/win_pli";
import { translateStart } from "@/shared/listener/start_game";
import { translateCanAnnonce, translateCanPlay } from "@/shared/listener/can";
import translateStartTrick from "../listener/start_trick";
import { translatePlayerList } from "../listener/player_list";

function translateLeave(event: any) {
  console.log(event.value);
  return;
}

function translateSystem(event : any){
  console.log(event);
  return
}

function translateError(event: any) {
  console.log(event.value);
  return;
}

export function handleWSEvent(event: any) {
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
    case "start_trick":
      return translateStartTrick(event);
    case "sound":
      return translateSound(event);
    case "player_list":
      return translatePlayerList(event);
    case "system":
      return translateSystem(event);
    default:
      console.error("no event");
      return "";
  }
}
