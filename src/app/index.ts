import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import router from './routers/'

const app: Koa<{}, any> = new Koa()

app.use(bodyparser())

app.use(router.routes()).use(router.allowedMethods())

export default app
