const ws = 600
const chunkWidth = 10
const chunkHeight = 100
const chunks = {}
const numRenderChunks = 1
const blockSize = 20
const chunkSize = chunkWidth * blockSize
const velocity = 1
let currentChunk = 0
let playerX = 0
let playerY = 0
let vy = 0
let g = -0.01


// 0 - ar
// 1 - terra
// 2 - grama
// 3 - pedra
// 4 - agua

function setup() {
  createCanvas(ws, ws);
  noStroke()

  textAlign(LEFT, TOP)
}

function draw() {
  translate(ws/2, ws/2)
  background(135, 206, 235);

  playerLogic()

  currentChunk = -floor(playerX / chunkWidth)

  renderChunks()

  fill(0)
  text(frameRate().toFixed(0), 10, 10)
}

function playerLogic() {
  const colided = collision(playerX, playerY)

  vy += g

  if (colided !== 0) {
    vy = 0
  }

  playerY += vy

  if (keyIsDown(UP_ARROW)) playerY += velocity
  if (keyIsDown(DOWN_ARROW)) playerY -= velocity
  if (keyIsDown(LEFT_ARROW)) playerX += velocity
  if (keyIsDown(RIGHT_ARROW)) playerX -= velocity

  fill(50, 100, 200)
  rect(-20, -20, 40, 40)
}

function collision(x, y) {
  const chunk = chunks[currentChunk]

  const xBlock = -floor(x) % chunkWidth
  const yBlock = -floor(y)

  if (chunk && chunk[yBlock]) {
    return chunk[yBlock][xBlock]
  }
  return 0
}

function drawChunk(num) {
  const chunk = chunks[num]

  for (let y = 0; y < chunkHeight; y++) {
    const yPos = playerY * blockSize + y * blockSize

    if (yPos < -ws/2 || yPos > ws/2) continue

    for (let x = 0; x < chunkWidth; x++) {
      const xPos = playerX * blockSize + chunkSize * num + x * blockSize

      if (xPos < -ws/2 || xPos > ws/2) continue

      if (chunk[y][x] === 0) { // ar
        continue

      } else if (chunk[y][x] === 1) { // terra
        fill(155, 118, 83)
        rect(xPos, yPos, blockSize, blockSize)

      } else if (chunk[y][x] === 2) { // grama
        fill(126, 200, 80)
        rect(xPos, yPos, blockSize, blockSize)
      }
    }
  }
}

function createChunk(num) {
  const chunk = []

  for (let y = 0; y < chunkHeight; y++) {
    chunk[y] = []
    for (let x = 0; x < chunkWidth; x++) {
      chunk[y][x] = 0
    }
  }

  // terrain
  for (let x = 0; x < chunkWidth; x++) {
    const height = 50 + noise((num * chunkWidth + x) * 0.01) * 50

    for (let y = 0; y < chunkHeight; y++) {
      if (y < height) {
        chunk[y][x] = 1
      }
    }
  }

  // grass
  for (let x = 0; x < chunkWidth; x++) {
    for (let y = 0; y < chunkHeight; y++) {
      if (chunk[y + 1][x] === 0) {
        chunk[y][x] = 2
        break
      }
    }
  }


  chunk.reverse()
  chunks[num] = chunk

  console.log('chunk ' + num + ' created')
}

function renderChunk(num) {
  if (chunks[num]) {
    drawChunk(num)
  } else {
    createChunk(num)
  }
}

function renderChunks() {
  for (let i = -numRenderChunks; i <= numRenderChunks; i++) {
    renderChunk(currentChunk + i)
  }
}

function mousePressed() {
  console.log(chunks)
}