import request from 'supertest'

import app from '../app'
import { loginPayload, loginUser, registerUser, userPayload } from './mongodb.memory'

describe('User', () => {
  it('initial setup', () => {
    expect(true).toEqual(true)
  })

  // describe('get Users route', () => {
  //   it('should return a 401 because not send access token', async () => {
  //     const search = 'notFound'
  //     await request(app).get(`/api/v1/users?search=${search}`).expect(401)
  //   })
  // })

  // describe('get Users route', () => {
  //   it('should return a 404 because user not found', async () => {
  //     await registerUser(userPayload)
  //     const logged = await loginUser(loginPayload)

  //     const search = 'notFound'
  //     const { body, statusCode } = await request(app)
  //       .get(`/api/v1/users?search=${search}`)
  //       .set('Authorization', `Bearer ${logged.body.token}`)

  //     expect(statusCode).toEqual(404)
  //     expect(body.description).toEqual('Users Not Found')
  //   })
  // })
})
