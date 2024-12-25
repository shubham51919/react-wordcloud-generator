import React from 'react';
import ReactWordcloud from './ReactWordcloud';

const App = () => {
  const sampleWords = [
    { text: "React", value: 100 },
    { text: "JavaScript", value: 90 },
    { text: "TypeScript", value: 80 },
    { text: "WordCloud", value: 70 },
    { text: "Programming", value: 60 },
    { text: "Development", value: 50 },
    { text: "Frontend", value: 40 },
    { text: "Backend", value: 30 },
    { text: "Design", value: 20 },
    { text: "Code", value: 10 },
  ];

  return (
    <div>
      <ReactWordcloud words={sampleWords} width={1200} height={600} />
    </div>
  );
};

export default App;
