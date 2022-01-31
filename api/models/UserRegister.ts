import { User } from '@prisma/client'
import { db } from '../utils/db.server'
import PasswordEncryption from './PasswordEncryption'

class UserRegister {
  private static instance: UserRegister

  static getInstance(): UserRegister {
    if (!UserRegister.instance) {
      UserRegister.instance = new UserRegister()
    }
    return UserRegister.instance
  }

  public async register(user: User) {
    const passwordHash = PasswordEncryption.encrypt(user.password)
    const newUser = await db.user.create({
      data: { ...user, password: passwordHash },
    })
    return newUser
  }
}

export default UserRegister
