import File from '../models/File'

export default class FileService {
  constructor(InjectableFile = File) {
    this.File = InjectableFile
  }

  async create(file) {
    const { originalname: name, filename: path } = file
    const result = await this.File.create({ name, path })
    return result
  }
}
