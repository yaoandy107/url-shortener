import { Context } from 'koa'
import mongoose from 'mongoose'
import ShortUrlSchema, { ShortUrl } from '../../db/models/ShortUrl'

async function redirect (ctx: Context): Promise<void> {
  const urlCode = ctx.params.code
  const item: ShortUrl = await ShortUrlSchema.findOne({ urlCode })
  if (item) {
    ctx.redirect(item.originalUrl)
  } else {
    ctx.status = 404
  }
}

export default redirect
