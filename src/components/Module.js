import React, { Component } from 'react';
import injectSheet from 'react-jss';
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
        const { waveName } = this.state;
        return (
            <div className={classes.module}>
                {waveName}
                <select value={waveName}
                    className={classes.waveSelect}
                    onChange={this.handleOscWaveSelect}>
                    <option value="sinewave">Sine</option>
                    <option value="sawn">Saw</option>
                    <option value="square">Square</option>
                </select>
            </div>
        );
    }

    handleOscWaveSelect = (e) => {
        const waveName = e.target.value;
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
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)',
        margin: '0.5rem 0'
    }
}

export default injectSheet(style)(Module);