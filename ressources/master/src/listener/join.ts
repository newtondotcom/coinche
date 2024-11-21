import type { EventShared, IPlayer, PlayerPosition } from "@coinche/shared";
import { emitGameStarting } from "../emitter/start_game";
import Master from "../game";

export async function translateJoin(event: EventShared) {
  if (
    Master.instance.game.players.find((player) => player.id === event.playerId)
  ) {
    console.log("Player already in the game");
    return "";
  } else {
    const local: IPlayer = {
      id: event.playerId,
      surname: event.value as string,
      position: Master.instance.game.players.length as PlayerPosition,
      hands: [],
      classement: 0,
    };
    Master.instance.game.players.push(local);
    console.log("Addded player", local);
    if (Master.instance.game.players.length === 4) {
      const idPlayerStarting = Master.instance.game.players[0].id;
      await emitGameStarting(idPlayerStarting);
    }
  }
  return;
}
