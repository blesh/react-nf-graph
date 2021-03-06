import React, { Component } from 'react';
import applyStyles from 'react-css-modules';
import styles from './IndexPage.less';
import { autobind } from 'core-decorators';
import NfGraph from '../../components/NfGraph';
import NfGraphContent from '../../components/NfGraphContent';
import NfLine from '../../components/NfLine';
import NfXAxis from '../../components/NfXAxis';
import NfYAxis from '../../components/NfYAxis';
import NfTracker from '../../components/NfTracker';
import NfArea from '../../components/NfArea';

export default
@applyStyles(styles)
class IndexPage extends Component {
  @autobind
  didClick() {
    alert('you clicked me!');
  }

  render() {
    let myData = [];
    for(let i = 0; i < 10; i++) {
      myData.push({ x: i, y: Math.random() * 10 });
    }

    return (
      <NfGraph marginBottom={20} marginLeft={80}>
        <NfGraphContent>
          <NfLine data={myData}/>
          <NfTracker data={myData} behavior="snap-last"/>
        </NfGraphContent>
        <NfXAxis template={(tick) => <text>{tick}</text>}/>
        <NfYAxis template={(tick) => <text>{tick}</text>}/>
      </NfGraph>
    );
  }
}
