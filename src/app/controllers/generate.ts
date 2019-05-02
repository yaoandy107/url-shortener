import { Context } from 'koa'
import * as mongoose from 'mongoose'
import shortid from 'shortid'
import validUrl from 'valid-url'
import Config from '../../configs/app'
import ShortUrlModel from '../../db/models/ShortUrl'

async function generate (ctx: Context) {
  const originalUrl: string = ctx.query.url
  const urlCode: string = getrandomId(5)
  const updateAt: Date = new Date()
  if (validUrl.isUri(originalUrl)) {
    try {
      let shortUrlEntity = await ShortUrlModel.findOne({ originalUrl })
      if (shortUrlEntity) {
        ctx.status = 200
        ctx.body = shortUrlEntity.shortUrl
      } else {
        const shortUrl = 'https://' + Config.shortBaseUrl + '/' + urlCode
        shortUrlEntity = new ShortUrlModel({
          originalUrl,
          shortUrl,
          urlCode,
          updateAt,
        })
        await shortUrlEntity.save()
        ctx.status = 200
        ctx.body = shortUrl
      }
    } catch (err) {
      ctx.status = 400
      ctx.body = {
        message: err,
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      message: 'Invalid url.',
    }
  }
}

function getrandomId (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export default generate
