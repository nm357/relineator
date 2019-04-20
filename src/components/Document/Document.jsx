import React from 'react';

import Word from '../Word/Word';
import Line from '../Line/Line';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.lineateDocument = this.lineateDocument.bind(this);
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

      lines.push(words.slice(sliceStartIndex, sliceEndIndex));
    }
    return lines;
  }

  lineateDocument(documentRaw, options) {
    const words = this.getWords(documentRaw);
    const lineComponents = this.buildLines(words, options);

    return lineComponents;
  }

  render() {
    console.log('hello from Document');
    const documentRaw = `In the beginning was the Word, 
      and the Word was with God, and the Word was God. 
      He was in the beginning with God. All things came into being through him, 
      and without him not one thing came into being. 
      What has come into being in him was life, and the life was the light of all people. 
      The light shines in the darkness, and the darkness did not overcome it.`

    const lineComponents = this.lineateDocument(documentRaw, { wordsPerLine: 5 });

    console.log('lines', lineComponents);


    return(
      <div>
        { lineComponents }
      </div>
    );
  }
}

export default Document;