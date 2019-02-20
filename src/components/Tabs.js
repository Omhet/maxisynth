import React, {Component} from 'react';
import injectSheet from 'react-jss';

class Tabs extends Component {
    render() {
        const {classes, tabs, value} = this.props;

        return <div className={classes.switch}>
            {tabs.map((t, i) => <div key={i} className={`${classes.tab} ${value === t ? classes.active : ''}`}
                                     onClick={this.handleClick.bind(this, t)}>{t}</div>)}
        </div>;
    }

    handleClick = (tab) => {
        this.props.onChange(tab);
    }
}

const style = {
    switch: {
        display: 'flex',
        justifyContent: 'center'
    },
    tab: {
        cursor: 'pointer',
        color: '#eeeeee',
        textAlign: 'center',
        borderRadius: '0.5rem',
        margin: '2rem 0.5rem',
        border: '1px solid #393e46',
        padding: '1rem 2rem',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.46)',
        userSelect: 'none',
        '&:hover': {
            boxShadow: '0 1px 3px rgba(78, 204, 163, 0.46)'
        }
    },
    active: {
        boxShadow: '0 1px 3px rgba(78, 204, 163, 0.46)'
    }
};
export default injectSheet(style)(Tabs);