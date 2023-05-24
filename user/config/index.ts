import 'dotenv/config'

const images = 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'

export const PORT = process.env.PORT ?? 8000
export const DefaultPicture = process.env.DefaultPicture ?? images
export const ElasticUri = process.env.ElasticUri ?? 'your uri'
export const privateKey = process.env.privateKey ?? 'your key'
export const publicKey = process.env.publicKey ?? 'your key'

export const MSBROKER_URI = process.env.MSBROKER_URI ?? 'your uri'
export const EXCHANGE_NAME = 'CHAT-APP'
export const CHAT_QUEUE_NAME = 'CHAT_QUEUE'
export const USER_RPC = 'USER_RPC'
export const CHAT_BINDING_KEY = 'CHAT_SERVICE'
export const USER_INDEX = 'user'
