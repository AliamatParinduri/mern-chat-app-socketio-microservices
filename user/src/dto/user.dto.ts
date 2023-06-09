import Joi from 'joi'

import { LoginValidate } from './auth.dto'

export interface UserDTO {
  _id?: string
  name: string
  email: string
  password: string
  pic: string
}

export const UserValidate = Joi.object({
  ...LoginValidate,
  name: Joi.string().required(),
  pic: Joi.string().required()
})
