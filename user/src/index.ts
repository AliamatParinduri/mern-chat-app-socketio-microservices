import app from './app'
import { PORT as port } from '../config'
import { connectDB, logger } from './utils'

const setupServer = async () => {
  await connectDB()

  app.listen(port, () => logger.info(`server running on http://localhost:${port}`))
}

setupServer()
