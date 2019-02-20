import React, {Component} from 'react';
import injectSheet from 'react-jss';
import Module from './components/Module';
import Visualizer from './components/Visualizer';
import {keysToNotesMap, maxim} from './helpers';
import Tabs from "./components/Tabs";

class App extends Component {
    state = {
        modules: [],
        modulesNumber: 0,
        mode: 'tweak'
    };

    modes = ['tweak', 'play'];

    notesModulesMap = {};

    render() {
        const {classes} = this.props;
        const {modulesNumber} = this.state;

        const buttonText = modulesNumber > 0 ? 'Add module' : 'Start tweaking';

        return (
            <div className={classes.app}>
                <Visualizer/>
                {modulesNumber > 0 ?
                    <Tabs value={this.state.mode} onChange={this.handleModeChange} tabs={this.modes} />
                    : null}
                <div className={classes.container}>
                    {
                        Array.apply(null, Array(modulesNumber)).map((m, i) => <Module
                            key={i}
                            index={i}
                            onOscSet={this.handleOscSet}
                            onWaveChange={this.handleWaveChange}
                            onFreqChange={this.handleFreqChange}
                            onLFOFreqChange={this.handleLFOFreqChange}
                            onLFOWaveChange={this.handleLFOWaveChange}
                            onMixChange={this.handleMixChange}
                        />)
                    }
                    <div className={classes.addButton} onClick={this.addModule}>{buttonText}</div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }


    componentDidUpdate(prevProps, prevState) {
        const {modules, modulesNumber, mode } = this.state;
        if (modules !== prevState.modules) {
            const n = modulesNumber;
            let module, wave, freq, mix, lfo, lfoFreq, play;
            let sum = 0;
            let counter = 0;
            if (this.audio) {
                if (mode === 'tweak') {
                    this.audio.play = function () {
                        counter++;
                        sum = 0;

                        if (n > 0) {
                            for (let i = 0; i < n; i++) {
                                module = modules[i];
                                wave = module.wave;
                                freq = module.freq;
                                lfo = module.lfo;
                                lfoFreq = module.lfoFreq;
                                mix = module.mix;

                                sum += (wave(freq) * lfo(lfoFreq)) * mix;
                            }
                            this.output = (sum / n * 2) * 0.6;
                            window.drawOutput[counter % 1024] = sum / n * 2;
                        }
                    }
                } else if (mode === 'play') {
                    this.audio.play = function () {
                        counter++;
                        sum = 0;

                        if (n > 0) {
                            for (let i = 0; i < n; i++) {
                                module = modules[i];
                                wave = module.wave;
                                freq = module.freq;
                                lfo = module.lfo;
                                lfoFreq = module.lfoFreq;
                                mix = module.mix;
                                play = module.play;

                                sum += (wave(freq) * (lfo(lfoFreq) * play)) * mix;
                            }
                            this.output = (sum / n * 2) * 0.6;
                            window.drawOutput[counter % 1024] = sum / n * 2;
                        }
                    }
                }
            }
        }
    }

    handleKeyDown = (e) => {
        const { modules, modulesNumber } = this.state;
        const notesModulesMap = this.notesModulesMap;

        if (modulesNumber > 0) {
            const key = e.keyCode;
            const note = keysToNotesMap[key];
            if (note && notesModulesMap[note] === undefined) {

                // console.log(note)

                for (let i in modules) {
                    if (modules[i].play === 0 || modules[i].play === undefined) {
                        notesModulesMap[note] = i;
                        this.handleNoteChange(note, 1, i);
                        return;
                    }
                }
            }
        }
    };

    handleKeyUp = (e) => {
        const { modulesNumber } = this.state;
        const notesModulesMap = this.notesModulesMap;

        if (modulesNumber > 0) {
            const key = e.keyCode;
            const note = keysToNotesMap[key];

            if (note && notesModulesMap[note] !== undefined) {
                const i = notesModulesMap[note];
                this.handleNoteChange(0, 0, i);
                notesModulesMap[note] = undefined;
            }
        }
    };

    handleModeChange = mode => {
        if (mode !== this.state.mode) {
            if (mode === 'tweak') {
                this.state.modules.forEach((m, i) => this.handleNoteChange(171, 1, i));
            } else if (mode === 'play') {
                this.state.modules.forEach((m, i) => this.handleNoteChange(0, 0, i));
            }
            this.setState({ mode });
        }
    };

    addModule = () => {
        if (this.state.modulesNumber === 0) {
            this.setUpAudio();
        }

        this.setState({
            modulesNumber: this.state.modulesNumber + 1
        })
    };

    setUpAudio = () => {
        if (!this.audio) {
            window.drawOutput = [];
            this.audio = new maxim.maxiAudio();
            this.audio.init();
            this.audio.play = function () {
                this.output = 0;
            };
        }
    };

    handleOscSet = (wave, waveName, freq, mix, lfo, lfoName, lfoFreq) => {
        const modules = [...this.state.modules];
        modules.push({wave, waveName, freq, mix, lfo, lfoName, lfoFreq})
        this.setState({
            modules
        })
    };

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
    };

    handleFreqChange = (freq, index) => {
        const modules = [...this.state.modules];
        modules[index].freq = Number(freq);
        this.setState({
            modules
        })
    };

    handleNoteChange = (freq, play, index) => {
        const modules = [...this.state.modules];
        modules[index].freq = Number(freq);
        modules[index].play = play;
        this.setState({
            modules
        })
    };

    handleLFOFreqChange = (lfoFreq, index) => {
        const modules = [...this.state.modules];
        modules[index].lfoFreq = Number(lfoFreq);
        this.setState({
            modules
        })
    };

    handleMixChange = (mix, index) => {
        const modules = [...this.state.modules];
        modules[index].mix = Number(mix);
        this.setState({
            modules
        })
    };

    handleLFOWaveChange = (lfo, lfoName, index) => {
        const modules = [...this.state.modules];
        const module = modules[index];
        if (module.lfoName !== lfoName) {
            module.lfo = lfo;
            module.lfoName = lfoName;
            this.setState({
                modules
            })
        }
    }
}

const style = {
    app: {},
    container: {
        margin: '0 auto',
        maxWidth: '900px',
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
};

export default injectSheet(style)(App);
