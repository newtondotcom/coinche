async function translateEvent(event: EventShared) {
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
      return translateEnd(event);
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
    case "win_game":
      return translateWinGame(event);
    case "distribution":
      return translateDistribution(event);
    case "score":
      return translatePoints(event);
    case "score_pli":
      return translatePointsPli(event);
    case "start_distribution":
      return translateStartDistribution(event);
    case "start_annonce":
      return translateEndDistribution(event);
    default:
      return "";
  }
}
