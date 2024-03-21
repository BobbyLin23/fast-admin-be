import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { PrismaService } from 'src/common/services/prisma.service'
import { CreateUserDto } from './users.dto'
import { hashPassword } from 'src/utils/hash'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const { email, password } = data

    const hashedPassword = await hashPassword(password)

    return this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async userLogout() {
    return 'User has been logged out'
  }
}
