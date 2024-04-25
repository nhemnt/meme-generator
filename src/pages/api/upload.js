
import { upload } from '@/server/controllers/bulkUpload.controller'
import { NextApiHandler } from '@/server/middelwares/NextApiHandler'
import { withAuth } from '@/server/middelwares/withAuth'

export default NextApiHandler({
  get: withAuth(upload),
})
