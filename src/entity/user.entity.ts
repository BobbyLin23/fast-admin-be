import { BaseModel } from './base.entity'

export interface User extends BaseModel {
  id: string
  name?: string
  email: string
  hashedPassword: string
}
