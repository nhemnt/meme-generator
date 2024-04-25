import { dailyMemeAlert } from '@/server/controllers/dailyMemeAlert.controller'
import { NextApiHandler } from '@/server/middelwares/NextApiHandler'
import { withAuth } from '@/server/middelwares/withAuth'

export default NextApiHandler({
  post: withAuth(dailyMemeAlert),
})
