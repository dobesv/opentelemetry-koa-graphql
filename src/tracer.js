import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/tracing";
import { lightstep } from "lightstep-opentelemetry-launcher-node";

export let startPromise = null;

export const start = async () => {
  console.log("start");

  const serviceName = process.env.LS_SERVICE_NAME || "test";
  const serviceVersion = process.env.APP_VERSION || "test";
  const collectorTraceExporter = new ConsoleSpanExporter();
  collectorTraceExporter._exportInfo = (span) => ({
    traceId: span.spanContext.traceId,
    parentId: span.parentSpanId,
    name: span.name,
    id: span.spanContext.spanId,
  });
  const spanProcessor = new SimpleSpanProcessor(collectorTraceExporter);
  new GraphQLInstrumentation({
    enabled: true,
    mergeItems: true,
  });
  startPromise = lightstep
    .configureOpenTelemetry({
      autoDetectResources: false,
      plugins: {
        koa: {
          enabled: false,
          path: "@opentelemetry/koa-instrumentation",
        },
      },
      serviceName,
      serviceVersion,
      spanEndpoint: "https://localhost:9999/api/v2/otel/trace",
      spanProcessor,
    })
    .start();
  //console.log('calling graphQLInstrumentation.enable()');
  //
  //
  // graphQLInstrumentation.enable();
  //console.log('called graphQLInstrumentation.enable()');

  await startPromise;

  console.log("started");
};
