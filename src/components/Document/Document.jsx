import React from 'react';
import Line from '../Line/Line';
import InputField from '../InputField/InputField';

import './Document.css';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      lines: null,
      wordsPerLine: null,
      isRandom: false
    };

    this.ingestText = this.ingestText.bind(this);
    this.lineateDocument = this.lineateDocument.bind(this);
    this.updateRule = this.updateRule.bind(this);
  }

  ingestText(event) {
    event.preventDefault();
    const text = event.target.value;
    // TODO Filter out unsafe characters
    this.setState({text});
  }

  updateRule(event) {
    event.preventDefault();
    const ruleName = event.target.id;
    const ruleValue =  event.target.value;
    const rule = {[ruleName]: ruleValue};
    this.setState(rule);
  }


  getWords(documentRaw) {
    const splitOnSpace = documentRaw.split(/\s/g);
    return splitOnSpace.filter(word => word.length > 0);
  }

  buildLines(words, wordsPerLine) {
    const lines = [];
    const totalWords = words.length;
    
    if (wordsPerLine > 0) {
      for (let startIndex = 0; startIndex < totalWords;) {
        const endIndex = startIndex + wordsPerLine;
        const lineWords = words.slice(startIndex, endIndex);
        lines.push(<Line words={lineWords} />);

        startIndex = endIndex;
      }
    } else {
      this.buildRandomLines(words, 10);
    }
    return lines;
  }

  buildRandomLines(words, wordsPerLine) {
    const lines = [];
    const totalWords = words.length;
     
    for (let startIndex = 0; startIndex < totalWords;) {
      const randomArray = Math.ceil(Math.random() * 10000).toString().split('');
      let currentLineLength = parseInt(randomArray.reduce((sum, nextNumber) => parseInt(sum + parseInt(nextNumber))));

      while (currentLineLength >= wordsPerLine) {
        currentLineLength = Math.ceil(currentLineLength / Math.ceil(Math.random() * 10));
      }
      
      const endIndex = startIndex + currentLineLength;
      const lineWords = words.slice(startIndex, endIndex);
      lines.push(<Line words={lineWords} lineKey={`${startIndex}-${endIndex}`} />);

      startIndex = endIndex;
    }

    return lines;
  }

  lineateDocument(event) {
    event.preventDefault();
    const words = this.getWords(this.state.text);
    const wordsPerLine = parseInt(!this.state.wordsPerLine ? Math.ceil(Math.random()*33) : this.state.wordsPerLine);

    let lines;
    if (this.state.isRandom) {
      lines = this.buildRandomLines(words, wordsPerLine);
    } else {
      lines = this.buildLines(words, wordsPerLine);
    }

    this.setState({lines});
  }

  render() {
    return(
      <div>
        <section className='inputs'>
          <textarea className='text' value={this.state.text} onChange={this.ingestText} />
          <button onClick={this.lineateDocument}>Lineate</button>
          <InputField 
            id={'wordsPerLine'}
            type={'number'}
            value={this.state.wordsPerLine}
            handleChange={this.updateRule}
          />
          <InputField 
            id={'isRandom'}
            type={'checkbox'}
            value={this.state.isRandom}
            handleChange={() => this.setState({isRandom: !this.state.isRandom})}
          />
        </section>
        <section className='display'>
          { this.state.lines }
        </section>
      </div>
    );
  }
}

export default Document;