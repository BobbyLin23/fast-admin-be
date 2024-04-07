import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception.getStatus() || 404

    const message = exception.message || 'Resource not found'
    const error = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    }
    response.status(status).json(error)
  }
}
