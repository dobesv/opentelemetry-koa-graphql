// @flow strict
import opentelemetry from '@opentelemetry/api';

import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { LogLevel } from '@opentelemetry/core';

import { NodeTracerProvider } from '@opentelemetry/node';
import { ConsoleSpanExporter, BatchSpanProcessor, SimpleSpanProcessor } from '@opentelemetry/tracing';

const provider = new NodeTracerProvider({
  logLevel: LogLevel.WARN,
  // plugins: {
  //   dns: { enabled: false, path: '@opentelemetry/plugin-dns' },
  //   http: { enabled: false, path: '@opentelemetry/plugin-http' },
  //   https: { enabled: false, path: '@opentelemetry/plugin-https' },
  //   pg: { enabled: false, path: '@opentelemetry/plugin-pg' },
  //   'pg-pool': { enabled: false, path: '@opentelemetry/plugin-pg-pool' },
  //   grpc: { enabled: false, path: '@opentelemetry/plugin-grpc' },
  //   'grpc-js': { enabled: false, path: '@opentelemetry/plugin-grpc-js' },
  //   koa: {
  //     enabled: false,
  //     // You may use a package name or absolute path to the file.
  //     path: '@opentelemetry/koa-instrumentation',
  //   },
  // },
});


const graphQLInstrumentation = new GraphQLInstrumentation({
  // allowAttributes: true,
  // depth: 2,
  // mergeItems: true,
});

graphQLInstrumentation.setTracerProvider(provider);
graphQLInstrumentation.enable();

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
provider.register();

const tracer = opentelemetry.trace;

export default (): $FlowFixMe => {
  return tracer;
};
