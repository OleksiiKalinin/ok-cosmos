import React from 'react';
import logo from '../../assets/logo.svg';
import { ReactSVG } from 'react-svg';

const Logo = () => {
    return (
        <div>
            <ReactSVG src={logo} />
        </div>
    );
};

export default Logo;