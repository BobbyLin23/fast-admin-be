import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { CreateUserDto, LoginUserDto } from './auth.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'User sign in' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'success' })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() data: LoginUserDto) {
    return this.authService.createToken(data)
  }

  @ApiOperation({ description: 'User sign up' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'success' })
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.createUser(data)
  }
}
