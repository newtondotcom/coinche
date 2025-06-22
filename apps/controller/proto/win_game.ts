import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { WinGameServiceClient as _coinche_WinGameServiceClient, WinGameServiceDefinition as _coinche_WinGameServiceDefinition } from './coinche/WinGameService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    WinGameRequest: MessageTypeDefinition
    WinGameResponse: MessageTypeDefinition
    WinGameService: SubtypeConstructor<typeof grpc.Client, _coinche_WinGameServiceClient> & { service: _coinche_WinGameServiceDefinition }
  }
}

