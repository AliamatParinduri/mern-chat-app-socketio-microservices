/* eslint-disable prefer-regex-literals */
import Joi from 'joi'
import { Document } from 'mongoose'

export interface LoginDTO extends Document {
  email: string
  password: string
}

export interface RegisterDTO extends LoginDTO {
  name: string
  pic: string
}

export const LoginValidate = {
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(8).max(20).required()
}

export const LoginSchema = Joi.object(LoginValidate)

export const RegisterSchema = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z ]{3,75}$')).required(),
  ...LoginValidate,
  pic: Joi.string().uri()
})
