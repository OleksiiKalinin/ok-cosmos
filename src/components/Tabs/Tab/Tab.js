import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setIsOpenModal } from '../../../store/modal/modalActionCreators';
import classes from './Tab.module.css';

const Tab = (props) => {
    const {name, image, isOpenModal, setIsOpenModalHandler} = props;
    const [isOnHover, setIsOnHover] = useState(false);
    const [title, setTitle] = useState(name);
    const tabNameSpan = useRef(null);

    useEffect(() => {
        const spanStyle = tabNameSpan.current.style;
        if (isOnHover) {
            spanStyle.bottom = '50%';
            spanStyle.transform = 'translate(-50%, 50%)';
            setTitle('Details');
        } else {
            spanStyle.bottom = '24px';
            spanStyle.transform = 'translate(-50%, 0)';
            setTitle(name);
        }
    }, [isOnHover, name]);

    return (
        <div 
            className={classes.Tab} 
            style={{backgroundImage: `url(${image})`}}
            onClick={() => !isOpenModal ? setIsOpenModalHandler(name) : false}
        >
            <div 
                onMouseEnter={() => setIsOnHover(true)} 
                onMouseLeave={() => setIsOnHover(false)} 
                className={classes.TabInner}
            >
                <span ref={tabNameSpan}>{title}</span>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isOpenModal: state.modal.isOpen
});

const mapDispatchToProps = dispatch => {
    return {
        setIsOpenModalHandler: (isOpen) => {
            dispatch(setIsOpenModal(isOpen))
        }
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Tab);