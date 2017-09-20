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
			costitem : "--insert COST item--",
			forecastamount :  "--insert FORECAST amount--", 
            actualamount:  "--insert ACTUAL amount--"             
        }
	})
}

function budgetReducer(state = budgetInitialState.budget, action) {
    console.log('function budgetReducer(state = budgetInitialState.budget, action)','budgetReducer...EB');
    switch (action.type) {

        case "EDIT_SELECTED_VALUE":                
            state = state.updateIn(['newBudget', action.key], (v)=> action.value ); 
            state = state.updateIn(['list', action.index], (v)=> state.get('newBudget') ); 

            return state;

        case "FOCUS_ITEM":

            console.log('FOCUSINGGG')
            console.log("case FOCUS_ITEM: ",action.value)
            console.log("budgetInitialState.budget.get(newBudget).get(action.key); ", action.key)

            var value =  budgetInitialState.budget.get("newBudget").get(action.key);

            if(action.value == value){
                state = state.updateIn(['newBudget', action.key], (v)=> "" ); 
                state = state.updateIn(['list', action.index], (v)=> state.get('newBudget') ); 
            }

            return state;

        case "EDIT_BUDGET":

            state = state.update('list', (l) => l.filter(v=>v.get('_id')!=='new').map((v,i)=>{             
                    v = v.update('edit', (e)=> false);
                    return v;
                })
            );
                
            var editItem = state.get('list').get(action.index);
            state = state.updateIn(['newBudget'], (v)=> editItem);
            state = state.updateIn(['newBudget'], (v)=> v.set('edit', true));  

            state = state.updateIn(['list', action.index], (v)=> state.get('newBudget') ); 

            return state;

        case "ADD_BUDGET_TO_CREATE":

        
            state = state.update('list', (l) => l.map((v,i)=>{
                    v = v.update('edit', (e)=> false);
                    return v;
                })
            );
            
            state = state.updateIn(['newBudget'], (v)=> Immutable.fromJS(budgetInitialState.budget.get('newBudget')) ); 
            state = state.updateIn(['newBudget'], (v)=> v.set('_id', "new") ); 

            state = state.updateIn(['newBudget'], (v)=> v.set('edit', true) ); 
            state = state.updateIn(['list'], (v)=> v.push(state.get('newBudget')) ); 
            return state;

        case constants.UPDATE_NEW_BUDGET:
            console.log('Switch Case 1','budgetReducer...EB');
            state = state.updateIn(['newBudget', action.newBudget.type], (v)=> action.newBudget.value ); 
            return state; 

        case constants.ADD_BUDGET: 
            state = state.updateIn(['list', action.index], (v)=> Immutable.fromJS(action.budget));            
            state = state.updateIn(['newBudget'], (v)=> budgetInitialState.budget.get('newBudget')); 
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
