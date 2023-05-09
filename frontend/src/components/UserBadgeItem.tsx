import { FaTimes } from 'react-icons/fa'
import { Badge } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({ user, handleFunction }: any) => {
  return (
    <Badge
      px="2"
      py="1"
      borderRadius="lg"
      m="1"
      mb="2"
      variant="solid"
      fontSize="12"
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {user.name}
      {/* {admin === user._id && <span> (Admin)</span>} */}
      <FaTimes style={{ marginLeft: '.2rem' }} />
    </Badge>
  )
}

export default UserBadgeItem
