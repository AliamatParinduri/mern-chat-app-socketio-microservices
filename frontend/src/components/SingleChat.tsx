/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { ChatState, chatContextType } from '../context/ChatProvider'
import { ProfileModal, ScrollableChat, UpdateGroupChatModal } from '.'
import { BaseURL, ENDPOINT, getSender, getSenderFull } from '../config'
import axios from 'axios'
import io from 'socket.io-client'

let socket: any, selectedChatCompare: any

const SingleChat = ({ fetchAgain, setFetchAgain }: any) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const toast = useToast()
  const { user, selectedChat, setSelectedChat }: chatContextType = ChatState()

  const fetchMessages = async () => {
    if (!selectedChat) return

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`${BaseURL}/v1/message/${selectedChat._id}`, config)

      setMessages(data.data)
      setLoading(false)

      socket.emit('join chat', selectedChat._id)
    } catch (err: any) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Messages',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      return false
    }
  }

  useEffect(() => {
    fetchMessages()

    selectedChatCompare = selectedChat
  }, [selectedChat])

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', user)
    socket.on('connected', () => setSocketConnected(true))
    socket.on('typing', () => setIsTyping(true))
    socket.on('stop typing', () => setIsTyping(false))
  }, [])

  useEffect(() => {
    socket.on('message received', (newMessageReceived: any) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // disini kasih notifikasi
      } else {
        const newMesages: any = [...messages, newMessageReceived]
        setMessages(newMesages)
      }
    })
  })

  const sendMessage = async (e: any) => {
    socket.emit('stop typing', selectedChat._id)
    if (e.key === 'Enter' && newMessage) {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }

        const { data } = await axios.post(
          `${BaseURL}/v1/message`,
          {
            content: newMessage,
            chatId: selectedChat._id
          },
          config
        )

        const newMessages: any = [...messages, data.data]

        socket.emit('new message', data.data)
        setNewMessage('')
        setMessages(newMessages)
      } catch (err: any) {
        toast({
          title: 'Error Occured!',
          description: 'Failed to Send Message',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
        return false
      }
    }
  }

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value)

    if (!socketConnected) return false

    if (!typing) {
      setTyping(true)
      socket.emit('typing', selectedChat._id)
    }

    const lastTypingTime = new Date().getTime()
    const timerLength = 3000
    setTimeout(() => {
      const currentTime = new Date().getTime()
      const timeDiff = currentTime - lastTypingTime

      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id)
        setTyping(false)
      }
    }, timerLength)
  }

  return (
    <>
      {selectedChat ? (
        <React.Fragment>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb="3"
            px="2"
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<FaArrowLeft />}
              onClick={() => setSelectedChat()}
              aria-label=""
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner size="xl" w="20" h="20" alignSelf="center" margin="auto" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt="3">
              {isTyping ? <Spinner mt="3" /> : <> </>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </React.Fragment>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat
