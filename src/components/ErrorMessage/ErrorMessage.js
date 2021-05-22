import React from 'react';
import classes from './ErrorMessage.module.css';

const ErrorMessage = ({error}) => {
    return (
        <div className={classes.ErrorMessage}>
            <div>
                <span>Error {error.response.status}</span>
                <span>Please, try again later!</span>
            </div>
        </div>
    );
};

export default ErrorMessage;