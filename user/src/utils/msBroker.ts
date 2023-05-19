import amqp from 'amqplib'

import { InternalServerError } from './errors'
import { EXCHANGE_NAME, MSBROKER_URI, USER_RPC } from '../../config'

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

// RPC
export const RPCObserver = async (channel: any, service: any) => {
  await channel.assertQueue(USER_RPC, {
    durable: false
  })
  channel.prefetch(1)
  channel.consume(
    USER_RPC,
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
