/* eslint-disable no-unreachable */
import { Op } from 'sequelize'

import { RegisterDTO, UserDTO } from '../dto'
import { InternalServerError, logger } from '../utils'
import models from '../models'

class UserRepository {
  getUsers = async (keyword: any, user: UserDTO) => {
    try {
      return await models.User.findAll({
        where: {
          ...keyword,
          id: { [Op.ne]: user._id }
        }
      })
    } catch (err: any) {
      logger.error('Error - get users ', err)
      throw new InternalServerError(err)
    }
  }

  createUser = async (payload: RegisterDTO) => {
    try {
      return await models.User.create({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        pic: payload.pic
      })
    } catch (err: any) {
      logger.error('Error - register users ', err)
      throw new InternalServerError(err)
    }
  }

  findOne = async (attr: object) => {
    try {
      return await models.User.findOne({ where: attr })
    } catch (err: any) {
      throw new InternalServerError(err)
    }
  }

  findById = async (userId: string) => {
    try {
      return await models.User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } })
    } catch (err: any) {
      throw new InternalServerError(err)
    }
  }
}

export const userRepository = new UserRepository()
