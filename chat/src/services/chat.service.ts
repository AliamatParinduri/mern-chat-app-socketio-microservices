import { chatRepository } from '../repository'
import { AddOrRemoveGroupChatDTO, RenameGroupChatDTO, UserDTO } from '../dto'
import { UnprocessableEntityError } from '../utils'

class ChatService {
  async SubscribeEvents(payload: any) {
    payload = JSON.parse(payload)

    const { event, data } = payload

    switch (event) {
      case 'UPDATE_LAST_MESSAGE':
        await this.updateLastestMessage(data)
        break
      default:
        break
    }
  }

  async serveRPCRequest(payload: any) {
    const { event, data } = payload

    switch (event) {
      case 'GET_CHAT_BY_ID':
        return this.getChatById(data.id)

      default:
        break
    }
  }

  getChats = async (channel: any, user: UserDTO) => {
    return await chatRepository.getChats(channel, user)
  }

  getChatById = async (id: string) => {
    return await chatRepository.getChatById(id)
  }

  accessChat = async (channel: any, user: UserDTO, userId: string) => {
    return await chatRepository.accessChat(channel, user, userId)
  }

  createGroupChat = async (userId: string, users: [string], name: string) => {
    const createGroupChat = await chatRepository.createGroupChat(userId, users, name)
    if (!createGroupChat) {
      throw new UnprocessableEntityError('Group chat failed to created')
    }

    const findGroupChat = await chatRepository.findGroupChat(createGroupChat._id)
    if (!findGroupChat) {
      throw new UnprocessableEntityError('Group chat does not exists')
    }
    return findGroupChat
  }

  updateLastestMessage = async (payload: { _id: string; messageId: string }) => {
    const chat = await chatRepository.getChatById(payload._id)
    return await chatRepository.updateLastestMessage(chat, payload.messageId)
  }

  renameGroupChat = async (channel: any, body: RenameGroupChatDTO) => {
    return await chatRepository.renameGroupChat(channel, body)
  }

  addToGroupChat = async (channel: any, body: AddOrRemoveGroupChatDTO) => {
    return await chatRepository.addToGroupChat(channel, body)
  }

  removeFromGroupChat = async (channel: any, body: AddOrRemoveGroupChatDTO) => {
    return await chatRepository.removeFromGroupChat(channel, body)
  }
}

export default ChatService
