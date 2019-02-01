import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Module from './components/Module';

class App extends Component {
  state = {
    modules: [],
    waves: []
  }

  componentDidUpdate(prevProps, prevState) {
    const { waves } = this.state;
    const n = waves.length;
    const freq = Math.floor(Math.random() * 200) + 200;
    window.audio.play = function() {
      let sum = 0;
      if (n > 0) {
        for (let i = 0; i < n; i++) {
          sum += waves[i](freq + i * 4);
        }
        this.output = sum / n * 2;
      } else {
        this.output = 0;
      }
    }
    console.log('update')
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        {
          this.state.modules.map((m, i) => <Module 
          key={i} 
          index={i} 
          onOscSet={this.handleOscSet}
          onOscWaveSelect={this.handleOscWaveSelect}
           />)
        }
        <div className={classes.addButton} onClick={this.addModule}>Add module</div>
      </div>
    );
  }

  addModule = () => {
    this.setState({
      modules: [...this.state.modules, {}]
    })
  }

  handleOscSet = (wave) => {
    this.setState({
      waves: [...this.state.waves, wave]
    }, () => console.log(this.state.waves))
  }

  handleOscWaveSelect = (wave, index) => {
    const waves = [...this.state.waves];
    waves[index] = wave;
    this.setState({
      waves
    }, () => console.log(this.state.waves))
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
