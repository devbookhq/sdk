import { DevbookStatus } from '@devbookhq/sdk'
import {
  DevbookSimulator,
  Behavior,
} from './devbookSimulator'

export class DevbookFlock {
  readonly devbooks: Array<DevbookSimulator> = []

  get stats() {
    return {
      status: this.devbooks
        .map(devbook => devbook.stats)
        .reduce((prev, curr) => {
          switch (curr.status) {
            case DevbookStatus.Connected:
              prev.Connected += 1
              break
            case DevbookStatus.Connecting:
              prev.Connecting += 1
              break
            case DevbookStatus.Disconnected:
              prev.Disconnected += 1
              break
            case undefined:
              prev.Disabled += 1
              break
          }
          return prev
        }, {
          [DevbookStatus.Connected]: 0,
          [DevbookStatus.Connecting]: 0,
          [DevbookStatus.Disconnected]: 0,
          'Disabled': 0,
        }),
      size: this.size,
      env: this.env,
    }
  }

  get size() {
    return this.devbooks.length
  }
  set size(value: number) {
    const diff = value - this.size
    if (diff > 0) {
      for (let i = diff; i > 0; i--) {
        this.addDevbook()
      }
    }
    if (diff < 0) {
      for (let i = diff; i < 0; i++) {
        this.removeDevbook()
      }
    }
  }

  private addDevbook() {
    const devbook = new DevbookSimulator(this.env)
    devbook.start()
    this.devbooks.unshift(devbook)
  }

  private removeDevbook() {
    const devbook = this.devbooks.pop()
    if (devbook) {
      devbook.stop()
    }
  }

  constructor(private readonly env: string, initialSize: number = 0) {
    for (let i = 0; i < initialSize; i++) {
      this.addDevbook()
    }
  }

  tick(behavior: Behavior) {
    for (const devbook of this.devbooks) {
      devbook.tick(behavior)
    }
  }
}
