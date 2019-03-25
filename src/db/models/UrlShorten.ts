import mongoose, { Document, Schema } from 'mongoose'

export interface ShortUrl extends Document {
  originalUrl: string
  urlCode: string
  shortUrl: string
  createdAt: Date
  updatedAt: Date
}

const ShortUrlSchema: Schema = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model<ShortUrl>('ShortUrl', ShortUrlSchema)
