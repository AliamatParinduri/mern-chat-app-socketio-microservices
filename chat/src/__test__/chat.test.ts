import request from 'supertest'

import app from '../app'
import {
  cleanData,
  connect,
  disconnect,
  loginPayload,
  loginUser,
  registerUser,
  user2Payload,
  userPayload,
  groupPayload,
  createChatGroup
} from './mongodb.memory'

// beforeAll(connect)
// beforeEach(cleanData)
// afterAll(disconnect)

const user3Payload = {
  name: 'Bambang',
  email: 'bambang.doe@example.com',
  password: 'bambang123',
  pic: 'https://example.com/tets.jpeg'
}

describe('Chat', () => {
  it('initial setup', () => {
    expect(true).toEqual(true)
  })

  // describe('get chat route', () => {
  //   it('should return a 401 because not send access token', async () => {
  //     const { statusCode } = await request(app).get('/api/v1/chat')
  //     expect(statusCode).toEqual(401)
  //   })
  //   it('should return a 200 and the chats', async () => {
  //     await registerUser(userPayload)
  //     const logged = await loginUser(loginPayload)
  //     const { body, statusCode } = await request(app)
  //       .get('/api/v1/chat')
  //       .set('Authorization', `Bearer ${logged.body.token}`)
  //     expect(statusCode).toEqual(200)
  //     expect(body.data).toBeDefined()
  //   })
  // })

  // describe('access chat', () => {
  //   it('should return a 401 because not send access token', async () => {
  //     const { statusCode } = await request(app).post('/api/v1/chat')
  //     expect(statusCode).toEqual(401)
  //   })
  //   it('should return a 200 and access chats', async () => {
  //     await registerUser(userPayload)
  //     const registered = await registerUser(user2Payload)
  //     const logged = await loginUser(loginPayload)
  //     const { body, statusCode } = await request(app)
  //       .post('/api/v1/chat')
  //       .set('Authorization', `Bearer ${logged.body.token}`)
  //       .send({
  //         userId: registered.body.data._id
  //       })
  //     expect(statusCode).toEqual(200)
  //     expect(body.data).toBeDefined()
  //   })
  // })

  // describe('group chat', () => {
  //   it('should return a 401 because not send access token', async () => {
  //     const { statusCode } = await request(app).post('/api/v1/chat/group')
  //     expect(statusCode).toEqual(401)
  //   })
  //   it('should return a 200 and group chats', async () => {
  //     await registerUser(userPayload)
  //     const registered = await registerUser(user2Payload)
  //     const logged = await loginUser(loginPayload)
  //     const payload = groupPayload(registered.body.data._id)
  //     const { body, statusCode } = await createChatGroup(logged.body.token, payload)
  //     expect(statusCode).toEqual(200)
  //     expect(body.data).toBeDefined()
  //     expect(body.data.chatName).toEqual(payload.name)
  //     expect(body.data.isGroupChat).toEqual(true)
  //   })
  // })

  // describe('rename group chat', () => {
  //   it('should return a 401 because not send access token', async () => {
  //     const { statusCode } = await request(app).put('/api/v1/chat/rename/group')
  //     expect(statusCode).toEqual(401)
  //   })
  //   it('should return a 200 and rename group chats', async () => {
  //     await registerUser(userPayload)
  //     const registered = await registerUser(user2Payload)
  //     const logged = await loginUser(loginPayload)
  //     const payload = groupPayload(registered.body.data._id)
  //     const chat = await createChatGroup(logged.body.token, payload)
  //     const renameGroupPayload = {
  //       chatId: chat.body.data._id,
  //       chatName: 'update group'
  //     }
  //     const { body, statusCode } = await request(app)
  //       .put('/api/v1/chat/rename/group')
  //       .set('Authorization', `Bearer ${logged.body.token}`)
  //       .send(renameGroupPayload)
  //     expect(statusCode).toEqual(200)
  //     expect(body.data).toBeDefined()
  //     expect(body.data.chatName).toEqual(renameGroupPayload.chatName)
  //     expect(body.data.isGroupChat).toEqual(true)
  //   })
  // })

  // describe('add user to group chat', () => {
  //   it('should return a 401 because not send access token', async () => {
  //     const { statusCode } = await request(app).put('/api/v1/chat/add/group')
  //     expect(statusCode).toEqual(401)
  //   })
  //   it('should return a 200 and add user to group chat', async () => {
  //     await registerUser(userPayload)
  //     const user2 = await registerUser(user2Payload)
  //     const user3 = await request(app).post('/api/v1/auth/register').send(user3Payload)
  //     const logged = await loginUser(loginPayload)
  //     const payload = groupPayload(user2.body.data._id)
  //     const chat = await createChatGroup(logged.body.token, payload)
  //     const addUserToGroupPayload = {
  //       chatId: chat.body.data._id,
  //       userId: user3.body.data._id
  //     }
  //     const { body, statusCode } = await request(app)
  //       .put('/api/v1/chat/add/group')
  //       .set('Authorization', `Bearer ${logged.body.token}`)
  //       .send(addUserToGroupPayload)
  //     expect(statusCode).toEqual(200)
  //     expect(body.data).toBeDefined()
  //     expect(body.data.chatName).toEqual(payload.name)
  //     expect(body.data.isGroupChat).toEqual(true)
  //   })
  // })

  // describe('remove user from group chat', () => {
  //   it('should return a 401 because not send access token', async () => {
  //     const { statusCode } = await request(app).put('/api/v1/chat/remove/group')
  //     expect(statusCode).toEqual(401)
  //   })
  //   it('should return a 200 and remove user from group chat', async () => {
  //     await registerUser(userPayload)
  //     const user2 = await registerUser(user2Payload)
  //     const logged = await loginUser(loginPayload)
  //     const payload = groupPayload(user2.body.data._id)
  //     const chat = await createChatGroup(logged.body.token, payload)
  //     const removeUserToGroupPayload = {
  //       chatId: chat.body.data._id,
  //       userId: user2.body.data._id
  //     }
  //     const { body, statusCode } = await request(app)
  //       .put('/api/v1/chat/remove/group')
  //       .set('Authorization', `Bearer ${logged.body.token}`)
  //       .send(removeUserToGroupPayload)
  //     expect(statusCode).toEqual(200)
  //     expect(body.data).toBeDefined()
  //     expect(body.data.chatName).toEqual(payload.name)
  //     expect(body.data.isGroupChat).toEqual(true)
  //   })
  // })
})
