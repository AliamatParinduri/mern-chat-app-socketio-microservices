import { Schema, model } from 'mongoose'

import { MessageDTO } from '../dto'

const MessageSchema = new Schema(
  {
    sender: { type: Object, trim: true },
    content: { type: String },
    chat: { type: Object, trim: true }
  },
  { timestamps: true }
)

export const Message = model<MessageDTO>('Message', MessageSchema)
