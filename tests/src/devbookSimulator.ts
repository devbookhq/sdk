import { Devbook, DevbookStatus } from '@devbookhq/sdk'

export type Behavior = (devbook: Devbook) => Promise<void>

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
    this.devbook?.destroy()
    this.devbook = undefined
  }

  async tick(behavior: Behavior) {
    if (!this.devbook) return
    try {
      await behavior(this.devbook)
    } catch (err: any) {
      console.error(err.message)
    }
  }
}
