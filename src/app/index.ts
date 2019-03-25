import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import json from 'koa-json'
import logger from 'koa-logger'
import onerror from 'koa-onerror'
import protect from 'koa-protect'
import responseTime from 'koa-response-time'
import router from './routers/'

const app: Koa<{}, any> = new Koa()

onerror(app)

// X-Response-Time middleware
app.use(responseTime())
// JSON pretty-printed response middleware
app.use(json())
// Development style logger middleware
app.use(logger())
// SQL injection  protection middleware
app.use(protect.koa.sqlInjection({
  body: true,
  loggerFunction: console.error,
}))
// XSS protection middleware
app.use(protect.koa.xss({
  body: true,
  loggerFunction: console.error,
}))
// Header security middleware
app.use(helmet())
// Compress packet middleware
app.use(compress())
// Formdata parser middleware
app.use(bodyparser())

// Add all the api routers
app.use(router.routes()).use(router.allowedMethods())

export default app
