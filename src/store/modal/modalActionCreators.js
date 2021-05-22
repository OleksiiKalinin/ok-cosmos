import axios, { baseUrl } from "../../axios";
import {
    GET_MODAL_DATA_SUCCESS, 
    GET_MODAL_DATA_FAILURE, 
    GET_MODAL_DATA_STARTED,
    SET_IS_OPEN_MODAL} from './modalActions';

export const setIsOpenModal = (isOpen) => {
    return dispatch => {
        dispatch(setIsOpenModalAC(isOpen));
        
        if (isOpen) {
            const endPoint = isOpen.toLowerCase();
            let criterion1 = null, criterion2 = null;

            if (endPoint === 'capsules') {
                criterion1 = 'type';
                criterion2 = 'status';
            } else if (endPoint === 'crew') {
                criterion1 = 'name';
                criterion2 = 'agency';
            } else if (endPoint === 'rockets') {
                criterion1 = 'name';
                criterion2 = 'first_flight';
            } else if (endPoint === 'starlink') {
                criterion1 = 'OBJECT_NAME';
                criterion2 = 'LAUNCH_DATE';
            }

            const criterions = [criterion1.replace(/_/g, ' ').toLowerCase(), criterion2.replace(/_/g, ' ').toLowerCase()];

            dispatch(getModalDataStarted());

            axios.get(`${baseUrl}/${endPoint}`)
            .then(({data}) => {
                let newData = [];
                
                data.forEach(element => {
                    let el = element;
                    let elId = element.id;

                    if (endPoint === 'starlink') el = element.spaceTrack;

                    newData.push({
                        id: elId,
                        criterion1: el[criterion1],
                        criterion2: el[criterion2]
                    });
                });

                dispatch(getModalDataSuccess(criterions, newData));
            })
            .catch(error => {
                dispatch(getModalDataFailure(error));
            });
        }
    };
}

const getModalDataSuccess = (criterions, data) => ({
    type: GET_MODAL_DATA_SUCCESS,
    criterions,
    data
});

const getModalDataStarted = () => ({
    type: GET_MODAL_DATA_STARTED
});

const getModalDataFailure = error => ({
    type: GET_MODAL_DATA_FAILURE,
    error
});

const setIsOpenModalAC = isOpen => ({
    type: SET_IS_OPEN_MODAL,
    isOpen
});