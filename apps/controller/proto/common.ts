import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';


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
    Player: MessageTypeDefinition
    PlayerPosition: EnumTypeDefinition
    Pli: MessageTypeDefinition
    Round: MessageTypeDefinition
  }
}

