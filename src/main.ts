import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CustomConfigService } from './customConfig/custom-config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(CustomConfigService);

  const config = new DocumentBuilder()
    .setTitle('BandaProj')
    .setDescription('The banda proj API description.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const appPort = configService.get<number>('APP_PORT');

  await app.listen(appPort);
}
bootstrap();
