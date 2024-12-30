# react-wordcloud-generator

React Wordcloud Generator is a customizable and interactive word cloud generator built with React. It enables developers to display words with sizes proportional to their values in a variety of shapes, with interactivity for mouse hover and clicks.



## Installation

```bash
npm install react-wordcloud-generator
```
![](https://github.com/shubham51919/react-wordcloud-generator/raw/main/word-cloud-test/src/assets/WordCloud1.png)

## Usage

Here is an example of how to use the `ReactWordcloud` component:

```tsx
import React from 'react'
import { ReactWordcloud } from 'react-wordcloud-generator'

const words = [
   { text: 'React', value: 100 },
  { text: 'JavaScript', value: 80 },
  { text: 'TypeScript', value: 75 },
  { text: 'Frontend', value: 60 },
  { text: 'Node.js', value: 50 },
  { text: 'CSS', value: 45 },
  { text: 'HTML', value: 40 },
  { text: 'Web Development', value: 30 },
  { text: 'APIs', value: 25 },
  { text: 'GitHub', value: 20 },
  { text: 'UI/UX', value: 18 },
  { text: 'Programming', value: 15 }
]

const MyComponent = () => {
  return (
    <ReactWordcloud
      words={words}
      width={800}
      height={600}
      minFontSize={10}
      maxFontSize={50}
      shape="horizontal"
      colors={['#1e3a8a', '#3b82f6', '#93c5fd', '#bfdbfe']}
      callbacks={{
        onWordClick: (word) => console.log('Clicked:', word),
        onWordMouseOver: (word) => console.log('Hovered:', word),
      }}
    />
  )
}

export default MyComponent
```
![](https://github.com/shubham51919/react-wordcloud-generator/raw/main/word-cloud-test/src/assets/WordCloud2.png) 

## Props

### Required Props

| Prop    | Type     | Description                                                |
| ------- | -------- | ---------------------------------------------------------- |
| `words` | `Word[]` | Array of words to display, each with a `text` and `value`. |

### Optional Props

| Prop            | Type                                                     | Default                                        | Description                                              |                                     |
| --------------- | -------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------- | ----------------------------------- |
| `width`         | \`number                                                 | string\`                                       | `'100%'`                                                 | Width of the word cloud container.  |
| `height`        | \`number                                                 | string\`                                       | `'100%'`                                                 | Height of the word cloud container. |
| `shape`         | `'circular' \| 'horizontal' \| 'loose' \| 'archimedean'` | `'circular'`                                   | Shape of the word cloud layout.                          |                                     |
| `minFontSize`   | `number`                                                 | `5`                                            | Minimum font size for the words.                         |                                     |
| `maxFontSize`   | `number`                                                 | `30`                                           | Maximum font size for the words.                         |                                     |
| `options`       | `Options`                                                | `{}`                                           | Additional configuration options for advanced use cases. |                                     |
| `callbacks`     | `Callbacks`                                              | `{}`                                           | Event handlers for word interactions.                    |                                     |
| `tooltipStyles` | `TooltipStyles`                                          | `{}`                                           | Styles for the tooltip displayed on hover.               |                                     |
| `renderTooltip` | `(word: PlacedWord) => ReactNode`                        | `undefined`                                    | Custom function to render a tooltip for a word.          |                                     |
| `colors`        | `string[]`                                               | `['#1e3a8a', '#3b82f6', '#93c5fd', '#bfdbfe']` | Array of colors for the words.                           |                                     |

### **Word Interface**

```ts
interface Word {
  text: string; // The word to display
  value: number; // The weight or importance of the word
}
```

### Callbacks Interface

```ts
interface Callbacks {
  onWordClick?: (word: PlacedWord) => void; // Function triggered on word click
  onWordMouseOver?: (word: PlacedWord) => void; // Function triggered on word hover
}
```

### TooltipStyles Interface

```ts
interface TooltipStyles {
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  padding?: string;
  boxShadow?: string;
}
```

## Features

- Customizable shapes (`circular`, `horizontal`, `loose`, `archimedean`).
- Configurable font sizes and colors.
- Interactive events (hover and click).
- Responsive layout.
- Custom tooltip rendering.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to contribute or report issues to improve this package! Happy coding! 🎉

