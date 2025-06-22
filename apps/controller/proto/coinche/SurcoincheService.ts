// Original file: ../shared/grpc/surcoinche.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { SurcoincheRequest as _coinche_SurcoincheRequest, SurcoincheRequest__Output as _coinche_SurcoincheRequest__Output } from '../coinche/SurcoincheRequest';
import type { SurcoincheResponse as _coinche_SurcoincheResponse, SurcoincheResponse__Output as _coinche_SurcoincheResponse__Output } from '../coinche/SurcoincheResponse';

export interface SurcoincheServiceClient extends grpc.Client {
  Surcoinche(argument: _coinche_SurcoincheRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_SurcoincheResponse__Output>): grpc.ClientUnaryCall;
  Surcoinche(argument: _coinche_SurcoincheRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_SurcoincheResponse__Output>): grpc.ClientUnaryCall;
  Surcoinche(argument: _coinche_SurcoincheRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_SurcoincheResponse__Output>): grpc.ClientUnaryCall;
  Surcoinche(argument: _coinche_SurcoincheRequest, callback: grpc.requestCallback<_coinche_SurcoincheResponse__Output>): grpc.ClientUnaryCall;
  surcoinche(argument: _coinche_SurcoincheRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_SurcoincheResponse__Output>): grpc.ClientUnaryCall;
  surcoinche(argument: _coinche_SurcoincheRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_SurcoincheResponse__Output>): grpc.ClientUnaryCall;
  surcoinche(argument: _coinche_SurcoincheRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_SurcoincheResponse__Output>): grpc.ClientUnaryCall;
  surcoinche(argument: _coinche_SurcoincheRequest, callback: grpc.requestCallback<_coinche_SurcoincheResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface SurcoincheServiceHandlers extends grpc.UntypedServiceImplementation {
  Surcoinche: grpc.handleUnaryCall<_coinche_SurcoincheRequest__Output, _coinche_SurcoincheResponse>;
  
}

export interface SurcoincheServiceDefinition extends grpc.ServiceDefinition {
  Surcoinche: MethodDefinition<_coinche_SurcoincheRequest, _coinche_SurcoincheResponse, _coinche_SurcoincheRequest__Output, _coinche_SurcoincheResponse__Output>
}
