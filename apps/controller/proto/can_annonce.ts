import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CanAnnonceServiceClient as _coinche_CanAnnonceServiceClient, CanAnnonceServiceDefinition as _coinche_CanAnnonceServiceDefinition } from './coinche/CanAnnonceService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    CanAnnonceRequest: MessageTypeDefinition
    CanAnnonceResponse: MessageTypeDefinition
    CanAnnonceService: SubtypeConstructor<typeof grpc.Client, _coinche_CanAnnonceServiceClient> & { service: _coinche_CanAnnonceServiceDefinition }
  }
}

