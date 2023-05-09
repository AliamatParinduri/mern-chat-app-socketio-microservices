/* eslint-disable multiline-ternary */
import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
  Box,
  FormControl,
  Input,
  Spinner,
  IconButton
} from '@chakra-ui/react'
import { FaEye } from 'react-icons/fa'
import axios from 'axios'
import { UserBadgeItem, UserListItem } from '.'
import { BaseURL } from '../config'
import { ChatState, chatContextType } from '../context/ChatProvider'

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }: any) => {
  const [search, setSearch] = useState()
  const [searchResult, setSearchResult] = useState([])
  const [groupChatName, setGroupChatName] = useState('')
  const [loading, setLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, selectedChat, setSelectedChat }: chatContextType = ChatState()
  const toast = useToast()

  const handleAddUser = async (user1: any) => {
    if (selectedChat.users.find((user: any) => user._id === user1._id)) {
      return toast({
        title: 'User Already in group!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }

    if (selectedChat.groupAdmin._id === user._id) {
      return toast({
        title: 'Only admins can add someone!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.put(
        `${BaseURL}/v1/chat/add/group`,
        {
          chatId: selectedChat._id,
          userId: user1._id
        },
        config
      )

      setSelectedChat(data.data)
      setFetchAgain(!fetchAgain)
      setLoading(false)
      toast({
        title: 'Add User Successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (err: any) {
      toast({
        title: 'Only admins can add someone!',
        description: err.response.data.description,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const handleRemove = async (user1: any) => {
    if (selectedChat.groupAdmin[0]._id !== user._id && user1._id !== user._id) {
      return toast({
        title: 'Only admins can add someone!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.put(
        `${BaseURL}/v1/chat/remove/group`,
        {
          chatId: selectedChat._id,
          userId: user1._id
        },
        config
      )

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data.data)
      setFetchAgain(!fetchAgain)
      fetchMessages()
      setLoading(false)
    } catch (err: any) {
      toast({
        title: 'Error Occured!',
        description: err.response.data.description,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const handleRename = async () => {
    if (!groupChatName) return false
    try {
      setRenameLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.put(
        `${BaseURL}/v1/chat/rename/group`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName
        },
        config
      )

      setSelectedChat(data.data)
      setFetchAgain(!fetchAgain)
      setRenameLoading(false)
      toast({
        title: 'Rename Group Successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    } catch (err: any) {
      toast({
        title: 'Error Occured!',
        description: err.response.data.description,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      setRenameLoading(false)
    }

    setGroupChatName('')
  }

  const handleSearch = async (query: any) => {
    setSearch(query)
    if (!query) {
      return false
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`${BaseURL}/v1/users?search=${search}`, config)
      setLoading(false)
      setSearchResult(data.data)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      })
      setLoading(false)
    }
  }

  return (
    <>
      <IconButton display={{ base: 'flex' }} icon={<FaEye />} aria-label="View Icon" onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" fontFamily="Work sans" display="flex" justifyContent="center">
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap="wrap" pb="3">
              {selectedChat.users.map((user: any) => (
                <UserBadgeItem key={user._id} user={user} handleFunction={() => handleRemove(user)} />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb="3"
                value={groupChatName}
                onChange={(e: any) => setGroupChatName(e.target.value)}
              />
              <Button variant="solid" colorScheme="teal" ml="1" isLoading={renameLoading} onClick={handleRename}>
                Update
              </Button>
            </FormControl>
            <FormControl display="flex">
              <Input placeholder="Add User to group" mb="1" onChange={(e) => handleSearch(e.target.value)} />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult.map((user: { _id: string }) => (
                <UserListItem key={user._id} user={user} handleFunction={() => handleAddUser(user)} />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
