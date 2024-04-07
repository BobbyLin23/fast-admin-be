import { Controller, Get, Param } from '@nestjs/common'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email)
  }
}
