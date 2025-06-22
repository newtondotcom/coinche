import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CanPlayServiceClient as _coinche_CanPlayServiceClient, CanPlayServiceDefinition as _coinche_CanPlayServiceDefinition } from './coinche/CanPlayService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    CanPlayRequest: MessageTypeDefinition
    CanPlayResponse: MessageTypeDefinition
    CanPlayService: SubtypeConstructor<typeof grpc.Client, _coinche_CanPlayServiceClient> & { service: _coinche_CanPlayServiceDefinition }
  }
}

