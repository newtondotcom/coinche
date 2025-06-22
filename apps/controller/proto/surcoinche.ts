import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { SurcoincheServiceClient as _coinche_SurcoincheServiceClient, SurcoincheServiceDefinition as _coinche_SurcoincheServiceDefinition } from './coinche/SurcoincheService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    SurcoincheRequest: MessageTypeDefinition
    SurcoincheResponse: MessageTypeDefinition
    SurcoincheService: SubtypeConstructor<typeof grpc.Client, _coinche_SurcoincheServiceClient> & { service: _coinche_SurcoincheServiceDefinition }
  }
}

