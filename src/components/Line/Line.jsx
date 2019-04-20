import React from 'react';
import Word from '../Word/Word';

import './Line.css';

const Line = (props) => {
  const lineate = (words) => {
    const line = [];
    for (let word of words) {
      line.push(<Word word={word} />);
    }

    return line;
  };

  return(
    <div>
      {props.words && lineate(props.words)}
    </div>
  );
};

export default Line;
