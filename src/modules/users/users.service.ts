import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { PrismaService } from '../../common/services/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
