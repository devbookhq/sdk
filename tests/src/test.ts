import { Devbook } from '@devbookhq/sdk'


async function run() {
  const devbook = new Devbook({
    env: 'banana-node',
    onStatusChange(status) {
      console.log({ status })
    },
  })
}


run()
