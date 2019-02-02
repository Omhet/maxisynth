import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Knob from './Knob';
import { maxim } from '../helpers';

class Module extends Component {
    state = {
        osc: new maxim.maxiOsc(),
        wave: null,
    }
    waveNames = ['sinewave', 'triangle', 'sawn', 'square']
    initialFreq = 100
    initialMix = 0.2

    componentDidMount() {
        const waveName = this.waveNames[0];
        const wave = this.state.osc[waveName];
        this.setState({
            wave
        }, this.props.onOscSet(wave.bind(this.state.osc), waveName, this.initialFreq, this.initialMix))
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
                    color="#4ecca3"
                    onChange={this.handleWaveChange} />
                <Knob
                    initial={this.initialFreq}
                    min={0}
                    max={600}
                    step={1}
                    label="Frequency"
                    color="#4ecca3"
                    onChange={this.handleFreqChange} />
                <Knob
                    initial={this.initialMix}
                    min={0}
                    max={0.3}
                    step={0.01}
                    label="Mix"
                    color="#4ecca3"
                    onChange={this.handleMixChange} />
            </div>
        );
    }

    handleWaveChange = (value) => {
        const waveName = this.waveNames[value];
        const wave = this.state.osc[waveName];
        this.props.onWaveChange(wave.bind(this.state.osc), waveName, this.props.index);
    }

    handleFreqChange = (value) => {
        this.props.onFreqChange(value, this.props.index)
    }

    handleMixChange = (value) => {
        this.props.onMixChange(value, this.props.index)
    }
}

const style = {
    module: {
        backgroundColor: '#393e46',
        color: '#eeeeee',
        flex: '1 0 15rem',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)',
        margin: '0.5rem 0'
    }
}

export default injectSheet(style)(Module);