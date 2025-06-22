import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ErrorServiceClient as _coinche_ErrorServiceClient, ErrorServiceDefinition as _coinche_ErrorServiceDefinition } from './coinche/ErrorService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  coinche: {
    ErrorService: SubtypeConstructor<typeof grpc.Client, _coinche_ErrorServiceClient> & { service: _coinche_ErrorServiceDefinition }
    ReportErrorRequest: MessageTypeDefinition
    ReportErrorResponse: MessageTypeDefinition
  }
}

