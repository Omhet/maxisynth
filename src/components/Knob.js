import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { FLStandardKnob } from 'precision-inputs/common/precision-inputs.fl-controls';
import 'precision-inputs/css/precision-inputs.fl-controls.css';

class Knob extends Component {
    state = {}
    knobContainer = React.createRef();
    knob = null;

    componentDidMount() {
        let { knob } = this;
        const { knobContainer, handleChange, props: { min, max, step, color, initial } } = this;
        knob = new FLStandardKnob(knobContainer.current, {
            min,
            max,
            step,
            color,
            initial,
            dragResistance: 200
        });
        knob.addEventListener('change', function (e) {
            handleChange(e.target.value);
        });
    }

    render() {
        const { label, classes } = this.props;

        return (
            <div className={classes.wrapper}>
                <div ref={this.knobContainer}></div>
                <div>{ label }</div>
            </div>
        );
    }

    handleChange = (val) => {
        this.props.onChange(val);
    }
}

const style = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default injectSheet(style)(Knob) ;