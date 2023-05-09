import mongoose from 'mongoose'

import { DBUri } from '../../config'
import { logger } from '.'

export const connectDB = async () => {
  try {
    await mongoose.connect(DBUri)
    logger.info('Success - connect to database mongoose')
  } catch (err) {
    logger.error('Error - connect to database mongoose ', err)
    process.exit()
  }
}
