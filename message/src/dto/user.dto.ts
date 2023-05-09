import Joi from 'joi'
import { Document } from 'mongoose'

export interface UserDTO extends Document {
  name: string
  email: string
  password: string
  pic: string
}

export const UserValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(8).max(20).required(),
  pic: Joi.string().required()
})
