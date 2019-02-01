import React, { Component } from 'react';
import Module from './components/Module';
import { maxim } from './helpers';

class App extends Component {
  state = {
    audio: new maxim.maxiAudio(),
    osc: new maxim.maxiOsc(),
    count: 0
  }

  componentDidMount() {
    const { audio, osc, output, play } = this.state;
    

    console.log(audio)
  }

  componentDidUpdate(prevProps, prevState) {
    const { osc } = this.state;
    const freq = Math.floor(Math.random() * 200) + 200;
    window.audio.play = function() {
      this.output = osc.sinewave(freq)
    }
    console.log('update')
  }

  render() {
    return (
      <div>
        <Module />
        <button onClick={() => this.setState({count: this.state.count + 1})}>Click</button>
      </div>
    );
  }

}

export default App;
