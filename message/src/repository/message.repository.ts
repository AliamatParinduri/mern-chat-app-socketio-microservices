/* eslint-disable array-callback-return */
import { InternalServerError, RPCRequest, logger, publishMessage } from '../utils'
import { sendMessageDTO } from '../dto'
import { Message } from '../models'
import { CHAT_BINDING_KEY, CHAT_RPC, USER_RPC } from '../../config'

class MessageRepository {
  sendMessage = async (channel: any, newMessage: sendMessageDTO) => {
    try {
      const message = await Message.create(newMessage)

      const user: any = await RPCRequest(channel, USER_RPC, {
        event: 'DETAIL_USERS',
        data: { users: [message.sender] }
      })

      message.sender = user[0]

      const chat: any = await RPCRequest(channel, CHAT_RPC, {
        event: 'GET_CHAT_BY_ID',
        data: { id: message.chat }
      })

      message.chat = chat

      const usersDetail: any = await RPCRequest(channel, USER_RPC, {
        event: 'DETAIL_USERS',
        data: { users: chat.users }
      })

      chat.users = []
      const adminDetail = [...chat.groupAdmin]
      chat.groupAdmin = []
      usersDetail.map((dt: any) => {
        if (adminDetail.includes(dt.id)) {
          chat.groupAdmin.push(dt)
        }
        chat.users.push(dt)
      })

      publishMessage(
        channel,
        CHAT_BINDING_KEY,
        JSON.stringify({ event: 'UPDATE_LAST_MESSAGE', data: { _id: chat._id, messageId: message._id } })
      )

      return message
    } catch (err: any) {
      logger.error('Error - send message ', err)
      throw new InternalServerError(err)
    }
  }

  getLastestMessageById = async (_id: string) => {
    try {
      return await Message.findOne({ _id })
    } catch (err: any) {
      logger.error('Error - get latest message by id ', err)
      throw new InternalServerError(err)
    }
  }

  getMessages = async (channel: any, chatId: string) => {
    try {
      const message = await Message.find({ chat: chatId })

      if (message.length > 0) {
        for (const m of message) {
          const user: any = await RPCRequest(channel, USER_RPC, {
            event: 'DETAIL_USERS',
            data: { users: [m.sender] }
          })
          m.sender = user[0]

          const chat: any = await RPCRequest(channel, CHAT_RPC, {
            event: 'GET_CHAT_BY_ID',
            data: { id: m.chat }
          })
          m.chat = chat
        }
      }

      return message
    } catch (err: any) {
      logger.error('Error - get all messages ', err)
      throw new InternalServerError(err)
    }
  }
}

export const messageRepository = new MessageRepository()
