import translateBidding from "../listener/bidding";
import translatePlay from "../listener/play";
import type { EventInsert } from "@coinche-reborn/api";
import { handlePlayerJoinLeave } from "./joinLeave";

export async function translateEvent(event: EventInsert) {
  switch (event.type) {
    case "bidding":
      return translateBidding(event);
    case "play":
      return translatePlay(event);
    case "join":
    case "leave":
      return handlePlayerJoinLeave(event);
    default:
      return "";
  }
}
