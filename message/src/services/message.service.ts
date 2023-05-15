import { sendMessageDTO } from '../dto'
import { messageRepository } from '../repository'

class MessageService {
  sendMessage = async (newMessage: sendMessageDTO, token: string) => {
    return await messageRepository.sendMessage(newMessage, token)
  }

  getLastestMessageById = async (id: string) => {
    return await messageRepository.getLastestMessageById(id)
  }

  getMessages = async (chatId: string, token: string) => {
    return await messageRepository.getMessages(chatId, token)
  }
}

export const messageService = new MessageService()
