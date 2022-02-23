import { DevbookFlock } from './devbookFlock'
import { Behavior } from './devbookSimulator'
import randomItem from './randomItem'
import randomNumber from './randomNumber'
import wait from './wait'

const behaviors: Behavior[] = [
  async (devbook) => {
    devbook.runCmd('ls')
    devbook.runCmd('ls')
    devbook.runCmd('ls')
  },
  (devbook) => devbook.fs.write('/index.js', 'console.log("testing")'),
  async () => { },
]

const randomBehavior: Behavior = (devbook) => {
  const behavior = randomItem(behaviors)
  return behavior(devbook)
}

const initialPopulation = 1
const idealPopulation = 5
const populationStep = 2

function evolvePopulation(flock: DevbookFlock) {
  if (flock.size > idealPopulation) {
    flock.size -= randomNumber(populationStep)
  } else if (flock.size < idealPopulation) {
    flock.size += randomNumber(populationStep)
  } else {
    flock.size += randomNumber(populationStep) - Math.ceil(populationStep / 2)
  }
}

async function simulate() {
  console.log('Starting stress test')
  console.log('--------------------')

  const flock1 = new DevbookFlock('banana-node', initialPopulation)
  // const flock2 = new DevbookFlock('banana-python', initialPopulation)

  let tick = 0

  while (true) {
    tick++
    // console.log(`[${tick}] Total population: ${flock1.size + flock2.size}`)

    console.log('flock1 stats', flock1.stats)
    // console.log('flock2 stats', flock1.stats)

    // evolvePopulation(flock1)
    // evolvePopulation(flock2)

    // flock1.tick(randomBehavior)
    // flock2.tick(randomBehavior)

    console.log('--------------------')
    await wait(5000)
  }
}

simulate()
