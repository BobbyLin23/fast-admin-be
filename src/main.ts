import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from 'src/app.module'
import { ResponseInterceptor } from 'src/interceptor/response.interceptor'
import { NotFoundExceptionFilter } from 'src/filters/not-found-exception.filter'
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exception.filter'
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new NotFoundExceptionFilter())
  app.useGlobalFilters(new BadRequestExceptionFilter())
  app.useGlobalFilters(new UnauthorizedExceptionFilter())

  app.useGlobalInterceptors(new ResponseInterceptor())

  // Add Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Fast Admin API Document')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3007)
}
bootstrap()
