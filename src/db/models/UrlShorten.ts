import mongoose, { Document, Schema } from 'mongoose'

export interface UrlShorten extends Document {
  originalUrl: string
  urlCode: string
  shortUrl: string
  createdAt: Date
  updatedAt: Date
}

const UrlShortenSchema: Schema = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model<UrlShorten>('User', UrlShortenSchema)
