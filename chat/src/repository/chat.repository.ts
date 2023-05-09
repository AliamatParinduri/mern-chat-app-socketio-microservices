import { InternalServerError, logger } from '../utils'
import { AddOrRemoveGroupChatDTO, RenameGroupChatDTO, UserDTO } from '../dto'
import { Chat } from '../models'

class ChatRepository {
  getChats = async (user: UserDTO) => {
    // try {
    //   return await Chat.find({ users: { $elemMatch: { $eq: user._id } } })
    //     .populate('users', '-password')
    //     .populate('groupAdmin', '-password')
    //     .populate('latestMessage')
    //     .sort({ updatedAt: -1 })
    //     .then(async (results) => {
    //       return await User.populate(results, {
    //         path: 'latestMessage.sender',
    //         select: 'name pic email'
    //       })
    //     })
    // } catch (err: any) {
    //   logger.error('Error - get chats ', err)
    //   throw new InternalServerError(err)
    // }
    return true
  }

  accessChat = async (user: UserDTO, userId: string) => {
    // try {
    //   const isChat = await Chat.find({
    //     isGroupChat: false,
    //     $and: [{ users: { $elemMatch: { $eq: user._id } } }, { users: { $elemMatch: { $eq: userId } } }]
    //   })
    //     .populate('users', '-password')
    //     .populate('latestMessage')

    //   const chat = await User.populate(isChat, {
    //     path: 'latestMessage.sender',
    //     select: 'name pic email'
    //   })

    //   if (chat.length > 0) {
    //     return chat[0]
    //   }

    //   // New Chat
    //   const chatData = {
    //     chatName: 'sender',
    //     isGroupChat: false,
    //     users: [user._id, userId]
    //   }

    //   const createdChat = await Chat.create(chatData)
    //   const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password')
    //   return fullChat
    // } catch (err: any) {
    //   logger.error('Error - access chat ', err)
    //   throw new InternalServerError(err)
    // }
    return true
  }

  createGroupChat = async (user: UserDTO, users: [UserDTO], name: string) => {
    try {
      return await Chat.create({
        chatName: name,
        users,
        isGroupChat: true,
        groupAdmin: user
      })
    } catch (err: any) {
      logger.error('Error - create group chat ', err)
      throw new InternalServerError(err)
    }
  }

  findGroupChat = async (_id: string) => {
    try {
      return await Chat.findOne({ _id })
    } catch (err: any) {
      logger.error('Error - find group chat ', err)
      throw new InternalServerError(err)
    }
  }

  renameGroupChat = async (body: RenameGroupChatDTO) => {
    try {
      return await Chat.findByIdAndUpdate(
        body.chatId,
        {
          chatName: body.chatName
        },
        { new: true }
      )
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
    } catch (err: any) {
      logger.error('Error - rename group chat ', err)
      throw new InternalServerError(err)
    }
  }

  addToGroupChat = async (body: AddOrRemoveGroupChatDTO) => {
    try {
      return await Chat.findByIdAndUpdate(
        body.chatId,
        {
          $push: { users: body.userId }
        },
        { new: true }
      )
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
    } catch (err: any) {
      logger.error('Error - add to group chat ', err)
      throw new InternalServerError(err)
    }
  }

  removeFromGroupChat = async (body: AddOrRemoveGroupChatDTO) => {
    try {
      return await Chat.findByIdAndUpdate(
        body.chatId,
        {
          $pull: { users: body.userId }
        },
        { new: true }
      )
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
    } catch (err: any) {
      logger.error('Error - remove from group chat ', err)
      throw new InternalServerError(err)
    }
  }
}

export const chatRepository = new ChatRepository()
