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

    componentDidMount() {
        const wave = this.state.osc.sinewave;
        this.setState({
            wave
        }, this.props.onOscSet(wave.bind(this.state.osc)))
    }

    render() {
        const { classes } = this.props;
        // const { waveName } = this.state;
        return (
            <div className={classes.module}>
                <Knob 
                initial={200}
                min={0}
                max={1000}
                step={1}
                label="Frequency"
                color="#4ecca3"
                onChange={this.handleFreqChange} />
                <Knob 
                min={0}
                max={1}
                step={0.01}
                label="Mix"
                color="#4ecca3"
                onChange={this.handleFreqChange} />
            </div>
        );
    }

    handleFreqChange = (value) => {
        console.log(value)
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