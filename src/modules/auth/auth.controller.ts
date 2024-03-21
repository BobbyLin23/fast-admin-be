import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { CreateUserDto, LoginUserDto } from '../users/users.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() data: LoginUserDto) {
    return this.authService.createToken(data)
  }

  @Post('sign-up')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.createUser(data)
  }
}
