import { RequestHandler } from 'express'
import { useServiceManager } from 'servicemanager'

const middleware: RequestHandler = (req, res, next) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(422).json({ errors: ['Invalid id route param'] });
  }

  const pointCloudService = useServiceManager()!.get('PointCloudRestService')
  const cloud = pointCloudService.getOne(id)

  if (!cloud) {
    return res.status(404).json({ errors: ['Cloud not found'] })
  }

  res.locals.cloud = cloud

  return next()
}

export default middleware
