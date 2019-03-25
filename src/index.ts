import app from './app'
import appConfig from './configs/app'
import connectToDatabase from './db'

connectToDatabase()
  .then(() => {
    app.listen(appConfig.port)
    console.log(`Service is online on http://localhost:${appConfig.port} !`)
  })
  .catch((err: Error) => {
    console.log(err)
    console.log('Service is offline !')
  })
