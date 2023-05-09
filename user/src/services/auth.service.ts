import { UnprocessableEntityError, comparePassword } from '../utils'
import { RegisterDTO, LoginDTO } from '../dto'
import { userRepository } from '../repository'

class AuthService {
  register = async (payload: RegisterDTO) => {
    const userExists = await userRepository.findOne({ email: payload.email })
    if (userExists) {
      throw new UnprocessableEntityError('User already exists')
    }

    return await userRepository.createUser(payload)
  }

  login = async (payload: LoginDTO) => {
    const userExists = await userRepository.findOne({ email: payload.email })
    if (!userExists) {
      throw new UnprocessableEntityError('incorrect email or password')
    }

    const compared = await comparePassword(payload.password, userExists.password)
    if (!compared) {
      throw new UnprocessableEntityError('incorrect email or password')
    }

    return userExists
  }
}

export const authService = new AuthService()
