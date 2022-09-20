import md5 from 'md5'

const randomString = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  const length = 24
  let text = ''
  let num = 0

  for (let i = 1; i <= length; i++) {
    text += chars.substring((num = Math.floor(Math.random() * chars.length)), num + 1)
  }

  return text
}

const generateIdenticon = (str: string): string => {
  const pixels = renderPixels(md5(str))
  const svg = pixelsToSvg(pixels)

  return svg
}

type Rectangle = {
  x: number
  y: number
  isPixel: boolean
}

const renderPixels = (hash: string) => {
  let buffer: Rectangle[] = []

  for (let i = 0; i < 18; i++) {
    const isPixel = hash.charCodeAt(i) % 2 === 0

    if (i < 3) {
      // Start with the two central columns
      buffer.push({ x: 2, y: i, isPixel: isPixel })
      buffer.push({ x: 3, y: i, isPixel: isPixel })
    } else if (i < 6) {
      // Move out to the columns one from the edge
      buffer.push({ x: 1, y: i - 3, isPixel: isPixel })
      buffer.push({ x: 4, y: i - 3, isPixel: isPixel })
    } else if (i < 9) {
      // Fill the outside columns
      buffer.push({ x: 0, y: i - 6, isPixel: isPixel })
      buffer.push({ x: 5, y: i - 6, isPixel: isPixel })
    }
  }

  return buffer
}

const pixelsToSvg = (pixels: Rectangle[]): string => {
  let xml = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <g style="fill: currentColor">`

  pixels.forEach((pixel) => {
    if (!pixel.isPixel) {
      return
    }
    xml += `<rect x="${pixel.x * 3 + 2 * pixel.x}" y="${
      pixel.y * 8 + 2 * pixel.y
    }" width="3" height="8"/>
    `
  })

  xml += `</g>
  </svg>`

  return xml
}

export { generateIdenticon, randomString }
