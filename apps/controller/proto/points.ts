import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { PointsServiceClient as _coinche_PointsServiceClient, PointsServiceDefinition as _coinche_PointsServiceDefinition } from './coinche/PointsService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    PointsService: SubtypeConstructor<typeof grpc.Client, _coinche_PointsServiceClient> & { service: _coinche_PointsServiceDefinition }
    UpdatePointsRequest: MessageTypeDefinition
    UpdatePointsResponse: MessageTypeDefinition
  }
}

