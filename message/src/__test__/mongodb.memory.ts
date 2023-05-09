import mongoose from 'mongoose'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'

import app from '../app'

export const loginPayload = {
  email: 'jane.doe@example.com',
  password: 'JaneDoe123'
}

export const userPayload = {
  ...loginPayload,
  name: 'Jane Doe',
  pic: 'https://example.com/tets.jpeg'
}

export const user2Payload = {
  name: 'john Doe',
  email: 'john.doe@example.com',
  password: 'johnDoe123',
  pic: 'https://example.com/tets.jpeg'
}

let mongoDb: MongoMemoryServer

export const connect = async (): Promise<void> => {
  mongoDb = await MongoMemoryServer.create()
  const uri = mongoDb.getUri()
  mongoose.set('strictQuery', false)
  await mongoose.connect(uri)
}

export const cleanData = async (): Promise<void> => {
  await mongoose.connection.db.dropDatabase()
}

export const disconnect = async (): Promise<void> => {
  await mongoose.disconnect()
  await mongoDb.stop()
}

export const registerUser = async (payload: { name: string; pic: string; email: string; password: string }) => {
  return await request(app).post('/api/v1/auth/register').send(payload)
}

export const loginUser = async (payload: { email: string; password: string }) => {
  return await request(app).post('/api/v1/auth/login').send(payload)
}

export const groupPayload = (user: string) => {
  return { name: 'test group', users: JSON.stringify([user]) }
}

export const createChatGroup = async (token: string, groupPayload: { name: string; users: string }) => {
  return await request(app).post('/api/v1/chat/group').set('Authorization', `Bearer ${token}`).send(groupPayload)
}
