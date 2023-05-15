import request from 'supertest'

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

export const registerUser = async (payload: { name: string; pic: string; email: string; password: string }) => {
  return await request(app).post('/api/v1/auth/register').send(payload)
}

export const loginUser = async (payload: { email: string; password: string }) => {
  return await request(app).post('/api/v1/auth/login').send(payload)
}
