import { Schema, model } from 'mongoose'

import { MessageDTO } from '../dto'

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: { type: String },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    }
  },
  { timestamps: true }
)

export const Message = model<MessageDTO>('Message', MessageSchema)
