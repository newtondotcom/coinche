import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { StartRoundServiceClient as _coinche_StartRoundServiceClient, StartRoundServiceDefinition as _coinche_StartRoundServiceDefinition } from './coinche/StartRoundService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    StartRoundRequest: MessageTypeDefinition
    StartRoundResponse: MessageTypeDefinition
    StartRoundService: SubtypeConstructor<typeof grpc.Client, _coinche_StartRoundServiceClient> & { service: _coinche_StartRoundServiceDefinition }
  }
}

