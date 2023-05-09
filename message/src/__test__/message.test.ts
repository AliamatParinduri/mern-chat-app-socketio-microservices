import request from 'supertest'

import app from '../app'
import {
  cleanData,
  connect,
  createChatGroup,
  disconnect,
  loginPayload,
  loginUser,
  registerUser,
  user2Payload,
  groupPayload,
  userPayload
} from './mongodb.memory'

beforeAll(connect)
beforeEach(cleanData)
afterAll(disconnect)

describe('Message', () => {
  it('initial setup', () => {
    expect(true).toEqual(true)
  })

  // describe('send message', () => {
  //   it('should return a 401 because not send access token', async () => {
  //     const { statusCode } = await request(app).post('/api/v1/message')

  //     expect(statusCode).toEqual(401)
  //     expect(true).toEqual(true)
  //   })

  //   it('should return a 200', async () => {
  //     await registerUser(userPayload)
  //     const registered = await registerUser(user2Payload)
  //     const logged = await loginUser(loginPayload)

  //     const Payload = groupPayload(registered.body.data._id)
  //     const chat = await createChatGroup(logged.body.token, Payload)

  //     const messagePayload = {
  //       content: 'chat 1',
  //       chatId: chat.body.data._id
  //     }

  //     const { body, statusCode } = await request(app)
  //       .post('/api/v1/message/')
  //       .set('Authorization', `Bearer ${logged.body.token}`)
  //       .send(messagePayload)

  //     expect(statusCode).toEqual(200)
  //     expect(body.data).toBeDefined()
  //     expect(body.data.chat._id).toEqual(messagePayload.chatId)
  //     expect(body.data.content).toEqual(messagePayload.content)
  //   })
  // })

  // describe('get messages', () => {
  //   it('should return a 401 because not send access token', async () => {
  //     const { statusCode } = await request(app).post('/api/v1/message')

  //     expect(statusCode).toEqual(401)
  //   })

  //   it('should return a 200', async () => {
  //     await registerUser(userPayload)
  //     const registered = await registerUser(user2Payload)
  //     const logged = await loginUser(loginPayload)

  //     const Payload = groupPayload(registered.body.data._id)
  //     const chat = await createChatGroup(logged.body.token, Payload)

  //     const { body, statusCode } = await request(app)
  //       .get(`/api/v1/message/${chat.body.data._id}`)
  //       .set('Authorization', `Bearer ${logged.body.token}`)

  //     expect(statusCode).toEqual(200)
  //     expect(body.data).toBeDefined()
  //   })
  // })
})
