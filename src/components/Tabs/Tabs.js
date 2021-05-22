import React from 'react';
import Tab from './Tab/Tab';
import classes from './Tabs.module.css';

const tabsFromGlobalStoreImitation = [
    {
        name: 'Capsules',
        image: 'images/capsules.png'
    },
    {
        name: 'Crew',
        image: 'images/crew.png'
    },
    {
        name: 'Rockets',
        image: 'images/rockets.png'
    },
    {
        name: 'Starlink',
        image: 'images/starlink.png'
    }
];

const Tabs = () => {
    return (
        <div className={classes.Tabs}>
            {
                tabsFromGlobalStoreImitation.map((tab, i) => {
                    return <Tab key={i} image={tab.image} name={tab.name} />
                })
            }
        </div>
    );
};

export default Tabs;