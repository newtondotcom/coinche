import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { LeaveServiceClient as _coinche_LeaveServiceClient, LeaveServiceDefinition as _coinche_LeaveServiceDefinition } from './coinche/LeaveService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    LeaveGameRequest: MessageTypeDefinition
    LeaveGameResponse: MessageTypeDefinition
    LeaveService: SubtypeConstructor<typeof grpc.Client, _coinche_LeaveServiceClient> & { service: _coinche_LeaveServiceDefinition }
  }
}

