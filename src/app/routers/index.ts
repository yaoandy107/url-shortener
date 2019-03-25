import Router from 'koa-router'
import controller from '../controllers'

const router: Router = new Router({
  prefix: '/api',
})

router.get('/:code', controller.redirect)

router.post('/', controller.generate)

export default router
