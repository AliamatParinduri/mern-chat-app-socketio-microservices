import { chatRepository } from '../repository'
import { AddOrRemoveGroupChatDTO, RenameGroupChatDTO, UserDTO } from '../dto'
import { UnprocessableEntityError } from '../utils'

class ChatService {
  getChats = async (user: UserDTO) => {
    return await chatRepository.getChats(user)
  }

  accessChat = async (user: UserDTO, userId: string) => {
    return await chatRepository.accessChat(user, userId)
  }

  createGroupChat = async (user: UserDTO, users: [UserDTO], name: string) => {
    const createGroupChat = await chatRepository.createGroupChat(user, users, name)
    if (!createGroupChat) {
      throw new UnprocessableEntityError('Group chat failed to created')
    }

    const findGroupChat = await chatRepository.findGroupChat(createGroupChat._id)
    if (!findGroupChat) {
      throw new UnprocessableEntityError('Group chat does not exists')
    }
    return findGroupChat
  }

  renameGroupChat = async (body: RenameGroupChatDTO) => {
    return await chatRepository.renameGroupChat(body)
  }

  addToGroupChat = async (body: AddOrRemoveGroupChatDTO) => {
    return await chatRepository.addToGroupChat(body)
  }

  removeFromGroupChat = async (body: AddOrRemoveGroupChatDTO) => {
    return await chatRepository.removeFromGroupChat(body)
  }
}

export const chatService = new ChatService()
