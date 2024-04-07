import { Test, TestingModule } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { prismaMock } from '../../../singleton'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'
import { PrismaService } from '../../common/services/prisma.service'

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService
  let prismaService: PrismaService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
    }).compile()

    authService = app.get<AuthService>(AuthService)
    authController = app.get<AuthController>(AuthController)
    prismaService = app.get<PrismaService>(PrismaService)
  })

  // Generate Unit Tests about AuthController.signUp
  it('signUp should return correct user data', async () => {
    const user = {
      id: 'aaa',
      email: '1232@qq.com',
      hashedPassword: '123456',
      name: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const data = {
      email: '1232@qq.com',
      password: '123456',
    }

    prismaMock.user.create.mockResolvedValue(user)

    const res = await authService.createUser(data)

    await expect(res).resolves.toEqual({
      id: 'aaa',
      email: '1232@qq.com',
      hashedPassword: '123456',
      name: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // const result = await authController.signUp(data)

    // expect(result).toMatchObject(user)
  })
})
