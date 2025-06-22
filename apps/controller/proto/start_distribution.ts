import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { StartDistributionServiceClient as _coinche_StartDistributionServiceClient, StartDistributionServiceDefinition as _coinche_StartDistributionServiceDefinition } from './coinche/StartDistributionService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    StartDistributionRequest: MessageTypeDefinition
    StartDistributionResponse: MessageTypeDefinition
    StartDistributionService: SubtypeConstructor<typeof grpc.Client, _coinche_StartDistributionServiceClient> & { service: _coinche_StartDistributionServiceDefinition }
  }
}

