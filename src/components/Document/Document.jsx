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

  getWordComponents(words) {
    const wordComponents = [];

    for (const word of words) {
      wordComponents.push(<Word value={word} />);
    }

    return wordComponents
  }

  getLineComponents(wordComponents, options) {
    const { wordsPerLine } = options;
    const totalLength = wordComponents.length;
    // TODO move fail-check to earliest opportunity
    const linesCanBeWritten = true;

    if (!linesCanBeWritten) {
      return null 
    } else {
      const lineComponents = [];
      let line = [];
      let key = 0;
      for (const wordComponent of wordComponents) {
        if (line.length <= wordsPerLine) {
          if (line.length === wordsPerLine) {
            console.log('finished line', line);
            lineComponents.push(<Line words={line} key={key} />);
            line = [];
            key++;
          } else {
            line.push(wordComponent);
          }
        } else {
          line = [];
        }
      }
      console.log('lineComponents', lineComponents);
      return lineComponents;
    }
  }

  lineateDocument(documentRaw, options) {
    const words = this.getWords(documentRaw);
    const wordComponents = this.getWordComponents(words);
    const lineComponents = this.getLineComponents(wordComponents, options);

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

    console.log('lineCOmponents', lineComponents);


    return(
      <div>
        { lineComponents }
      </div>
    );
  }
}

export default Document;