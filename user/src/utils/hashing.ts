import bcrypt from 'bcrypt'

export const generatePassword = async function (password: string) {
  const salt = await bcrypt.genSalt()
  return await bcrypt.hash(password, salt)
}

export const comparePassword = async function (enteredPassword: string, userPassword: string) {
  return await bcrypt.compare(enteredPassword, userPassword)
}
