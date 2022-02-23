import randomNumber from './randomNumber'

function randomItem<T>(items: T[]) {
  return items[randomNumber(items.length)]
}

export default randomItem
