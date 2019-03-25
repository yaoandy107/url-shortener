import mongoose, { ConnectionOptions } from 'mongoose'
import config from '../configs/db'

async function connect (): Promise<void> {
  const options: ConnectionOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
  }

  try {
    await mongoose.connect(config.mongoURI, options)
    console.log(`Mongoose default connection open to ${config.mongoURI}`)
    process.on('exit', async () => {
      await mongoose.connection.close()
      console.log('Mongoose default connection closed through app termination')
      process.exit(0)
    })
  } catch (err) {
    console.log(`Mongoose default connection error: ${err}`)
    throw err
  }
}

export default connect
