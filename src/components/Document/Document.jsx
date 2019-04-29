import React from 'react';
import Line from '../Line/Line';

import './Document.css';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      lines: null,
      wordsPerLine: null,
      lineLimit: null,
      lineRules: null // [ {lineNumber: #, wordsPerLine: #} ]
    };

    this.ingestText = this.ingestText.bind(this);
    this.lineateDocument = this.lineateDocument.bind(this);
    this.updateRule = this.updateRule.bind(this);
  }

  ingestText(event) {
    event.preventDefault();
    console.log(':. Ingesting text.');
    const text = event.target.value;
    // TODO Filter out unsafe characters
    this.setState({text});
  }

  updateRule(event) {
    event.preventDefault();
    const ruleName = event.target.id;
    const ruleValue =  event.target.value;
    console.log(':. updating rule', ruleName);
    const rule = {[ruleName]: ruleValue};
    this.setState(rule);
  }


  getWords(documentRaw) {
    const splitOnSpace = documentRaw.split(/\s/g);
    return splitOnSpace.filter(word => word.length > 0);
  }

  buildLines(words) {
    const wordsPerLine = parseInt(this.state.wordsPerLine);
    const lines = [];
    const numberOfLines = Math.ceil(words.length / wordsPerLine);
    console.log(`:. preparing ${numberOfLines} lines.`);

    for (let lineNumber = 0; lineNumber < numberOfLines; lineNumber++) {
      console.log(`:. line ${lineNumber}`);
      const sliceStartIndex = lineNumber === 0 ? 0 : lineNumber * wordsPerLine;
      const sliceEndIndex = sliceStartIndex + wordsPerLine;

      const lineWords = words.slice(sliceStartIndex, sliceEndIndex);
      lines.push(<Line words={lineWords} key={lineNumber} />);
    }
    return lines;
  }

  lineateDocument(event) {
    event.preventDefault();
    const words = this.getWords(this.state.text);
    const lines = this.buildLines(words);

    this.setState({lines});
  }

  render() {
    console.log(':. rendering document with lines', this.state.lines);
    return(
      <div>
        <section className='inputs'>
          <textarea className='text' value={this.state.text} onChange={this.ingestText} />
          <button onClick={this.lineateDocument}>Lineate</button>
          <input type='number' id='wordsPerLine' value={this.state.wordsPerLine} onChange={this.updateRule}/>
        </section>
        <section className='display'>
          { this.state.lines }
        </section>
      </div>
    );
  }
}

export default Document;