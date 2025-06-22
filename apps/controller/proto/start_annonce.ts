import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { StartAnnonceServiceClient as _coinche_StartAnnonceServiceClient, StartAnnonceServiceDefinition as _coinche_StartAnnonceServiceDefinition } from './coinche/StartAnnonceService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    StartAnnonceRequest: MessageTypeDefinition
    StartAnnonceResponse: MessageTypeDefinition
    StartAnnonceService: SubtypeConstructor<typeof grpc.Client, _coinche_StartAnnonceServiceClient> & { service: _coinche_StartAnnonceServiceDefinition }
  }
}

