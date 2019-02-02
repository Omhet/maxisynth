import React, { Component } from 'react';
import { FLStandardKnob } from 'precision-inputs/common/precision-inputs.fl-controls';
import 'precision-inputs/css/precision-inputs.fl-controls.css';

class Knob extends Component {
    state = {}
    knobContainer = React.createRef();
    knob = null;

    componentDidMount() {
        this.knob = new FLStandardKnob(this.knobContainer.current);
        this.knob.addEventListener('change', function (e) {
            console.log(e.target.value);
        });
    }

    render() {
        return (
            <div ref={this.knobContainer}></div>
        );
    }
}

export default Knob;