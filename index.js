const wx = innerWidth
const wy = innerHeight
const renderDistance = 3

const cameraZoom = 35
const camera = new Camera(0, 0, cameraZoom)

const playerSize = 2
const playerWalkVelocity = 0.5
const playerJumpVelocity = 2
const player = new Player(wx / cameraZoom / 2 - 1, wy / cameraZoom / 2 - 1, playerSize, playerWalkVelocity, playerJumpVelocity)

const mapChunkBlocksWidth = 10
const mapChunkBlocksHeight = 200
const mapBlockSize = 1
const map = new Map(mapChunkBlocksWidth, mapChunkBlocksHeight, mapBlockSize)

function setup() {
  createCanvas(wx, wy)
  noStroke()
  textAlign(LEFT, TOP)
  textSize(20)
}

function draw() {
  background(135, 206, 235)

  player.draw()
  player.movement()

  map.draw(player.x, player.y, renderDistance)

  fill(0)
  text(frameRate().toFixed(0), 10, 10)
}