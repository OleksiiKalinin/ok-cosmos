import {
    GET_MODAL_DATA_SUCCESS, 
    GET_MODAL_DATA_FAILURE, 
    GET_MODAL_DATA_STARTED,
    SET_IS_OPEN_MODAL} from './modalActions';

let initialState = {
    data: [],
    loading: false,
    error: null,
    isOpen: false,
    header: '',
    criterions: ['', ''],
    sortingMethods: ['none', 'asc', 'desc']
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MODAL_DATA_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_MODAL_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                criterions: [...action.criterions],
                data: [...action.data]
            };
        case GET_MODAL_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case SET_IS_OPEN_MODAL:
            return {
                ...state,
                isOpen: action.isOpen,
                header: action.isOpen ? action.isOpen : ''
            };
        default:
            return state;
    }
}

export default modalReducer;