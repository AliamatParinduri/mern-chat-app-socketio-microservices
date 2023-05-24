import { UnprocessableEntityError, comparePassword, generatePassword } from '../utils'
import { RegisterDTO, LoginDTO } from '../dto'
import { userRepository } from '../repository'

class AuthService {
  register = async (payload: RegisterDTO) => {
    const userExists = await userRepository.findOne({ email: payload.email })

    if (userExists.hits.hits.length > 0) {
      throw new UnprocessableEntityError('User already exists')
    }

    payload.password = await generatePassword(payload.password)
    return await userRepository.createUser(payload)
  }

  login = async (payload: LoginDTO) => {
    const userExists: any = await userRepository.findOne({ email: payload.email })
    const user = userExists.hits.hits

    if (user.length < 1) {
      throw new UnprocessableEntityError('incorrect email or password')
    }

    const compared = await comparePassword(payload.password, user[0]._source.password)
    if (!compared) {
      throw new UnprocessableEntityError('incorrect email or password')
    }

    return user[0]._source
  }
}

export const authService = new AuthService()
