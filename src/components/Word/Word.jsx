import React from 'react';

import './Word.css';

const Word = props => {
  return <div className='word'>{props && props.word}</div>;
};

export default Word;
