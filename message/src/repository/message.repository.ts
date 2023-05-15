/* eslint-disable array-callback-return */
import { InternalServerError, logger } from '../utils'
import { sendMessageDTO } from '../dto'
import { Message } from '../models'
import axios from 'axios'

class MessageRepository {
  sendMessage = async (newMessage: sendMessageDTO, token: string) => {
    try {
      const message = await Message.create(newMessage)

      const user = await axios.get(
        `http://localhost:5000/api/v1/users/${JSON.stringify([message.sender])}/detail-with-userlogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      message.sender = user.data[0]

      const chat = await axios.get(`http://localhost:5001/api/v1/chat/${message.chat}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      message.chat = chat.data.data

      const usersDetail = await axios.get(
        `http://localhost:5000/api/v1/users/${JSON.stringify(chat.data.data.users)}/detail-with-userlogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      chat.data.data.users = []
      usersDetail.data.map((dt: any) => {
        chat.data.data.users.push(dt)
      })

      await axios.put(
        `http://localhost:5001/api/v1/chat/${chat.data.data._id}/latest-message`,
        { messageId: message._id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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

  getMessages = async (chatId: string, token: string) => {
    try {
      const message = await Message.find({ chat: chatId })

      if (message.length > 0) {
        for (const m of message) {
          const user = await axios.get(
            `http://localhost:5000/api/v1/users/${JSON.stringify([m.sender])}/detail-with-userlogin`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          m.sender = user.data[0]

          const chat = await axios.get(`http://localhost:5001/api/v1/chat/${m.chat}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          m.chat = chat.data.data
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
