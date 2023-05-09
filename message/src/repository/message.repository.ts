import { InternalServerError, logger } from '../utils'
import { sendMessageDTO } from '../dto'
import { Message } from '../models'

class MessageRepository {
  sendMessage = async (newMessage: sendMessageDTO) => {
    // try {
    //   let message = await Message.create(newMessage)

    //   message = await message.populate('sender', 'name pic')
    //   message = await message.populate('chat')
    //   const sendMsg = await User.populate(message, {
    //     path: 'chat.users',
    //     select: 'name pic email'
    //   })

    //   await Chat.findByIdAndUpdate(newMessage.chat, {
    //     latestMessage: sendMsg
    //   })

    //   return sendMsg
    // } catch (err: any) {
    //   logger.error('Error - send message ', err)
    //   throw new InternalServerError(err)
    // }
    return true
  }

  getMessages = async (chatId: string) => {
    try {
      return await Message.find({ chat: chatId }).populate('sender', 'name pic email').populate('chat')
    } catch (err: any) {
      logger.error('Error - get all messages ', err)
      throw new InternalServerError(err)
    }
  }
}

export const messageRepository = new MessageRepository()
