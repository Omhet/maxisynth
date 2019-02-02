import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Module from './components/Module';

class App extends Component {
  state = {
    modules: [],
    modulesNumber: 0
  }

  componentDidUpdate(prevProps, prevState) {
    const { modules, modulesNumber } = this.state;
    if (modules !== prevState.modules) {
      const n = modulesNumber;
      let module, wave, freq, mix;
      let sum = 0;
      window.audio.play = function () {
        sum = 0;
        if (n > 0) {
          for (let i = 0; i < n; i++) {
            module = modules[i];
            wave = module.wave;
            freq = module.freq;
            mix = module.mix;

            sum += wave(freq) * mix;
          }
          this.output = sum / n * 2;
        } else {
          this.output = 0;
        }
        // this.output = 0;
      }
      console.log('update')
    }
  }

  render() {
    const { classes } = this.props;
    const { modulesNumber } = this.state;

    return (
      <div className={classes.app}>
        {
          Array.apply(null, Array(modulesNumber)).map((m, i) => <Module
            key={i}
            index={i}
            onOscSet={this.handleOscSet}
            onWaveChange={this.handleWaveChange}
            onFreqChange={this.handleFreqChange}
            onMixChange={this.handleMixChange}
          />)
        }
        <div className={classes.addButton} onClick={this.addModule}>Add module</div>
      </div>
    );
  }

  addModule = () => {
    this.setState({
      modulesNumber: this.state.modulesNumber + 1
    })
  }

  handleOscSet = (wave, waveName, freq, mix) => {
    const modules = [...this.state.modules];
    modules.push({ wave, waveName, freq, mix })
    this.setState({
      modules
    })
  }

  handleWaveChange = (wave, waveName, index) => {
    const modules = [...this.state.modules];
    const module = modules[index];
    if (module.waveName !== waveName) {
      module.wave = wave;
      module.waveName = waveName;
      this.setState({
        modules
      })
    }
  }

  handleFreqChange = (freq, index) => {
    const modules = [...this.state.modules];
    modules[index].freq = Number(freq);
    this.setState({
      modules
    })
  }

  handleMixChange = (mix, index) => {
    const modules = [...this.state.modules];
    modules[index].mix = Number(mix);
    this.setState({
      modules
    })
  }
}

const style = {
  app: {
    display: 'flex',
    flexDirection: 'column'
  },
  addButton: {
    cursor: 'pointer',
    color: '#eeeeee',
    textAlign: 'center',
    borderRadius: '0.5rem',
    marginTop: '2rem',
    border: '1px solid #393e46',
    padding: '1rem 2rem',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)',
    userSelect: 'none',
    '&:hover': {
      boxShadow: '0 1px 3px rgba(78, 204, 163, 0.46)'
    }
  }
}

export default injectSheet(style)(App);
