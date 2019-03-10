import React from 'react';
import Word from '../Word/Word';

import './Line.css';

const Line = (props) => {
  const lineate = (words) => {
    let line = [];
    let keyNum = 0;

    for (let word of words) {
      line.push(<Word value={word.value} key={keyNum}/>);

      keyNum++;
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
