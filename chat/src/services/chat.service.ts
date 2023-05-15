import { chatRepository } from '../repository'
import { AddOrRemoveGroupChatDTO, RenameGroupChatDTO, UserDTO } from '../dto'
import { UnprocessableEntityError } from '../utils'

class ChatService {
  getChats = async (user: UserDTO, token: string) => {
    return await chatRepository.getChats(user, token)
  }

  getChatById = async (id: string) => {
    return await chatRepository.getChatById(id)
  }

  accessChat = async (user: UserDTO, userId: string, token: string) => {
    return await chatRepository.accessChat(user, userId, token)
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

  updateLastestMessage = async (id: string, messageId: string) => {
    const chat = await chatRepository.getChatById(id)
    return await chatRepository.updateLastestMessage(chat, messageId)
  }

  renameGroupChat = async (body: RenameGroupChatDTO, token: string) => {
    return await chatRepository.renameGroupChat(body, token)
  }

  addToGroupChat = async (body: AddOrRemoveGroupChatDTO, token: string) => {
    return await chatRepository.addToGroupChat(body, token)
  }

  removeFromGroupChat = async (body: AddOrRemoveGroupChatDTO, token: string) => {
    return await chatRepository.removeFromGroupChat(body, token)
  }
}

export const chatService = new ChatService()
