import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
const OTEL_EXPORTER_URL = "http://localhost:4318/v1/traces";



const exporter = new OTLPTraceExporter({
	url: OTEL_EXPORTER_URL,
	headers: {
		"Content-Type": "application/json",
	},
	concurrencyLimit: 10,
});

const provider = new NodeTracerProvider({
	resource: new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: 'recommendations-service',
	}),
	spanProcessors: [new SimpleSpanProcessor(exporter)],
});

provider.register();

export function setupOpenTelemetry() {
	const sdk = new NodeSDK({
		traceExporter: exporter,
		instrumentations: [
			new HttpInstrumentation(),
			new ExpressInstrumentation(),
			getNodeAutoInstrumentations(),
		],
		serviceName: 'recommendations-service'
	});

	sdk.start();
	console.log("OpenTelemetry est configuré pour l'export vers Datadog");
}
