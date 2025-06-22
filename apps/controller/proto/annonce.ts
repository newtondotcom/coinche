import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { AnnonceServiceClient as _coinche_AnnonceServiceClient, AnnonceServiceDefinition as _coinche_AnnonceServiceDefinition } from './coinche/AnnonceService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    AnnonceMsg: MessageTypeDefinition
    AnnonceService: SubtypeConstructor<typeof grpc.Client, _coinche_AnnonceServiceClient> & { service: _coinche_AnnonceServiceDefinition }
    AnnonceType: EnumTypeDefinition
    Card: MessageTypeDefinition
    CardSuite: EnumTypeDefinition
    CardValue: EnumTypeDefinition
    Game: MessageTypeDefinition
    MakeAnnonceRequest: MessageTypeDefinition
    MakeAnnonceResponse: MessageTypeDefinition
    Play: MessageTypeDefinition
    Player: MessageTypeDefinition
    PlayerPosition: EnumTypeDefinition
    Pli: MessageTypeDefinition
    Round: MessageTypeDefinition
  }
}

