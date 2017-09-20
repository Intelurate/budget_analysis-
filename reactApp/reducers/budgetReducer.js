import Immutable from 'immutable';
import constants from '../constants/index';
//import budgetInitialState from '../initialState/budgetInitialState';

import _ from 'lodash';

// import Immutable from 'immutable';

var budgetInitialState =  {
	budget : Immutable.fromJS({
		list: [
            // { costitem: "name", forecastamount: 2345, actualamount: 333 }
        ],
		    newBudget: {
			costitem : "",
			forecastamount : "", 
			actualamount: ""
		}
	})
}

function budgetReducer(state = budgetInitialState.budget, action) {
    console.log('function budgetReducer(state = budgetInitialState.budget, action)','budgetReducer...EB');
    switch (action.type) {

        case constants.UPDATE_NEW_BUDGET:
            console.log('Switch Case 1','budgetReducer...EB');
            state = state.updateIn(['newBudget', action.newBudget.type], (v)=> action.newBudget.value ); 
            return state; 

        case constants.ADD_BUDGET: 
        console.log('Switch Case 2','budgetReducer...EB');
			var cnt = state.get('list').count();
			state = state.updateIn(['list', cnt], (v)=> Immutable.fromJS(action.budget)); 
            state = state.updateIn(['newBudget'], (v)=> Immutable.fromJS(budgetInitialState.budget.get('newBudget')) ); 
            return state;  

        case constants.UPDATE_BUDGET:
            console.log('Switch Case 3','budgetReducer...EB');
            state = state.updateIn(['newBudget', action.newBudget.type], (v)=> action.newBudget.value ); 
            return state; 

        case constants.LOAD_BUDGET:
            console.log('Switch Case 4','budgetReducer...EB');      	
			state = state.updateIn(['list'], (v)=> Immutable.fromJS(action.budget)); 
            return state;  

        case "SHOW_SPECIAL_ROW":
            console.log('Switch Case 5','budgetReducer...EB');
            state.set("IsSpecialRowVisible", true);
            return state;

        default:
            return state;
    }
}

export default budgetReducer;
