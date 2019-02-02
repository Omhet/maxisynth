import React, { Component } from 'react';
import injectSheet from 'react-jss';

class Visualizer extends Component {
    state = {}
    canvas;
    context;

    componentDidMount() {
        const { canvas, context } = this;
        const { width } = canvas.getBoundingClientRect();
        const height = width / 4;
        canvas.width = width;
        canvas.height = height;
        context.strokeStyle = '#4ecca3';
        context.fillStyle = '#4ecca3';
        let spacing = width / 1024;
        function draw() {
            context.clearRect(0, 0, width, height);
            if (window.drawOutput) {
                for (let i = 0; i < 1024; i++) {
                    context.beginPath();
                    context.moveTo(i * spacing, height / 2);
                    context.lineTo(i * spacing, height / 2 + (window.drawOutput[i] * height));
                    context.stroke();
                    context.closePath();
                }
            }
        requestAnimationFrame(draw);
        }
        draw();
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <canvas ref={this.setCanvasRef} className={classes.canvas}></canvas>
            </div>
        );
    }

    setCanvasRef = canvas => {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }
}

const style = {
    canvas: {
        marginTop: '2rem',
        width: '100%'
    }
}

export default injectSheet(style)(Visualizer);