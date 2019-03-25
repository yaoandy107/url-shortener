import { Context } from 'koa'
import * as mongoose from 'mongoose'
import shortid from 'shortid'
import validUrl from 'valid-url'
import Config from '../../configs/app'
import UrlShorten from '../../db/models/UrlShorten'

async function generate (ctx: Context) {
  const { originalUrl } = ctx.request.body
  const urlCode: string = shortid.generate()
  const updateAt: Date = new Date()
  if (validUrl.isUri(originalUrl)) {
    try {
      let shortUrlObj = await UrlShorten.findOne({ originalUrl })
      if (shortUrlObj) {
        ctx.status = 200
        ctx.body = shortUrlObj
      } else {
        const shortUrl = Config.shortBaseUrl + '/' + urlCode
        shortUrlObj = new UrlShorten({
          originalUrl,
          shortUrl,
          urlCode,
          updateAt,
        })
        await shortUrlObj.save()
        ctx.status = 200
        ctx.body = shortUrl
      }
    } catch (err) {
      ctx.status = 401
      ctx.body = {
        message: err,
      }
    }
  }
}

export default generate
