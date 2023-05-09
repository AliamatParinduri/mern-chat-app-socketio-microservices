/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/react'

import { SingleChat } from '../../components/'
import { ChatState } from '../../context/ChatProvider'

const ChatBox = ({ fetchAgain, setFetchAgain }: any) => {
  const { selectedChat }: any = ChatState()

  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: '100%', md: '68%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
