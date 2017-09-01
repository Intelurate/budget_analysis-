import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import budgetReducer from './budgetReducer';
// import authorsReducer from './authorsReducer';
// import { notificationReducer } from './notificationReducer';

const rootReducer = combineReducers({
    budget: budgetReducer,
    routing: routerReducer  

});

export default rootReducer; 