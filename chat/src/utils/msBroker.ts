/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable promise/param-names */
import amqp from 'amqplib'
import { v4 as uuidv4 } from 'uuid'

import { InternalServerError } from './errors'
import { EXCHANGE_NAME, MSBROKER_URI, CHAT_QUEUE_NAME, CHAT_BINDING_KEY, CHAT_RPC } from '../../config'

let amqpConn: any = null

export const createChannel = async () => {
  try {
    if (amqpConn === null) {
      amqpConn = await amqp.connect(MSBROKER_URI)
    }

    const channel = await amqpConn.createChannel()
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false)
    return channel
  } catch (err: any) {
    console.log(err)

    throw new InternalServerError(err)
  }
}

export const subscribeMessage = async (channel: any, service: any) => {
  try {
    const q = await channel.assertQueue(CHAT_QUEUE_NAME)
    channel.bindQueue(q.queue, EXCHANGE_NAME, CHAT_BINDING_KEY)

    channel.consume(q.queue, (data: any) => {
      console.log('received data in user service')
      console.log(data.content.toString())
      service.SubscribeEvents(data.content.toString())
      channel.ack(data)
    })
  } catch (err: any) {
    console.log(err)

    throw new InternalServerError(err)
  }
}

// RPC
export const RPCObserver = async (channel: any, service: any) => {
  await channel.assertQueue(CHAT_RPC, {
    durable: false
  })
  channel.prefetch(1)
  channel.consume(
    CHAT_RPC,
    async function (msg: any) {
      if (msg.content) {
        // DB Operation
        const payload = JSON.parse(msg.content.toString())
        const response = await service.serveRPCRequest(payload) // call fake DB operation

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
          correlationId: msg.properties.correlationId
        })
        channel.ack(msg)
      }
    },
    {
      noAck: false
    }
  )
}

const requestData = async (channel: any, RPC_QUEUE_NAME: any, requestPayload: any, uuid: string) => {
  const q = await channel.assertQueue('', { exclusive: true })

  channel.sendToQueue(RPC_QUEUE_NAME, Buffer.from(JSON.stringify(requestPayload)), {
    replyTo: q.queue,
    correlationId: uuid
  })

  //  timeout n

  return new Promise((res, rej) => {
    const timeout = setTimeout(() => {
      channel.close()
      res('API could not fullfil the request!')
    }, 8000)
    channel.consume(
      q.queue,
      (msg: any) => {
        if (msg.properties.correlationId === uuid) {
          res(JSON.parse(msg.content.toString()))
          clearTimeout(timeout)
        } else {
          rej('Data not found!')
        }
      },
      {
        noAck: true
      }
    )
  })
}

export const RPCRequest = async (channel: any, RPC_QUEUE_NAME: any, requestPayload: any) => {
  const uuid = uuidv4()

  return await requestData(channel, RPC_QUEUE_NAME, requestPayload, uuid)
}
