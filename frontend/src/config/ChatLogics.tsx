export const getSender = (loggedUser: any, users: any) => {
  return users[0].id === loggedUser.id ? users[1].name : users[0].name
}

export const getSenderFull = (loggedUser: any, users: any) => {
  return users[0].id === loggedUser.id ? users[1] : users[0]
}

export const getSenderPicture = (loggedUser: any, users: any) => {
  if (users.length <= 1) {
    return users[0].pic
  }

  return users[0].id === loggedUser.id ? users[1].pic : users[0].pic
}

export const isSameSender = (messages: any, message: any, i: number, userId: any) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender.id !== message.sender.id || messages[i + 1].sender.id === undefined) &&
    messages[i].sender.id !== userId
  )
}

export const isLastMessage = (messages: any, i: number, userId: any) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender.id !== userId &&
    messages[messages.length - 1].sender.id
  )
}

export const isSameSenderMargin = (messages: any, message: any, i: number, userId: any) => {
  if (i < messages.length - 1 && messages[i + 1].sender.id === message.sender.id && messages[i].sender.id !== userId) {
    return 33
  } else if (
    (i < messages.length - 1 && messages[i + 1].sender.id !== message.sender.id && messages[i].sender.id !== userId) ||
    (i === messages.length - 1 && messages[i].sender.id !== userId)
  ) {
    return 0
  } else {
    return 'auto'
  }
}

export const isSameUser = (messages: any, message: any, i: number) => {
  return i > 0 && messages[i - 1].sender.id === message.sender.id
}
