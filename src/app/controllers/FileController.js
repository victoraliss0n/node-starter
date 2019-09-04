import FileService from '../providers/FileService'

export default class FileController {
  constructor(InjectableFileService = new FileService()) {
    this.FileService = InjectableFileService
  }

  async create(req, res) {
    try {
      const file = await this.FileService.create(req.file)
      res.json(file)
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }
}
