import React, { useEffect, useCallback } from 'react'
import {
  Word,
  PlacedWord,
  findCircularPosition,
  findHorizontalPosition,
  findLoosePosition,
  findArchimedeanPosition
} from '../utils/wordCloudUtils'

interface WordCloudCanvasProps {
  words: Word[]
  width: number
  height: number
  shape: 'circular' | 'horizontal' | 'loose' | 'archimedean'
  onWordsPlaced: (words: PlacedWord[]) => void
  minFontSize: number
  maxFontSize: number
}

const WordCloudCanvas: React.FC<WordCloudCanvasProps> = ({
  words,
  width,
  height,
  shape,
  onWordsPlaced,
  minFontSize,
  maxFontSize,
}) => {
  const calculateLayout = useCallback(() => {
    if (width === 0 || height === 0) return

    const centerX = width / 2
    const centerY = height / 2
    const maxValue = Math.max(...words.map(w => w.value))
    const newPlacedWords: PlacedWord[] = []

    const calculateFontSize = (value: number) => {
      const scale = (value / maxValue);
      return Math.max(minFontSize, Math.min(maxFontSize, minFontSize + (scale * (maxFontSize - minFontSize))));
    }

    const calculateWordDimensions = (word: Word, fontSize: number) => {
      const letterSpacing = 0.02;
      const wordWidth = fontSize * (word.text.length * (0.55 + letterSpacing));
      const wordHeight = fontSize * 1.1;
      return { width: wordWidth, height: wordHeight };
    }

    const sortedWords = [...words].sort((a, b) => b.value - a.value)

    sortedWords.forEach((word) => {
      const fontSize = calculateFontSize(word.value)
      const { width: wordWidth, height: wordHeight } = calculateWordDimensions(word, fontSize)

      let position = null
      let attempts = 0
      const maxAttempts = 100

      while (!position && attempts < maxAttempts) {
        if (shape === 'circular') {
          position = findCircularPosition(centerX, centerY, wordWidth, wordHeight, newPlacedWords)
        } else if (shape === 'horizontal') {
          position = findHorizontalPosition(width, height, wordWidth, wordHeight, newPlacedWords)
        } else if (shape === 'loose') {
          position = findLoosePosition(width, height, wordWidth, wordHeight, newPlacedWords)
        } else if (shape === 'archimedean') {
          position = findArchimedeanPosition(centerX, centerY, wordWidth, wordHeight, newPlacedWords)
        }
        attempts++
      }

      if (position) {
        newPlacedWords.push({ ...word, ...position, fontSize })
      }
    })

    onWordsPlaced(newPlacedWords)
  }, [words, width, height, shape, onWordsPlaced, minFontSize, maxFontSize])

  useEffect(() => {
    calculateLayout()
  }, [calculateLayout, width, height])

  return null
}

export default WordCloudCanvas

