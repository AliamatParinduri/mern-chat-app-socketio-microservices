/* eslint-disable multiline-ternary */
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { ChatState, chatContextType } from '../context/ChatProvider'
import axios from 'axios'
import { BaseURL } from '../config'
import { UserListItem, UserBadgeItem } from '.'

const GroupChatModal = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [groupChatName, setGroupChatName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  const { user, chats, setChats }: chatContextType = ChatState()

  const handleSearch = async (payload: string) => {
    setSearch(payload)
    if (!payload) {
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
    } catch (err: any) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: 'Please fill all the fields!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      return false
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.post(
        `${BaseURL}/v1/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user: { _id: string }) => user._id))
        },
        config
      )

      data.data.groupAdmin = [user]
      data.data.users = [user, ...selectedUsers.map((user: { _id: string }) => user)]

      setChats([data.data, ...chats])
      onClose()
      toast({
        title: 'New Group chat Created!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      return false
    } catch (err: any) {
      toast({
        title: 'Failed to create chat group!',
        description: err.response.data.description,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      return false
    }
  }

  const handleGroup = (userToAdd: never) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: 'user already added',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      return false
    }

    const newSelectedUsers: any = [...selectedUsers, userToAdd]

    setSelectedUsers(newSelectedUsers)
  }

  const handleDelete = (delUser: any) => {
    setSelectedUsers(selectedUsers.filter((user: { _id: string }) => user._id !== delUser._id))
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2rem" fontFamily="Work sans" display="flex" justifyContent="center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input placeholder="Chat Name" mb="3" onChange={(e) => setGroupChatName(e.target.value)} />
            </FormControl>
            <FormControl>
              <Input placeholder="Add Users" mb="1" onChange={(e) => handleSearch(e.target.value)} />
            </FormControl>

            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((user: { _id: string }) => (
                <UserBadgeItem key={user._id} user={user} handleFunction={() => handleDelete(user)} />
              ))}
            </Box>

            {loading ? (
              <Spinner size="lg" marginTop="5px" />
            ) : (
              searchResult
                .slice(0, 4)
                .map((user: { _id: string }) => (
                  <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user as never)} />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal
