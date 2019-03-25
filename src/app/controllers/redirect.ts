import { Context } from 'koa'
import mongoose from 'mongoose'
import UrlShortenSchema, { UrlShorten } from '../../db/models/UrlShorten'

async function redirect (ctx: Context): Promise<void> {
  const urlCode = ctx.params.code
  const item: UrlShorten = await UrlShortenSchema.findOne({ urlCode })
  if (item) {
    ctx.redirect(item.originalUrl)
  } else {
    ctx.status = 404
  }
}

export default redirect
