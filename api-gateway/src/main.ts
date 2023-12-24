import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter";
import { TimeoutInterceptor } from "./common/interceptor/timeout.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { filter } from "rxjs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  const options = new DocumentBuilder()
    .setTitle("ElServicio")
    .setDescription("Una aplicacion con Amor")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/api/docs", app, document,{
    swaggerOptions:{
    filter: true,
    },
  });
  await app.listen(process.env.PORT || 3000);

}
bootstrap();
