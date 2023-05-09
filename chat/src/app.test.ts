import request from 'supertest'

import app from './app'

describe('Test Application', () => {
  it('NotFound for site 404', async () => {
    const res = await request(app).get('/wrong-endpoint')
    expect(res.statusCode).toEqual(404)
    expect(res.body.status).toEqual('error')
    expect(res.body.description).toEqual('Page Not Found!')
  })

  it('Health check route returns valid response', async () => {
    const res = await request(app).get('/app-version')
    expect(res.statusCode).toEqual(200)
    expect(res.body.author).toEqual('Aliamat Parinduri')
    expect(res.body.version).toEqual('0.1.0')
  })
})
