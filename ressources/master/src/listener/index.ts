import type { EventShared } from "@coinche/shared";
import translateAnnonce from "./annonce";
import { translateCoinche, translateSurcoinche } from "./coinche";
import { translateJoin } from "./join";
import translatePlay from "./play";

export async function translateEvent(event: EventShared) {
  switch (event.type) {
    case "annonce":
      return translateAnnonce(event);
    case "coinche":
      return translateCoinche(event);
    case "surcoinche":
      return translateSurcoinche(event);
    case "play":
      return translatePlay(event);
    case "join":
      return translateJoin(event);
    default:
      return "";
  }
}
