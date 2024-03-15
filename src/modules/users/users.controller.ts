import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() data: { email: string; name?: string }) {
    return this.userService.createUser(data)
  }

  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email)
  }
}
