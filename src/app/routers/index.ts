import Router from 'koa-router'
import controller from '../controllers'

const router: Router = new Router()

router.get('/:code', controller.redirect)

router.get('/', controller.generate)

export default router
