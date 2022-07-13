import generateIdenticon from './main'

const app = document.querySelector<HTMLDivElement>('#app')

const hashes = [
  { hash: 'd6fe8c82fb0abac17a702fd2a94eff37' },
  { hash: '46384036044a604b6b3316fc167fc15f' },
  { hash: 'd7e8128316e6d6fa7ec8ccd0d9c3bf9b' },
  { hash: 'ec794ee0f389ce91650b9e7be6611763' },
  { hash: 'ecf0ced126f36a273af0dc72961e7252' },
  { hash: 'b15b27eb08998de0a8186f21e0ba8e4b' },
  { hash: '6471f20bf08e9361068f497de07ba310' },
  { hash: '3675ea58955516d0391a6b4d883427ff' },
  { hash: 'f7bc35d39fdeff6a251aab0d3b00fbd3' },
  { hash: 'be4b81bbcfd233a66105b925c2f55c06' },
  { hash: '920143b82d8c66aaf4d92a3590f7711a' },
  { hash: '791f26a843fc81459c66522132be9c15' },
  { hash: '8ec8cffac4cc7b386e0714e200523e87' },
  { hash: '56fd3b3507f15016b5b511ba36094806' },
  { hash: 'b30bc42d4521695b9b7d04c5322b8b23' },
  { hash: '87a346d79a3f48e4f254924552d95085' },
]

if (app) {
  for (let i = 0; i < hashes.length; i++) {
    const data = generateIdenticon(hashes[i].hash).toString()
    app.innerHTML += data
  }
}
