import {createStore, combineReducers, applyMiddleware} from 'redux';
import modalReducer from './modal/modalReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    modal: modalReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;