import bcrypt from 'bcrypt'

export const comparePassword = async function (enteredPassword: string, userPassword: string) {
  return await bcrypt.compare(enteredPassword, userPassword)
}
