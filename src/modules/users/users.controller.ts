import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto, LoginUserDto } from './users.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email)
  }
}
