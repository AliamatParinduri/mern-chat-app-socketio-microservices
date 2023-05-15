/* eslint-disable array-callback-return */
/* eslint-disable no-unreachable */
import { InternalServerError, logger } from '../utils'
import { AddOrRemoveGroupChatDTO, RenameGroupChatDTO, UserDTO } from '../dto'
import { Chat } from '../models'
import axios from 'axios'

class ChatRepository {
  getChats = async (user: UserDTO, token: string) => {
    try {
      const chat: any = await Chat.find({ users: { $elemMatch: { $eq: user._id } } })
        // .populate('users', '-password')
        // .populate('groupAdmin', '-password')
        // .populate('latestMessage')
        .sort({ updatedAt: -1 })

      if (chat.length > 0) {
        for (const c of chat) {
          const { data } = await axios.get(
            `http://localhost:5000/api/v1/users/${JSON.stringify(c.users)}/detail-with-userlogin`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          c.users = []
          const adminDetail = [...c.groupAdmin]
          c.groupAdmin = []
          data.map((dt: any) => {
            if (adminDetail.includes(dt.id)) {
              c.groupAdmin.push(dt)
            }

            c.users.push(dt)
          })

          if (c.latestMessage) {
            const latestMessage = await axios.get(
              `http://localhost:5002/api/v1/message/${c.latestMessage._id}/latest-message`,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )

            console.log(latestMessage)

            c.latestMessage = latestMessage.data.data
          }
        }
      }

      return chat
    } catch (err: any) {
      logger.error('Error - get chats ', err)
      throw new InternalServerError(err)
    }
  }

  getChatById = async (_id: string) => {
    try {
      return await Chat.findOne({ _id })
    } catch (err: any) {
      logger.error('Error - get chat by id ', err)
      throw new InternalServerError(err)
    }
  }

  accessChat = async (user: UserDTO, userId: string, token: string) => {
    try {
      const chat: any = await Chat.find({
        isGroupChat: false,
        $and: [{ users: { $elemMatch: { $eq: user._id } } }, { users: { $elemMatch: { $eq: userId } } }]
      }).populate('latestMessage', 'name pic email')

      if (chat.length > 0) {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/users/${JSON.stringify(chat[0].users)}/detail-with-userlogin`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        chat[0].users = []
        data.map((dt: any) => {
          chat[0].users.push(dt)
        })

        if (chat[0].latestMessage) {
          const latestMessage = await axios.get(
            `http://localhost:5002/api/v1/message/${chat[0].latestMessage._id}/latest-message`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          chat[0].latestMessage = latestMessage.data.data
        }

        return chat[0]
      }

      // New Chat
      const chatData = {
        chatName: 'sender',
        isGroupChat: false,
        users: [user._id, userId]
      }

      const createdChat = await Chat.create(chatData)
      const fullChat: any = await Chat.findOne({ _id: createdChat._id })

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/users/${JSON.stringify(chatData.users)}/detail-with-userlogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      fullChat.users = []
      data.map((dt: any) => {
        fullChat.users.push(dt)
      })

      return fullChat
    } catch (err: any) {
      logger.error('Error - access chat ', err)
      throw new InternalServerError(err)
    }
  }

  createGroupChat = async (userId: string, users: [string], name: string) => {
    try {
      return await Chat.create({
        chatName: name,
        users,
        isGroupChat: true,
        groupAdmin: userId
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

  updateLastestMessage = async (chat: any, messageId: string) => {
    try {
      await chat.set({ latestMessage: { _id: messageId } })
      await chat.save()
    } catch (err: any) {
      logger.error('Error - update last message ', err)
      throw new InternalServerError(err)
    }
  }

  renameGroupChat = async (body: RenameGroupChatDTO, token: string) => {
    try {
      const chat: any = await Chat.findByIdAndUpdate(
        body.chatId,
        {
          chatName: body.chatName
        },
        { new: true }
      )
      // .populate('users', '-password')
      // .populate('groupAdmin', '-password')

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/users/${JSON.stringify(chat!.users)}/detail-with-userlogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      chat.users = []
      const adminDetail = [...chat.groupAdmin]
      chat.groupAdmin = []
      data.map((dt: any) => {
        if (adminDetail.includes(dt.id)) {
          chat.groupAdmin.push(dt)
        }

        chat.users.push(dt)
      })

      return chat
    } catch (err: any) {
      logger.error('Error - rename group chat ', err)
      throw new InternalServerError(err)
    }
  }

  addToGroupChat = async (body: AddOrRemoveGroupChatDTO, token: string) => {
    try {
      const chat: any = await Chat.findByIdAndUpdate(
        body.chatId,
        {
          $push: { users: body.userId }
        },
        { new: true }
      )
      // .populate('users', '-password')
      // .populate('groupAdmin', '-password')

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/users/${JSON.stringify(chat!.users)}/detail-with-userlogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      chat.users = []
      const adminDetail = [...chat.groupAdmin]
      chat.groupAdmin = []
      data.map((dt: any) => {
        if (adminDetail.includes(dt.id)) {
          chat.groupAdmin.push(dt)
        }

        chat.users.push(dt)
      })

      return chat
    } catch (err: any) {
      logger.error('Error - add to group chat ', err)
      throw new InternalServerError(err)
    }
  }

  removeFromGroupChat = async (body: AddOrRemoveGroupChatDTO, token: string) => {
    try {
      const chat: any = await Chat.findByIdAndUpdate(
        body.chatId,
        {
          $pull: { users: body.userId }
        },
        { new: true }
      )
      // .populate('users', '-password')
      // .populate('groupAdmin', '-password')

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/users/${JSON.stringify(chat!.users)}/detail-with-userlogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      chat.users = []
      const adminDetail = [...chat.groupAdmin]
      chat.groupAdmin = []
      data.map((dt: any) => {
        if (adminDetail.includes(dt.id)) {
          chat.groupAdmin.push(dt)
        }

        chat.users.push(dt)
      })

      return chat
    } catch (err: any) {
      logger.error('Error - remove from group chat ', err)
      throw new InternalServerError(err)
    }
  }
}

export const chatRepository = new ChatRepository()
