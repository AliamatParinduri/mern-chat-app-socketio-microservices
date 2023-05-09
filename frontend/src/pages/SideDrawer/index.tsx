/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { FaBell, FaChevronDown } from 'react-icons/fa'

import { ProfileModal, ChatLoading, UserListItem } from '../../components'
import { BaseURL } from '../../config'
import { ChatState, chatContextType } from '../../context/ChatProvider'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)

  const { user, chats, setChats, setSelectedChat }: chatContextType = ChatState()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
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
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      return false
    }
  }

  const accessChat = async (userId: any) => {
    try {
      setLoadingChat(true)

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.post(`${BaseURL}/v1/chat`, { userId }, config)

      if (!chats.find((c: any) => c._id === data._id)) setChats([data.data, ...chats])
      setSelectedChat(data!.data)
      setLoadingChat(false)
      onClose()
    } catch (err: any) {
      toast({
        title: 'Error fetching the chat!',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      return false
    }
  }

  return (
    <React.Fragment>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        bg={'white'}
        w={'100%'}
        padding={'5px 10px'}
        borderWidth={'5px'}
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant={'ghost'} onClick={onOpen}>
            <i className="fas fa-search"> </i>
            <Text display={{ base: 'none', md: 'flex' }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize={'2xl'} fontFamily={'Work sans'}>
          My Chat App
        </Text>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Menu>
            <MenuButton p="1">
              <FaBell fontSize="20px" style={{ margin: '7px' }} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />}>
              <Avatar size="sm" cursor="pointer" name={user.name} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottom="1px">Search User</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb="2">
              <Input
                placeholder="Search by name or email"
                mr="2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((user: { _id: string }) => (
                <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  )
}

export default SideDrawer
