import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {FLReactiveGripDial} from 'precision-inputs/common/precision-inputs.fl-controls';
import 'precision-inputs/css/precision-inputs.fl-controls.css';
import {ReactComponent as Sin} from '../images/sin.svg';
import {ReactComponent as Tri} from '../images/tri.svg';
import {ReactComponent as Saw } from '../images/saw.svg';
import {ReactComponent as Sq} from '../images/sq.svg';

class Knob extends Component {
    render() {
        const {label, classes, wave} = this.props;
        const active = '#4ecca3';
        const inactive = 'rgba(0, 0, 0, 0.4)';
        const val = this.val;

        return (
            <div className={classes.wrapper}>
                <div className={classes.knob} ref={this.setKnob}>
                    {wave ?
                        <>
                            <span className={classes.sn}><Sin style={{fill: Number(val) === 0 ? active : inactive}}/></span>
                            <span className={classes.tr}><Tri style={{fill: Number(val) === 1 ? active : inactive}}/></span>
                            <span className={classes.sw}><Saw style={{fill: Number(val) === 2 ? active : inactive}}/></span>
                            <span className={classes.sq}><Sq style={{fill: Number(val) === 3 ? active : inactive}}/></span>
                        </>
                        : <span className={classes.val}>{val}</span>}
                </div>
                <div className={classes.label}>{label}</div>
            </div>
        );
    }

    setKnob = (knobContainer) => {
        const {handleChange, props: {min, max, step, color, initial, dragResistance, guideTicks}} = this;
        this.knob = new FLReactiveGripDial(knobContainer, {
            min,
            max,
            step,
            color,
            initial,
            dragResistance,
            guideTicks: guideTicks || 9
        });

        this.knob.addEventListener('change', function (e) {
            handleChange(e.target.value);
        });

        this.val = this.knob.value;
    };

    handleChange = (val) => {
        this.val = val;
        this.props.onChange(val);
    }
}

const style = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        fontSize: '.8rem',
        fontVariantNumeric: 'tabular-nums'
    },
    label: {
        marginTop: 4,
    },
    knob: {
        width: '4rem',
        height: '4rem',
        position: 'relative',
        '& > span': {
            position: 'absolute',
            '& path': {
                fill: 'inherit',
            }
        }
    },

    val: {
        color: '#4ecca3',
        position: 'relative',
        top: -12,
        left: -8
    },

    sn: {
        bottom: -12,
        left: -8
    },
    tr: {
        top: -4,
        left: -8
    },
    sw: {
        top: -4,
        right: -11
    },
    sq: {
        bottom: -12,
        right: -13
    },

};

export default injectSheet(style)(Knob);