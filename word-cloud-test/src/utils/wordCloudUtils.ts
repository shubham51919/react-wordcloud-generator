export interface Word {
  text: string
  value: number
}

export interface Position {
  x: number
  y: number
  width: number
  height: number
}

export interface PlacedWord extends Word, Position {
  fontSize: number
}

export interface Callbacks {
  getWordColor?: (word: Word) => string
  onWordClick?: (word: Word) => void
  onWordMouseOver?: (word: Word) => void
  getWordTooltip?: (word: Word) => string
}

export interface Options {
  colors?: string[]
  shape?: 'circular' | 'horizontal' | 'loose' | 'archimedean'
}

export const findArchimedeanPosition = (
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  placedWords: PlacedWord[]
): Position | null => {
  const a = 0 
  const b = 15 
  let angle = 0
  const maxAttempts = 2000 

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Archimedean spiral formula: r = a + bθ
    const radius = a + b * angle
    const x = centerX + radius * Math.cos(angle) - width / 2
    const y = centerY + radius * Math.sin(angle) - height / 2

    const newPosition = { x, y, width, height }

    if (
      x >= 0 && 
      x + width <= centerX * 2 && 
      y >= 0 && 
      y + height <= centerY * 2 && 
      !checkCollision(newPosition, placedWords)
    ) {
      return newPosition
    }
  
    angle += 0.1
  }

  return null
}

export const findCircularPosition = (
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  placedWords: PlacedWord[]
): Position | null => {
  const maxRadius = Math.min(centerX, centerY)
  let radius = 0
  let angle = 0
  const spiralStep = 0.1

  while (radius < maxRadius) {
    const x = centerX + radius * Math.cos(angle) - width / 2
    const y = centerY + radius * Math.sin(angle) - height / 2

    const newPosition = { x, y, width, height }

    if (!checkCollision(newPosition, placedWords)) {
      return newPosition
    }

    angle += spiralStep
    radius += spiralStep
  }

  return null
}

export const findHorizontalPosition = (
  containerWidth: number,
  containerHeight: number,
  width: number,
  height: number,
  placedWords: PlacedWord[]
): Position | null => {
  const centerX = containerWidth / 2
  const centerY = containerHeight / 2
  const gridSize = 10
  const positions: Position[] = []

  for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
    for (let r = 0; r < Math.min(containerWidth, containerHeight) / 2; r += gridSize) {
      const randomizedR = r + (Math.random() - 0.5) * gridSize * 4
      const x = centerX + Math.cos(angle) * randomizedR - width / 2 + (Math.random() - 0.5) * gridSize * 2
      const y = centerY + Math.sin(angle) * (randomizedR * 0.5) - height / 2 + (Math.random() - 0.5) * gridSize * 2

      if (x >= 0 && x + width <= containerWidth && y >= 0 && y + height <= containerHeight) {
        positions.push({ x, y, width, height })
      }
    }
  }

  positions.sort(() => Math.random() - 0.5)

  for (const position of positions) {
    if (!checkCollision(position, placedWords)) {
      return position
    }
  }

  return null
}

export const findLoosePosition = (
  containerWidth: number,
  containerHeight: number,
  width: number,
  height: number,
  placedWords: PlacedWord[]
): Position | null => {
  const attempts = 100

  for (let i = 0; i < attempts; i++) {
    const x = Math.random() * (containerWidth - width)
    const y = Math.random() * (containerHeight - height)

    const newPosition = { x, y, width, height }

    if (!checkCollision(newPosition, placedWords)) {
      return newPosition
    }
  }

  return null
}

export const checkCollision = (pos1: Position, placedWords: PlacedWord[]): boolean => {
  const padding = 4; 
  return placedWords.some(pos2 => !(
    pos1.x + pos1.width + padding < pos2.x ||
    pos1.x > pos2.x + pos2.width + padding ||
    pos1.y + pos1.height + padding < pos2.y ||
    pos1.y > pos2.y + pos2.height + padding
  ))
}

