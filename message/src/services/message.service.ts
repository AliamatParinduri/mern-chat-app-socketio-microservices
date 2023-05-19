import { sendMessageDTO } from '../dto'
import { messageRepository } from '../repository'

class MessageService {
  async serveRPCRequest(payload: any) {
    const { event, data } = payload

    switch (event) {
      case 'DETAIL_LATEST_MESSAGE':
        return this.getLastestMessageById(data.id)

      default:
        break
    }
  }

  sendMessage = async (channel: any, newMessage: sendMessageDTO) => {
    return await messageRepository.sendMessage(channel, newMessage)
  }

  getLastestMessageById = async (id: string) => {
    return await messageRepository.getLastestMessageById(id)
  }

  getMessages = async (channel: any, chatId: string) => {
    return await messageRepository.getMessages(channel, chatId)
  }
}

export default MessageService
