import React, { Component } from 'react';
import './App.css';

import Line from './components/Line/Line';

const wordsProps = [
  {value: 'In'},
  {value: 'the'},
  {value: 'beginning'},
  {value: 'was'},
  {value: 'the'},
  {value: 'Word'}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Line words={wordsProps} />
      </div>
    );
  }
}

export default App;
