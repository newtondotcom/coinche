import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { EndRoundServiceClient as _coinche_EndRoundServiceClient, EndRoundServiceDefinition as _coinche_EndRoundServiceDefinition } from './coinche/EndRoundService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    EndRoundRequest: MessageTypeDefinition
    EndRoundResponse: MessageTypeDefinition
    EndRoundService: SubtypeConstructor<typeof grpc.Client, _coinche_EndRoundServiceClient> & { service: _coinche_EndRoundServiceDefinition }
  }
}

