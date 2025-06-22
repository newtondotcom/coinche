import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { EndGameServiceClient as _coinche_EndGameServiceClient, EndGameServiceDefinition as _coinche_EndGameServiceDefinition } from './coinche/EndGameService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    EndGameRequest: MessageTypeDefinition
    EndGameResponse: MessageTypeDefinition
    EndGameService: SubtypeConstructor<typeof grpc.Client, _coinche_EndGameServiceClient> & { service: _coinche_EndGameServiceDefinition }
  }
}

