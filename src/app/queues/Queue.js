import CancellationMail from '../jobs/CancellationMail'
import redisConfig from '../../config/redis'
import Bee from 'bee-queue'
// import Bee from 'bee-queue'

const jobs = [new CancellationMail()]

export default class Queue {
  constructor() {
    this.queues = {}
    this.init()
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      }
    })
  }

  add(keyQueue, job) {
    return this.queues[keyQueue].bee.createJob(job).save()
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key]
      bee.process(handle)
    })
  }
}
