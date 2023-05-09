import { sendMessageDTO } from '../dto'
import { messageRepository } from '../repository'

class MessageService {
  sendMessage = async (newMessage: sendMessageDTO) => {
    return await messageRepository.sendMessage(newMessage)
  }

  getMessages = async (chatId: string) => {
    return await messageRepository.getMessages(chatId)
  }
}

export const messageService = new MessageService()
