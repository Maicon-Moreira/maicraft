class Map {
  constructor(chunkBlocksWidth, chunkBlocksHeight, blockSize) {
    this.chunkBlocksWidth = chunkBlocksWidth
    this.chunkBlocksHeight = chunkBlocksHeight
    this.blockSize = blockSize

    this.chunks = {}
    this.chunksCache = {}
  }

  blockColors = [
    null,
    [155, 118, 83],
    [132, 192, 17],
    [136, 140, 141],
    [50, 211, 219, 150],
    [255, 250, 250],
  ]

  draw(x, y, renderDistance, debug = false) {
    const chunkX = floor(x / this.chunkBlocksWidth)

    for (let delta = -renderDistance; delta <= renderDistance; delta++) {
      this.drawChunk(chunkX + delta)
    }
  }

  drawChunk(chunkX) {
    const chunkCache = this.chunksCache[chunkX]

    if (chunkCache) {
      // console.log(chunkCache)
      const realChunkX = -camera.x * cameraZoom + chunkX * this.chunkBlocksWidth * cameraZoom
      const realChunkY = -camera.y * cameraZoom
      console.log(realChunkX)
      image(chunkCache, realChunkX, realChunkY)
    }
    else {
      this.createChunk(chunkX)
    }
  }

  createChunk(chunkX) {
    // 0 = air
    // 1 = dirt
    // 2 = grass
    // 3 = stone
    // 4 = water
    // 5 = snow
    const chunk = []

    for (let x = 0; x < this.chunkBlocksWidth; x++) {
      const realX = chunkX * this.chunkBlocksWidth + x

      chunk[x] = []

      const terrainHeight = 100 + noise(realX * 0.003) * 80 + + noise(100 + realX * 0.03) * 20
      const stoneHeight = terrainHeight - 5 - noise(realX * 0.1) * 10

      for (let y = 0; y < this.chunkBlocksHeight; y++) {
        let block = 0

        // se altura for menor que altura do terreno colocar terra
        if (y < terrainHeight) {
          block = 1

          // e se for o ultimo bloco colocar grama ou neve
          if (y + 1 > terrainHeight) {
            // se altura for maior que altura para neve colocar neve
            if (y > 170) {
              block = 5
            }
            else {
              block = 2
            }
          }
        }

        // se altura for menor que altura das pedras colocar pedra
        if (y < stoneHeight) {
          block = 3
        }

        // se bloco for ar e for menor que altura da agua
        if (block === 0 && y < 130) {
          block = 4
        }


        chunk[x][y] = block
      }
    }

    this.chunks[chunkX] = chunk

    this.updateChunk(chunkX)
  }

  updateChunk(chunkX) {
    const graphics = createGraphics(this.chunkBlocksWidth * cameraZoom, this.chunkBlocksHeight * cameraZoom)
    graphics.noStroke()

    const chunk = this.chunks[chunkX]

    for (let x = 0; x < this.chunkBlocksWidth; x++) {
      for (let y = 0; y < this.chunkBlocksHeight; y++) {
        const block = chunk[x][y]

        if (block !== 0) {

          const color = this.blockColors[block]

          const realX = x * cameraZoom
          const realY = (this.chunkBlocksHeight - y) * cameraZoom

          graphics.fill(color)
          graphics.rect(realX, realY, 1 * cameraZoom, 1 * cameraZoom)
        }
      }
    }

    this.chunksCache[chunkX] = graphics
  }
}