import translateBidding from "@/shared/listener/bidding";
import { translateDealing } from "@/shared/listener/distribution";
import { translateEndDistribution } from "@/shared/listener/end_distribution";
import { translateEndGame } from "@/shared/listener/end_game";
import { translateEndRound } from "@/shared/listener/end_trick";
import { translateJoin } from "@/shared/listener/join";
import translatePlay from "@/shared/listener/play";
import { translatePoints } from "@/shared/listener/points";
import { translatePointsRound } from "@/shared/listener/points_trick";
import { translateSound } from "@/shared/listener/sound";
import { translateStartDistribution } from "@/shared/listener/start_distribution";
import { translateStartPli } from "@/shared/listener/start_pli";
import { translateWinPli } from "@/shared/listener/win_pli";
import { translateStart } from "@/shared/listener/start_game";
import { translateCanBid, translateCanPlay } from "@/shared/listener/can";
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
    case "bid":
      return translateBidding(event);
    case "play":
      return translatePlay(event);
    case "end_game":
      return translateEndGame(event);
    case "end_trick":
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
    case "dealing":
      return translateDealing(event);
    case "score":
      return translatePoints(event);
    case "score_trick":
      return translatePointsRound(event);
    case "start_distribution":
      return translateStartDistribution(event);
    case "start_bidding":
      return translateEndDistribution(event);
    case "can_play":
      return translateCanPlay(event);
    case "can_bid":
      return translateCanBid(event);
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
