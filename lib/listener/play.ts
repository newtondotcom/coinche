import { setNextPlayerTurn } from '@/lib/emitter/annonce';
import { deformatCarteToPlay } from '@/lib/emitter/distribution';
import { assertPliNumber } from '@/lib/utils/miscs';

export default function translatePlay(event: EventShared) {
    const storeGame = useGameStore();
    const def = deformatCarteToPlay(event.value as string);
    const card = def.card;
    const pli_number = def.pli_number;
    assertPliNumber(pli_number, storeGame.pli_number);
    const player_id = event.playerId;
    storeGame.addCardToPliAndRemove(card, player_id);
    setNextPlayerTurn(player_id);
    return;
}
