import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { LoginUserDto } from '../users/users.dto'
import { UsersService } from '../users/users.service'
import { comparePassword } from 'src/utils/hash'
import { CreateUserDto } from './auth.dto'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(data: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByEmail(data.email)

    const isCorrect = await comparePassword(data.password, user.hashedPassword)

    if (!isCorrect) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { email: user.email, sub: user.id }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(data.email)

    if (user) {
      throw new UnauthorizedException('User already exists')
    }

    return this.usersService.createUser(data)
  }
}
