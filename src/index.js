import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { maxim } from './helpers';

const audio = new maxim.maxiAudio();
window.audio = audio;
audio.init();
    audio.play = function() {
      this.output = 0;
    };

ReactDOM.render(<App />, document.getElementById('root'));