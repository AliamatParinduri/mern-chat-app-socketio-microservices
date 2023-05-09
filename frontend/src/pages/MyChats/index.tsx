/* eslint-disable react/jsx-key */
/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'
import { ChatState, chatContextType } from '../../context/ChatProvider'
import { Avatar, Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa'
import { getSender, getSenderPicture } from '../../config/ChatLogics'
import { ChatLoading, GroupChatModal } from '../../components'
import { BaseURL } from '../../config'

const MyChats = ({ fetchAgain }: any) => {
  const [loggedUser, setLoggedUser] = useState()
  const { user, selectedChat, setSelectedChat, chats, setChats }: chatContextType = ChatState()

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(`${BaseURL}/v1/chat`, config)

      setChats(data.data)
    } catch (err: any) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      return false
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')!))
    fetchChats()
  }, [fetchAgain])

  const toast = useToast()

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir="column"
      alignItems="center"
      padding="3"
      bg="white"
      w={{ base: '100%', md: '31%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb="3"
        px="3"
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent={'space-between'}
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button display="flex" fontSize={{ base: '17px', md: '10px', lg: '17px' }} rightIcon={<FaPlus />}>
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box display="flex" flexDir="column" p={3} bg="#F8F8F8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
        {chats ? (
          <Stack>
            {chats.map((chat: any) => {
              const picture = getSenderPicture(loggedUser!['data'], chat.users)

              return (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
                  color={selectedChat === chat ? '#fff' : '#000'}
                  px="3"
                  display="flex"
                  alignItems="center"
                  py="2"
                  w="100%"
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Avatar
                    ml="1"
                    mr="3"
                    size="sm"
                    cursor="pointer"
                    src={!chat.isGroupChat ? picture : chat.pic}
                  ></Avatar>
                  <div>
                    <Text fontWeight="bold">
                      {!chat.isGroupChat ? getSender(loggedUser!['data'], chat.users) : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text fontSize="xs">
                        {!chat.isGroupChat ? <b>{chat.latestMessage.sender.name} : </b> : null}
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + '...'
                          : chat.latestMessage.content}
                      </Text>
                    )}
                  </div>
                </Box>
              )
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  )
}

export default MyChats
