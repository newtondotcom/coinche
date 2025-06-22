import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ScoreServiceClient as _coinche_ScoreServiceClient, ScoreServiceDefinition as _coinche_ScoreServiceDefinition } from './coinche/ScoreService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    ScorePointsRequest: MessageTypeDefinition
    ScorePointsResponse: MessageTypeDefinition
    ScoreService: SubtypeConstructor<typeof grpc.Client, _coinche_ScoreServiceClient> & { service: _coinche_ScoreServiceDefinition }
  }
}

