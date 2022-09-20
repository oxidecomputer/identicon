import { generateIdenticon, randomHash } from './main'

const app = document.querySelector<HTMLDivElement>('#app')

const hashes = [
  '534c3b5675d7933d55b242a822d41330',
  '7745d58ee1f22e36e1ae64b2ca199690',
  '4664cfb5c9dfd751081ceab16698f8b0',
  'cde0de9fcc2f82f8b4719b8728ba2f98',
  'dbfe23be04bc6200494ff880dc84b73b',
  '4a0507c555db5e2307f2dcb25860a1b4',
  '9262f63673ac2b08eacd6db401d61815',
  '96d363ce6073e0a71217de422fd96324',
  '1a5386e52c3b6f456a4a136d180f3d05',
  '524eed7398e0f673f18cdda8bf7eac92',
  '7938ce059025b7350a22450c0b8f6af3',
  'b2e91416a9389d49f835afe887d02d1a',
  'd02586aa46692992fa7388fe6b1c300e',
  '83e53544593c3494d6197b278021e1c7',
  '53ccfce8226cea1b1c1c8736bd4ee2e7',
  '768ac0ce23017b6deac3c1e226dc9ef6',
]

const origHashes = [...hashes]

const changeIdx = [
  [0, 2, 5, 7, 8, 10, 13, 15],
  [1, 3, 4, 6, 9, 11, 12, 14],
]

let frame = 0

setInterval(() => {
  if (frame === 5) {
    //clearInterval(interval)

    for (let i = 0; i < hashes.length; i++) {
      if (changeIdx[frame % 2 ? 0 : 1].includes(i)) {
        hashes[i] = origHashes[i]
      }
    }

    render()

    frame = 0

    return
  }

  for (let i = 0; i < hashes.length; i++) {
    if (changeIdx[frame % 2 ? 0 : 1].includes(i)) {
      hashes[i] = randomHash()
    }
  }

  render()

  frame++
}, 1000)

const render = () => {
  if (app) {
    app.innerHTML = ''
    for (let i = 0; i < hashes.length; i++) {
      const data = generateIdenticon(hashes[i]).toString()
      console.log(data)
      app.innerHTML += data
    }
  }
}

render()
