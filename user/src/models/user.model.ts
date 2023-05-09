import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { DefaultPicture } from '../../config'
import { UserDTO } from '../dto'

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { type: String, default: DefaultPicture, required: true }
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified) {
    next()
  }

  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
})

export const User = model<UserDTO>('User', UserSchema)
