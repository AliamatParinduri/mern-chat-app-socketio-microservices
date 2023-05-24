/* eslint-disable no-unreachable */
import { Op } from 'sequelize'

import { RegisterDTO, UserDTO } from '../dto'
import { InternalServerError, client, logger } from '../utils'
import models from '../models'
import { USER_INDEX } from '../../config'

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
      const user = await models.User.create({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        pic: payload.pic
      })

      client.index({
        index: USER_INDEX,
        body: { ...user.dataValues }
      })

      return user
    } catch (err: any) {
      logger.error('Error - register users ', err)
      throw new InternalServerError(err)
    }
  }

  findOne = async (attr: any) => {
    try {
      return client.search({
        index: USER_INDEX,
        query: {
          match: {
            email: {
              query: attr.email,
              operator: 'AND'
            }
          }
        }
      })
    } catch (err: any) {
      throw new InternalServerError(err)
    }
  }

  findById = async (userId: string) => {
    try {
      // return await models.User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } })
      return client.search({
        index: USER_INDEX,
        query: {
          match: {
            id: {
              query: userId,
              operator: 'AND'
            }
          }
        }
      })
    } catch (err: any) {
      throw new InternalServerError(err)
    }
  }
}

export const userRepository = new UserRepository()
