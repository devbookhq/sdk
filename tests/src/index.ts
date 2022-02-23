import { DevbookFlock } from './devbookFlock'
import { Behavior } from './devbookSimulator'
import randomItem from './randomItem'
import randomNumber from './randomNumber'
import wait from './wait'

const behaviors: Behavior[] = [
  (devbook) => {
    devbook.runCmd('ls')
    devbook.runCmd('ls')
    devbook.runCmd('ls')
  },
  (devbook) => devbook.fs.write('/index.js', 'code this'),
  () => { },
]

const initialPopulation = 2
const populationCenter = 10

function randomizePopulation(previousPopulation: number) {
  if (previousPopulation > populationCenter) {
    return populationCenter - randomNumber(2)
  }
  if (previousPopulation < populationCenter) {
    return previousPopulation + randomNumber(2)
  }
  return previousPopulation - 1 + randomNumber(2)
}

async function simulate() {
  const flock1 = new DevbookFlock('banana-node')
  flock1.size = initialPopulation

  const flock2 = new DevbookFlock('banana-python')
  flock2.size = initialPopulation

  let tick = 0

  while (true) {
    tick++
    console.log(`[${tick}] Total population: ${flock1.size + flock2.size}`)

    console.log('Flock1 stats', flock1.stats)
    console.log('Flock2 stats', flock1.stats)

    flock1.size = randomizePopulation(flock1.size)
    flock2.size = randomizePopulation(flock2.size)

    flock1.tick(randomItem(behaviors))
    flock2.tick(randomItem(behaviors))

    await wait(4000)
  }
}

simulate()
