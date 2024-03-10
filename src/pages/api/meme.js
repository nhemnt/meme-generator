import { meme } from '@/server/controllers/meme.controller'
import { NextApiHandler } from '@/server/middelwares/NextApiHandler'

export default NextApiHandler({
  get: meme,
})
