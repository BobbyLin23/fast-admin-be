import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

import { LoginUserDto } from './auth.dto'
import { comparePassword } from '../../utils/hash'
import { CreateUserDto } from './auth.dto'
import { PrismaService } from '../../common/services/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createToken(data: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

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
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    })

    if (user) {
      throw new UnauthorizedException('User already exists')
    }

    return await this.prismaService.user.create({
      data: {
        email: data.email,
        hashedPassword: data.password,
      },
    })
  }
}
