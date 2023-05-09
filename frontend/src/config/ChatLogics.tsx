export const getSender = (loggedUser: any, users: any) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name
}

export const getSenderFull = (loggedUser: any, users: any) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name
}

export const getSenderPicture = (loggedUser: any, users: any) => {
  return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic
}

export const isSameSender = (messages: any, message: any, i: number, userId: any) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== message.sender._id || messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  )
}

export const isLastMessage = (messages: any, i: number, userId: any) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  )
}

export const isSameSenderMargin = (messages: any, message: any, i: number, userId: any) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === message.sender._id &&
    messages[i].sender._id !== userId
  ) {
    return 33
  } else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== message.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  ) {
    return 0
  } else {
    return 'auto'
  }
}

export const isSameUser = (messages: any, message: any, i: number) => {
  return i > 0 && messages[i - 1].sender._id === message.sender._id
}
