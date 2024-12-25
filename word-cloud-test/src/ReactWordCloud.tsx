import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Word, PlacedWord, Options, Callbacks } from './utils/wordCloudUtils';
import WordCloudCanvas from './components/WordCloudCanvas';
import WordCloudTooltip, { TooltipStyles } from './components/WordCloudTooltip';

export interface ReactWordcloudProps {
  words: Word[];
  width?: number | string;
  height?: number | string;
  options?: Options;
  callbacks?: Callbacks;
  tooltipStyles?: TooltipStyles;
  renderTooltip?: (word: PlacedWord) => React.ReactNode;
  minFontSize?: number;
  maxFontSize?: number;
  shape?: 'circular' | 'horizontal' | 'loose' | 'archimedean';
  colors?: string[];
}

const ReactWordcloud: React.FC<ReactWordcloudProps> = ({
  words,
  width = '100%',
  height = '100%',
  options = {},
  callbacks = {},
  tooltipStyles,
  renderTooltip,
  minFontSize = 5,
  maxFontSize = 30,
  shape = 'circular',
  colors = ['#1e3a8a', '#3b82f6', '#93c5fd', '#bfdbfe']
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([])
  const [hoveredWord, setHoveredWord] = useState<PlacedWord | null>(null)

  const {
    getWordColor = (word: Word) => {
      return colors[Math.floor(Math.random() * colors.length)]
    },
    onWordClick = () => {},
    onWordMouseOver = () => {},
  } = callbacks

  const sortedWords = useMemo(() => {
    return [...words].sort((a, b) => b.value - a.value)
  }, [words])

  const handleWordsPlaced = useCallback((newPlacedWords: PlacedWord[]) => {
    setPlacedWords(newPlacedWords)
  }, [])

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const word = placedWords.find(word =>
      x >= word.x && x <= word.x + word.width &&
      y >= word.y && y <= word.y + word.height
    )

    if (word) {
      onWordMouseOver(word)
    }
    setHoveredWord(word || null)
  }, [placedWords, onWordMouseOver])

  const handleMouseLeave = useCallback(() => {
    setHoveredWord(null)
  }, [])

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const word = placedWords.find(word =>
      x >= word.x && x <= word.x + word.width &&
      y >= word.y && y <= word.y + word.height
    )

    if (word) {
      onWordClick(word)
    }
  }, [placedWords, onWordClick])

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const getWordFontWeight = (value: number) => {
    const minWeight = 300
    const maxWeight = 700
    const maxValue = Math.max(...words.map(w => w.value))
    return Math.floor(minWeight + ((value / maxValue) * (maxWeight - minWeight)))
  }

  if (sortedWords.length === 0) {
    return (
      <div
        ref={containerRef}
        className="flex items-center justify-center border border-gray-200 rounded-lg bg-white text-gray-500"
        style={{ width, height }}
      >
        No words to display
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative border border-gray-200 rounded-lg bg-white overflow-hidden min-h-[400px]"
      style={{ 
        width, 
        height, 
        position: 'relative',
        padding: '10px' 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <WordCloudCanvas
        words={sortedWords}
        width={containerSize.width - 20} 
        height={containerSize.height - 20} 
        shape={shape}
        onWordsPlaced={handleWordsPlaced}
        minFontSize={minFontSize}
        maxFontSize={maxFontSize}
      />
      {hoveredWord && (
        <div 
          className="absolute inset-0 bg-white/50 transition-opacity duration-200"
          style={{ zIndex: 5 }}
        />
      )}
      {placedWords.map((word) => (
        <div
          key={word.text}
          className="absolute transition-all duration-300 ease-in-out select-none"
          style={{
            left: `${word.x}px`,
            top: `${word.y}px`,
            fontSize: `${word.fontSize}px`,
            fontWeight: getWordFontWeight(word.value),
            color: getWordColor(word),
            transform: hoveredWord?.text === word.text ? 'scale(1.05)' : 'scale(1)',
            zIndex: hoveredWord?.text === word.text ? 10 : 1,
            opacity: hoveredWord ? (hoveredWord.text === word.text ? 1 : 0.3) : 1,
            transition: 'all 0.3s ease-in-out',
            position: 'absolute',
            cursor: 'pointer',
            userSelect: 'none',
            letterSpacing: '0.02em', 
            lineHeight: '1.1',
            whiteSpace: 'nowrap'
          }}
        >
          {word.text}
        </div>
      ))}
      <WordCloudTooltip 
        hoveredWord={hoveredWord} 
        renderTooltip={renderTooltip}
        styles={tooltipStyles}
      />
    </div>
  )
}

export default ReactWordcloud

