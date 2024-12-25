import React from 'react'
import { PlacedWord } from '../utils/wordCloudUtils'

export interface TooltipStyles {
  container?: React.CSSProperties
  content?: React.CSSProperties
  backgroundColor?: string
  textColor?: string
  borderRadius?: string
  padding?: string
  boxShadow?: string
}

interface WordCloudTooltipProps {
  hoveredWord: PlacedWord | null
  renderTooltip?: (word: PlacedWord) => React.ReactNode
  styles?: TooltipStyles
}

const WordCloudTooltip: React.FC<WordCloudTooltipProps> = ({
  hoveredWord,
  renderTooltip,
  styles = {}
}) => {
  if (!hoveredWord) return null

  const defaultStyles: TooltipStyles = {
    container: {
      position: 'absolute',
      left: `${hoveredWord.x + hoveredWord.width}px`,
      top: `${hoveredWord.y - 20}px`,
      transform: 'translateX(-50%)',
      zIndex: 50,
      ...styles.container
    },
    content: {
      backgroundColor: styles.backgroundColor || '#f3f4f6',
      color: styles.textColor || '#1f2937',
      borderRadius: styles.borderRadius || '9999px',
      padding: styles.padding || '1rem',
      boxShadow: styles.boxShadow || '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      ...styles.content
    }
  }

  if (renderTooltip) {
    return (
      <div style={defaultStyles.container}>
        {renderTooltip(hoveredWord)}
      </div>
    )
  }

  return (
    <div style={defaultStyles.container}>
      <div style={defaultStyles.content}>

        <button className="bg-gray-900 text-[black] px-4 py-2 rounded-full text-sm font-medium">
          {hoveredWord.value}
        </button>
      </div>
    </div>
  )
}

export default WordCloudTooltip

