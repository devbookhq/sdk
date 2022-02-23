import { Devbook, DevbookStatus } from '@devbookhq/sdk'

export type Behavior = (devbook: Devbook) => void

export class DevbookSimulator {
  private devbook?: Devbook

  get stats(): { status?: DevbookStatus } {
    return {
      status: this.devbook?.status,
    }
  }

  constructor(private readonly env: string) { }

  start() {
    this.devbook = new Devbook({ env: this.env })
  }

  stop() {
    this.devbook.destroy()
    this.devbook = undefined
  }

  tick(behavior: Behavior) {
    if (!this.devbook) return
    try {
      behavior(this.devbook)
    } catch (err) {
      console.error(err)
    }
  }
}
