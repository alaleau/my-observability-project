import { NestFactory } from '@nestjs/core';
import { WinstonModule} from "nest-winston";

import * as winston from 'winston';
import {AppModule} from "./app/app.module";
import {LoggingInterceptor} from "./app/interceptors/logging.interceptor";
import {setupOpenTelemetry} from "./app/otel";
import {context, trace} from "@opentelemetry/api";

const customFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format((info) => {
      const span = trace.getSpan(context.active());
      if (span) {
        const spanContext = span.spanContext();
        info.trace_id = spanContext.traceId;
        info.span_id = spanContext.spanId;
      }
      info.service = 'stock-services';
      return info;
    })()
);


async function bootstrap() {
  setupOpenTelemetry();

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      format: customFormat,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/app.log',
          format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
          ),
        }),
      ],
    }),
  });

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.setGlobalPrefix("/api")

  await app.listen(3001);
}
bootstrap();