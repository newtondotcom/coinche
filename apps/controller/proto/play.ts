import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { PlayServiceClient as _coinche_PlayServiceClient, PlayServiceDefinition as _coinche_PlayServiceDefinition } from './coinche/PlayService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    AnnonceMsg: MessageTypeDefinition
    AnnonceType: EnumTypeDefinition
    Card: MessageTypeDefinition
    CardSuite: EnumTypeDefinition
    CardValue: EnumTypeDefinition
    Game: MessageTypeDefinition
    Play: MessageTypeDefinition
    PlayCardRequest: MessageTypeDefinition
    PlayCardResponse: MessageTypeDefinition
    PlayService: SubtypeConstructor<typeof grpc.Client, _coinche_PlayServiceClient> & { service: _coinche_PlayServiceDefinition }
    Player: MessageTypeDefinition
    PlayerPosition: EnumTypeDefinition
    Pli: MessageTypeDefinition
    Round: MessageTypeDefinition
  }
}

