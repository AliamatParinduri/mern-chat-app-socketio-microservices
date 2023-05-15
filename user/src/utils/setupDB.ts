import db from '../models'
import { logger } from './logger'

export const connectDB = async () => {
  try {
    db.sequelize.sync()
    logger.info('Success - connect to database postgres')
    console.log('DB Success Migrated')
  } catch (err) {
    logger.error('Error - connect to database postgres ', err)
    process.exit()
  }
}
