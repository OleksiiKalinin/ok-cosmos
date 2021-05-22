import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setIsOpenModal } from '../../store/modal/modalActionCreators';
import closeIcon from '../../assets/close_icon.svg';
import arrowsIcon from '../../assets/arrows.svg';
import arrowUpIcon from '../../assets/arrow_up.svg';
import arrowDownIcon from '../../assets/arrow_down.svg';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import classes from "./Modal.module.css";

const Modal = (props) => {
    const {setIsOpenModalHandler, loading, header, originalData, criterions, error, sortingMethods} = props;
    const [currentData, setCurrentData] = useState([]);
    const [currentSortIconVisibility, setCurrentSortIconVisibility] = useState({criterion1: false, criterion2: false});
    const [currentSortIndex, setCurrentSortIndex] = useState({criterion1: 0, criterion2: 0});
    const modalDiv = useRef(null);
    
    useEffect(() => setCurrentData(originalData), [originalData]);

    useEffect(() => {
        const ifIncludes = e => {
            // adaptation for firefox
            const path = e.path || e.composedPath();
            return !path.includes(modalDiv.current) ? setIsOpenModalHandler(false) : null;
        }
        
        window.addEventListener('click', ifIncludes, true);

        return () => window.removeEventListener('click', ifIncludes, true);
    }, [setIsOpenModalHandler]);
    
    const setArrowIconHandler = (index, visible) => {
        if (index === 0) return <img className={visible ? classes.Show : null} src={arrowsIcon} alt='' />;
        else if (index === 1) return <img style={{opacity: '1'}} src={arrowUpIcon} alt='' />;
        else if (index === 2) return <img style={{opacity: '1'}} src={arrowDownIcon} alt='' />;
    }

    const toggleSortIconVisibility = (criterion, visible) => {
        if (currentSortIndex[criterion] === 0) 
            setCurrentSortIconVisibility(prev => ({
                ...prev,
                [criterion]: visible
            }));
    }
    
    const toggleSortMethod = (criterion) => {
        setCurrentSortIconVisibility(prev => {
            for (let key in prev) prev[key] = false;
            return {...prev};
        });

        setCurrentSortIndex(prev => {
            let newIndex = ++prev[criterion];
            
            if (newIndex === sortingMethods.length) newIndex = 0;

            for (let key in prev) prev[key] = 0;
            
            return {
                ...prev,
                [criterion]: newIndex
            };
        });
    }

    useEffect(() => {
        let sortBy = 'criterion1';

        for (let key in currentSortIndex) 
            if (currentSortIndex[key] !== 0)
                sortBy = key;
        
        if (currentSortIndex[sortBy] === 0)
            setCurrentData(originalData); 
        else if (currentSortIndex[sortBy] === 1)
            setCurrentData(prev => 
                [...prev].sort((a, b) => {
                    if (a[sortBy] < b[sortBy]) return -1;
                    if (a[sortBy] > b[sortBy]) return 1;
                    if (a[sortBy] === b[sortBy]) return 0;
                    return null;
                })
            );
        else if (currentSortIndex[sortBy] === 2)
            setCurrentData(prev =>
                [...prev].sort((a, b) => {
                    if (a[sortBy] > b[sortBy]) return -1;
                    if (a[sortBy] < b[sortBy]) return 1;
                    if (a[sortBy] === b[sortBy]) return 0;
                    return null;
                })
            );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSortIndex]);

    return (
        <div ref={modalDiv} className={classes.Modal}>
            {loading ? 
            <Spinner />
            :
            <>
                <div className={classes.Header}> 
                    <span>{header}</span>
                    <img 
                        src={closeIcon} alt='' 
                        onClick={() => setIsOpenModalHandler(false)}
                    />
                </div>
                {
                    error !== null ?
                    <ErrorMessage error={error} />
                    :
                    <div className={classes.Content}> 
                        <div className={classes.Criterions}>
                            {['criterion1', 'criterion2'].map((criterion, i) => {
                                return (
                                    <div key={i}
                                        className={classes[criterion]}
                                        onMouseEnter={() => toggleSortIconVisibility(criterion, true)} 
                                        onMouseLeave={() => toggleSortIconVisibility(criterion, false)}>
                                            <span>{criterions[i]}</span>
                                            <span onClick={() => toggleSortMethod(criterion)}>
                                                {setArrowIconHandler(currentSortIndex[criterion], currentSortIconVisibility[criterion])}
                                            </span>
                                    </div>)
                            })}
                        </div>
                        <div className={classes.Table}>
                            <table>
                                <tbody>
                                    {currentData.map(row => {
                                        return (
                                            <tr key={row.id}>
                                                <td>{row.criterion1}</td>
                                                <td>{row.criterion2}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </>}
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.modal.loading,
    header: state.modal.header,
    originalData: state.modal.data,
    criterions: state.modal.criterions,
    error: state.modal.error,
    sortingMethods: state.modal.sortingMethods
});

const mapDispatchToProps = dispatch => {
    return {
        setIsOpenModalHandler: (isOpen) => {
            dispatch(setIsOpenModal(isOpen))
        }
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Modal);