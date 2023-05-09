/* eslint-disable no-unreachable */
import { RegisterDTO, UserDTO } from '../dto'
import { User } from '../models'
import { InternalServerError, logger } from '../utils'

class UserRepository {
  getUsers = async (keyword: any, user: UserDTO) => {
    try {
      return await User.find(keyword).find({ _id: { $ne: user._id } })
    } catch (err: any) {
      logger.error('Error - get users ', err)
      throw new InternalServerError(err)
    }
  }

  createUser = async (payload: RegisterDTO) => {
    try {
      return await User.create({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        pic: payload.pic
      })
    } catch (err: any) {
      logger.error('Error - get users ', err)
      throw new InternalServerError(err)
    }
  }

  findOne = async (attr: object) => {
    try {
      return await User.findOne(attr)
    } catch (err: any) {
      throw new InternalServerError(err)
    }
  }
}

export const userRepository = new UserRepository()
