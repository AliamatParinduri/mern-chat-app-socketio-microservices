import { useState } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config'
import { ChatState, chatContextType } from '../context/ChatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react'

const ScrollableChat = ({ messages }: any) => {
  const [isGroupChat, setIsGroupChat] = useState(false)
  const { user }: chatContextType = ChatState()

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message: any, i: number) => (
          <div style={{ display: 'flex', alignItems: 'center' }} key={message['_id']}>
            {messages.length > 0 &&
              messages[0].chat.isGroupChat &&
              (isSameSender(messages, message, i, user.id) || isLastMessage(messages, i, user.id)) && (
                <Tooltip label={message.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr="1"
                    size="sm"
                    cursor="pointer"
                    name={message.sender.name}
                    src={message.sender.pic}
                  ></Avatar>
                </Tooltip>
              )}

            <span
              style={{
                background: `${message.sender.id === user.id ? '#BEE4F8' : '#B9F5D0'}`,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
                marginLeft: isSameSenderMargin(messages, message, i, user.id),
                marginTop: isSameUser(messages, message, i) ? 3 : 10
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
