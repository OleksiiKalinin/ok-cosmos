import React from 'react';
import Animation from '../Animation/Animation';
import Tabs from '../Tabs/Tabs';
import classes from './Content.module.css';

const Content = () => {
    return (
        <div className={classes.Content}>
            <Tabs />
            <Animation />
        </div>
    );
};

export default Content;