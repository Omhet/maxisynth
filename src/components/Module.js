import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Knob from './Knob';
import { maxim } from '../helpers';

class Module extends Component {
    state = {
        osc: new maxim.maxiOsc(),
        wave: null,
        waveName: 'sinewave'
    }
    initialFreq = 100
    initialMix = 0.2

    componentDidMount() {
        const wave = this.state.osc.sinewave;
        this.setState({
            wave
        }, this.props.onOscSet(wave.bind(this.state.osc), this.initialFreq, this.initialMix))
    }

    render() {
        const { classes } = this.props;
        // const { waveName } = this.state;
        return (
            <div className={classes.module}>
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

    handleFreqChange = (value) => {
        this.props.onFreqChange(value, this.props.index)
    }

    handleMixChange = (value) => {
        this.props.onMixChange(value, this.props.index)
    }

    handleOscWaveSelect = (event, value) => {
        const waveName = value;
        const wave = this.state.osc[waveName];
        this.setState({
            wave,
            waveName
        }, this.props.onOscWaveSelect(wave.bind(this.state.osc), this.props.index))
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
    },
    freq: {
        // width: '2rem',
        // height: '2rem'
    }
}

export default injectSheet(style)(Module);