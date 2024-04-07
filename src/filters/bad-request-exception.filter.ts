import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception.getStatus() || 400

    const message = exception.message || '参数错误'
    const error = {
      status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    }
    response.status(status).json(error)
  }
}
