import type { EventShared, IPlayer, PlayerPosition } from "@coinche/shared";
import { emitGameStarting } from "../emitter/start_game";
import Master from "../game";

export async function translateJoin(event: EventShared) {
  if (
    Master.getInstance(event.gameId).game.players.find(
      (player) => player.id === event.playerId,
    )
  ) {
    console.log("Player already in the game");
    return "";
  } else {
    const local: IPlayer = {
      id: event.playerId,
      surname: event.value as string,
      position: Master.getInstance(event.gameId).game.players
        .length as PlayerPosition,
      hands: [],
      classement: 0,
    };
    Master.getInstance(event.gameId).game.players.push(local);
    console.log("Addded player", local);
    if (Master.getInstance(event.gameId).game.players.length === 4) {
      const idPlayerStarting = Master.getInstance(event.gameId).game.players[0]
        .id;
      await emitGameStarting(idPlayerStarting);
    }
  }
  return;
}
