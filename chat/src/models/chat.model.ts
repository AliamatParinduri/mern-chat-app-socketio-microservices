import { Schema, model } from 'mongoose'

import { ChatDTO } from '../dto'

const ChatSchema = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Object, trim: true }],
    latestMessage: { type: Object, trim: true },
    groupAdmin: [{ type: Object, trim: true }]
  },
  { timestamps: true }
)

export const Chat = model<ChatDTO>('Chat', ChatSchema)
