import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { WinPliServiceClient as _coinche_WinPliServiceClient, WinPliServiceDefinition as _coinche_WinPliServiceDefinition } from './coinche/WinPliService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    WinPliRequest: MessageTypeDefinition
    WinPliResponse: MessageTypeDefinition
    WinPliService: SubtypeConstructor<typeof grpc.Client, _coinche_WinPliServiceClient> & { service: _coinche_WinPliServiceDefinition }
  }
}

