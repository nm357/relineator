import React from 'react';
import Line from '../Line/Line';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      lines: null
    };

    this.ingestText = this.ingestText.bind(this);
    this.lineateDocument = this.lineateDocument.bind(this);
  }

  ingestText(event) {
    event.preventDefault();
    console.log(':. Ingesting text.');
    const text = event.target.value;
    // TODO Filter out unsafe characters
    this.setState({text});
  }


  getWords(documentRaw) {
    const splitOnSpace = documentRaw.split(/\s/g);
    return splitOnSpace.filter(word => word.length > 0);
  }

  buildLines(words, options) {
    const { wordsPerLine } = options;
    const lines = [];
    const numberOfLines = Math.ceil(words.length / wordsPerLine);
    console.log(`Preparing ${numberOfLines} lines.`);

    for (let lineNumber = 0; lineNumber < numberOfLines; lineNumber++) {
      const sliceStartIndex = lineNumber === 0 ? 0 : lineNumber * wordsPerLine;
      const sliceEndIndex = sliceStartIndex + wordsPerLine;

      const lineWords = words.slice(sliceStartIndex, sliceEndIndex);
      
      lines.push(<Line words={lineWords} />);
    }
    return lines;
  }

  lineateDocument(event) {
    event.preventDefault();
    console.log(':. lineateDocument event', event);
    const words = this.getWords(this.state.text);
    const lines = this.buildLines(words, { wordsPerLine: 7 }); // TODO add options input

    this.setState({lines});
  }

  render() {
    console.log(':. rendering document with lines', this.state.lines);
    return(
      <div>
        <section>
          <textarea value={this.state.text} onChange={this.ingestText} />
          <button onClick={this.lineateDocument}>Lineate</button>
        </section>
        <section>
          { this.state.lines }
        </section>
      </div>
    );
  }
}

export default Document;