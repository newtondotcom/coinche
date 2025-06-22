import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ScoreRoundServiceClient as _coinche_ScoreRoundServiceClient, ScoreRoundServiceDefinition as _coinche_ScoreRoundServiceDefinition } from './coinche/ScoreRoundService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    ScoreRoundRequest: MessageTypeDefinition
    ScoreRoundResponse: MessageTypeDefinition
    ScoreRoundService: SubtypeConstructor<typeof grpc.Client, _coinche_ScoreRoundServiceClient> & { service: _coinche_ScoreRoundServiceDefinition }
  }
}

