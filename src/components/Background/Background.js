import React from 'react';
import { ReactSVG } from 'react-svg';
import classes from './Background.module.css';
import background from '../../assets/background.svg'

const Background = () => {
    return (
        <div className={classes.Background}>
            <ReactSVG src={background} />
        </div>
    );
};

export default Background;