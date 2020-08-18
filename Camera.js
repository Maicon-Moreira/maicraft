class Camera {
  constructor(x, y, zoom) {
    this.x = x
    this.y = y
    this.zoom = zoom
  }

  drawRect(x, y, w, h) {
    const screenX = (x - this.x) * this.zoom
    const screenY = (y - this.y) * this.zoom
    const screenWidth = w * this.zoom
    const screenHeight = h * this.zoom

    if (screenX < wx &&
      screenX + screenWidth > 0 &&
      screenY < wy &&
      screenY + screenHeight > 0)

      rect(screenX, screenY, screenWidth + 1, screenHeight + 1)
  }
}