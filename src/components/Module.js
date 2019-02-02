import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

            </div>
        );
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
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)',
        margin: '0.5rem 0'
    }
}

export default injectSheet(style)(Module);