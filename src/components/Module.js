import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Knob from './Knob';
import { maxim } from '../helpers';

class Module extends Component {
    state = {
        osc: new maxim.maxiOsc(),
        lfo: new maxim.maxiOsc(),
        wave: null,
    };
    waveNames = ['sinewave', 'triangle', 'sawn', 'square'];
    initialFreq = 171;
    initialMix = 0.2;
    initialLFOFreq = 1;

    componentDidMount() {
        const waveName = this.waveNames[0];
        const wave = this.state.osc[waveName];
        const lfoName = this.waveNames[0];
        const lfo = this.state.lfo[waveName];
        this.setState({
            wave
        }, this.props.onOscSet(wave.bind(this.state.osc),
            waveName,
            this.initialFreq,
            this.initialMix,
            lfo.bind(this.state.lfo),
            lfoName,
            this.initialLFOFreq))
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.module}>
                <Knob
                    initial={0}
                    min={0}
                    max={3}
                    step={1}
                    label="Wave"
                    guideTicks={this.waveNames.length}
                    wave={true}
                    color="#4ecca3"
                    dragResistance={100}
                    onChange={this.handleWaveChange} />
                <Knob
                    initial={this.initialFreq}
                    min={0}
                    max={600}
                    step={1}
                    label="Frequency"
                    color="#4ecca3"
                    dragResistance={200}
                    onChange={this.handleFreqChange} />
                <Knob
                    initial={0}
                    min={0}
                    max={3}
                    step={1}
                    label="LFO"
                    color="#4ecca3"
                    dragResistance={100}
                    wave={true}
                    guideTicks={this.waveNames.length}
                    onChange={this.handleLFOWaveChange} />
                <Knob
                    initial={this.initialLFOFreq}
                    min={0}
                    max={300}
                    step={1}
                    label="LFO Frequency"
                    color="#4ecca3"
                    dragResistance={200}
                    onChange={this.handleLFOFreqChange} />
                <Knob
                    initial={this.initialMix}
                    min={0}
                    max={0.3}
                    step={0.01}
                    label="Mix"
                    color="#4ecca3"
                    dragResistance={200}
                    onChange={this.handleMixChange} />
            </div>
        );
    }

    handleWaveChange = (value) => {
        const waveName = this.waveNames[value];
        const wave = this.state.osc[waveName];
        this.props.onWaveChange(wave.bind(this.state.osc), waveName, this.props.index);
    };

    handleLFOWaveChange = (value) => {
        const waveName = this.waveNames[value];
        const wave = this.state.lfo[waveName];
        this.props.onLFOWaveChange(wave.bind(this.state.lfo), waveName, this.props.index);
    };

    handleFreqChange = (value) => {
        this.props.onFreqChange(value, this.props.index)
    };

    handleLFOFreqChange = (value) => {
        this.props.onLFOFreqChange(value, this.props.index)
    };

    handleMixChange = (value) => {
        this.props.onMixChange(value, this.props.index)
    }
}

const style = {
    module: {
        backgroundColor: '#393e46',
        color: '#eeeeee',
        flex: '1 0 8rem',
        justifyContent: 'space-around',
        alignItems: 'center',
        display: 'flex',
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)',
        margin: '0.5rem 0'
    }
};

export default injectSheet(style)(Module);