import React, { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import classes from './Animation.module.css';
import planet from '../../assets/planet.svg';
import landingGear from '../../assets/landing_gear.svg';
import smoke1 from '../../assets/smoke1.svg';
import smoke2 from '../../assets/smoke2.svg';

const Animation = () => {
    const [isAnimationStarted, setIsAnimationStarted] = useState(false);
    const [timeToBack, setTimeToBack] = useState(13);
    const roketDiv = useRef(null);
    const roketInnerDiv = useRef(null);
    const smoke1Div = useRef(null);
    const smoke2Div = useRef(null);
    
    const toggleSmoke = (elements) => {
        elements.forEach(element => {
            const elementClassList = element.current.classList;
    
            elementClassList.toggle(classes.SmokeCreating);
            setTimeout(() => {
                elementClassList.toggle(classes.SmokeCreating);
            }, 4001);
        });
    }

    const toggleRoketAnimation = () => roketDiv.current.classList.toggle(classes.RoketAnimation);
    const toggleRoketInnerAnimation = () => roketInnerDiv.current.classList.toggle(classes.RoketInnerAnimation);

    useEffect(() => {
        if (isAnimationStarted) {
            const intervalId = setInterval(() => {
                setTimeToBack(prev => prev - 1);
            }, 1000);

            toggleSmoke([smoke1Div, smoke2Div]);

            setTimeout(() => {
                toggleRoketAnimation();
                toggleRoketInnerAnimation();
                setIsAnimationStarted(false)
                clearInterval(intervalId);
                setTimeToBack(13);
            }, 13001);

            setTimeout(() => toggleSmoke([smoke1Div, smoke2Div]), 11501);

            toggleRoketAnimation();
            toggleRoketInnerAnimation();
        }
    }, [isAnimationStarted]);

    return (
        <div className={classes.Animation}>
            <div className={classes.Planet}>
                <ReactSVG src={planet}/>
                <div ref={roketDiv} className={classes.Roket}>
                    <div ref={roketInnerDiv} className={classes.RoketInner}>
                    {isAnimationStarted && 
                    <div className={classes.RoketFire}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>}
                </div>
                </div>
                <div className={classes.ThingsOnPlanet}>
                    <div className={classes.Smoke2}>
                        <img ref={smoke2Div} src={smoke2} alt='' />
                    </div>
                    <div className={classes.LandingGear}>
                        {!isAnimationStarted && <img src={landingGear} alt='' />}
                    </div>
                    <div className={classes.Smoke1}>
                        <img ref={smoke1Div} src={smoke1} alt='' />
                    </div>
                </div>
            </div>
            <div 
                className={classes.Button} 
                onClick={() => !isAnimationStarted ? setIsAnimationStarted(true) : false}>
                <span>{isAnimationStarted ? `${timeToBack} weeks to return!` : 'Launch Rocket!'}</span>
            </div>
        </div>
    );
};

export default Animation;