import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { StartGameServiceClient as _coinche_StartGameServiceClient, StartGameServiceDefinition as _coinche_StartGameServiceDefinition } from './coinche/StartGameService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    StartGameRequest: MessageTypeDefinition
    StartGameResponse: MessageTypeDefinition
    StartGameService: SubtypeConstructor<typeof grpc.Client, _coinche_StartGameServiceClient> & { service: _coinche_StartGameServiceDefinition }
  }
}

