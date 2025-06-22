import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { StartPliServiceClient as _coinche_StartPliServiceClient, StartPliServiceDefinition as _coinche_StartPliServiceDefinition } from './coinche/StartPliService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    StartPliRequest: MessageTypeDefinition
    StartPliResponse: MessageTypeDefinition
    StartPliService: SubtypeConstructor<typeof grpc.Client, _coinche_StartPliServiceClient> & { service: _coinche_StartPliServiceDefinition }
  }
}

