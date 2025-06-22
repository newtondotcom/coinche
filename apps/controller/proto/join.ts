import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { JoinServiceClient as _coinche_JoinServiceClient, JoinServiceDefinition as _coinche_JoinServiceDefinition } from './coinche/JoinService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    JoinGameRequest: MessageTypeDefinition
    JoinGameResponse: MessageTypeDefinition
    JoinService: SubtypeConstructor<typeof grpc.Client, _coinche_JoinServiceClient> & { service: _coinche_JoinServiceDefinition }
  }
}

