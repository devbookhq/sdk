import { Devbook, DevbookStatus } from '@devbookhq/sdk'

export type Behavior = (devbook: Devbook) => Promise<void>

export class DevbookSimulator {
  private devbook?: Devbook

  readonly stdout: string[] = []
  readonly stderr: string[] = []

  get stats(): { status?: DevbookStatus } {
    return {
      status: this.devbook?.status,
    }
  }

  constructor(private readonly env: string) { }

  start() {
    this.stdout.splice(0, this.stdout.length)
    this.stderr.splice(0, this.stderr.length)

    const onStdout = (stdout: string) => this.stdout.push(stdout)
    const onStderr = (stderr: string) => this.stderr.push(stderr)

    this.devbook = new Devbook({
      env: this.env,
      onStdout,
      onStderr,
    })
  }

  stop() {
    this.devbook?.destroy()
    this.devbook = undefined
  }

  async tick(behavior: Behavior) {
    if (!this.devbook) return
    try {
      await behavior(this.devbook)
    } catch (err: any) { }
  }
}
