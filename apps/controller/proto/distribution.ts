import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { DistributionServiceClient as _coinche_DistributionServiceClient, DistributionServiceDefinition as _coinche_DistributionServiceDefinition } from './coinche/DistributionService';

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
    DistributeCardRequest: MessageTypeDefinition
    DistributeCardResponse: MessageTypeDefinition
    DistributionService: SubtypeConstructor<typeof grpc.Client, _coinche_DistributionServiceClient> & { service: _coinche_DistributionServiceDefinition }
    Game: MessageTypeDefinition
    Play: MessageTypeDefinition
    Player: MessageTypeDefinition
    PlayerPosition: EnumTypeDefinition
    Pli: MessageTypeDefinition
    Round: MessageTypeDefinition
  }
}

