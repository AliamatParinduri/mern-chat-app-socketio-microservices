import 'dotenv/config'

const images = 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'

export const PORT = process.env.PORT ?? 8000
export const DefaultPicture = process.env.DefaultPicture ?? images
export const DBUri = process.env.DBUri ?? 'your uri'
export const privateKey = process.env.privateKey ?? 'your key'
export const publicKey = process.env.publicKey ?? 'your key'

export const MSBROKER_URI = process.env.MSBROKER_URI ?? 'your uri'
export const EXCHANGE_NAME = 'CHAT-APP'
export const QUEUE_NAME = 'MESSAGE_QUEUE'
export const CHAT_RPC = 'CHAT_RPC'
export const MESSAGE_RPC = 'MESSAGE_RPC'
export const USER_RPC = 'USER_RPC'
export const CHAT_BINDING_KEY = 'CHAT_SERVICE'
