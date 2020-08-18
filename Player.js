class Player {
  constructor(x, y, size, walkVelocity, jumpVelocity) {
    this.x = x
    this.y = y
    this.size = size
    this.walkVelocity = walkVelocity
    this.jumpVelocity = jumpVelocity
    this.RGB = [200, 100, 50]

    this.vy = 0
  }

  draw() {
    fill(this.RGB)
    drawRect(this.x, this.y, this.size, this.size)
  }

  movement() {
    if (keyIsDown(keys.s)) { // s
      this.y += this.walkVelocity * deltaTime / (1000 / 60)
      camera.y += this.walkVelocity * deltaTime / (1000 / 60)
    }
    if (keyIsDown(keys.w)) { // w
      this.y -= this.walkVelocity * deltaTime / (1000 / 60)
      camera.y -= this.walkVelocity * deltaTime / (1000 / 60)
    }
    if (keyIsDown(keys.d)) { // d
      this.x += this.walkVelocity * deltaTime / (1000 / 60)
      camera.x += this.walkVelocity * deltaTime / (1000 / 60)
    }
    if (keyIsDown(keys.a)) { // a
      this.x -= this.walkVelocity * deltaTime / (1000 / 60)
      camera.x -= this.walkVelocity * deltaTime / (1000 / 60)
    }
  }
}