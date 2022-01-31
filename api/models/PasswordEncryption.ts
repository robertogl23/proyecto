import bcrypt from 'bcrypt'

class PasswordEncryption {
  static encrypt(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
  }
}
export default PasswordEncryption
