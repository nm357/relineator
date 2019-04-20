import React, { Component } from 'react';
import './App.css';

import Line from './components/Line/Line';
import Document from './components/Document/Document';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Document />
      </div>
    );
  }
}

export default App;
