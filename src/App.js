import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Word from './components/Word/Word';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div id="word-container">
            <Word value={'Hello, Word!'} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
