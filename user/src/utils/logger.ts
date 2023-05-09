import pino from 'pino'
import pretty from 'pino-pretty'
import dayjs from 'dayjs'

export const logger = pino(
  {
    base: {
      pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
  },
  pretty()
)
