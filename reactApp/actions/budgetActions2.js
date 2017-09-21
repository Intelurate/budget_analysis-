import axios from 'axios';
import Constants from '../constants';
import Promise from 'bluebird';

//import {addNotification} from '../actions/notificationActions';

//const base = 'http://app.viomedia.com/courses/api';

/* eslint-disable no-console */

class BudgetActions2 {

    static addBudget(budget, index) {
        return {
            type: Constants.ADD_BUDGET,
            budget: budget,
            index: index
        };
    }

    static focusRecord(key, value, index) {
        console.log('inside static focusRecord: ', key, value, index);
        return {
            type:"FOCUS_ITEM",
            key: key,
            value: value,
            index: index
        };
    }    

    static addBudgetToCreate() {
        return {
            type: Constants.ADD_BUDGET_TO_CREATE
        };
    }

    static editBudget(index){
        return {
            type: Constants.EDIT_BUDGET,
            index: index
        };
    }

    static editSelectedRecord(key, value, index) {
        return {
            type: Constants.EDIT_SELECTED_VALUE,
            key: key,
            value: value,
            index: index
        };
    }

    static newBudget(budgetObj) {
        return {
            type: Constants.UPDATE_NEW_BUDGET,
            newBudget: budgetObj
        };
    }

    static loadBudget(budget) {
        return {
            type: Constants.LOAD_BUDGET,
            budget: budget
        };
    }
    static updateBudget(budget) {
        return {
            type: Constants.UPDATE_BUDGET,
            budget: budget
        };
    }


    // ===================================================================== //
    // ===================================================================== //
    // ========================== API: ASYNC CALLS ========================= //
    // ===================================================================== //
    // ===================================================================== //

    static loadBudgetAsync() {
        return function (dispatch) {
            console.log('loadBudgetAsync', "loading data...EB");
            axios.get('http://localhost:7676/budgets')
                .then(function (response) {                    
                    dispatch(BudgetActions2.loadBudget(response.data));
                })
                .catch(function (response) {
                    // console.log('Error in loading Authors **** ' + response);
                    //dispatch(addNotification({title: 'Error', message: 'Error loading Authors ' +  response , level: 'error', autoDismiss: 0 }));                    
                });
        };
    }

    static reloadBudgetAsync() {
        return function (dispatch) { 
            return new Promise((resolve, reject)=>{
                console.log('reloadBudgetAsync', "reloading data...EB");
                axios.get('http://localhost:7676/budgets')
                .then(response=>{       
                    dispatch(BudgetActions2.loadBudget(response.data));
                })
                .catch(function (response) {
                });
            });

        };
    }

    static deleteBudgetAsync(id) {
        return function (dispatch) {
            console.log('Deleting data using deleteBudgetAsync...EB', id);
            axios.delete('http://localhost:7676/delete_budget/'+ id)
                .then(dispatch(BudgetActions2.reloadBudgetAsync()) )        
                .catch(function (response) {
                    // console.log('Error in loading Authors **** ' + response);
                    //dispatch(addNotification({title: 'Error', message: 'Error loading Authors ' +  response , level: 'error', autoDismiss: 0 }));                    
                });
        };
    }
    
    static updateBudgetAsync(id, costitem, forecastamount, actualamount, index){
        return function (dispatch) {

            console.log('Deleting data using updateBudgetAsync...EB', id);
            axios.put('http://localhost:7676/budget/'+id.toString(), {  costitem: costitem, forecastamount: forecastamount, actualamount: actualamount })
            .then(function (response) {                    
                dispatch(BudgetActions2.addBudget(response.data, index));
            })
            .catch(function (response) {
                // console.log('Error in loading Authors **** ' + response);
                //dispatch(addNotification({title: 'Error', message: 'Error loading Authors ' +  response , level: 'error', autoDismiss: 0 }));                    
            });

        };
    }

    static updateCostItemAsync(id, costitem, forecastamount, actualamount){
        return function (dispatch) {
            //...19Sep2017...EB
            console.log('updateCostItemAsync Delete this line with this ID: ', id.toString());
            console.log('updateCostItemAsync This should be the costitem: ', costitem.toString());
            axios.delete('http://localhost:7676/delete_budget/'+ id.toString());
            console.log('updateCostItemAsync Reinsert the line with all its new data: ', id.toString());
            axios.post('http://localhost:7676/budget', { costitem, forecastamount, actualamount }).then(function() {dispatch(BudgetActions2.reloadBudgetAsync());
            console.log('updateCostItemAsync Done reloading inside updateBudgetAsync id: ', id.toString());                    
            })
            .catch(function (response) {
                dispatch(addNotification({title: 'Error', message: 'Error updating budget item ' +  response , level: 'error', autoDismiss: 0 }));                     
            });
        };
    }

    static updateForecastAmountAsync(id, costitem, forecastamount, actualamount){
        return function (dispatch) {         
            //...19Sep2017...EB
            console.log('updateForecastAmountAsync Delete this line with this ID: ', id.toString());
            console.log('updateForecastAmountAsync This should be the forecast amount: ', forecastamount.toString());
            axios.delete('http://localhost:7676/delete_budget/'+ id.toString());
            console.log('updateForecastAmountAsync Reinsert the line with all its new data: ', id.toString());
            axios.post('http://localhost:7676/budget', { costitem, forecastamount, actualamount }).then(function() {dispatch(BudgetActions2.reloadBudgetAsync());
            console.log('updateForecastAmountAsync Done reloading inside budgetActions2 forecastamountx: ', forecastamount.toString());                    
            })
            .catch(function (response) {
                //console.log('Error updating course ' + response);
                dispatch(addNotification({title: 'Error', message: 'Error updating budget item ' +  response , level: 'error', autoDismiss: 0 }));                     
            });
        };
    }

    static updateActualAmountAsync(id, costitem, forecastamount, actualamount){
        return function (dispatch) {
            //...19Sep2017...EB
            console.log('updateActualAmountAsync Delete this line with this ID: ', id.toString());
            console.log('updateActualAmountAsync This should be the actualAmount: ', actualamountx.toString());
            axios.delete('http://localhost:7676/delete_budget/'+ id.toString());
            console.log('updateActualAmountAsync Reinsert the line with all its new data: ', id.toString());
            axios.post('http://localhost:7676/budget', { costitem, forecastamount, actualamount }).then(function() {dispatch(BudgetActions2.reloadBudgetAsync());
            console.log('updateActualAmountAsync Done reloading inside updateBudgetAsync actualamountx: ', actualamount.toString());                    
            })
            .catch(function (response) {
                //console.log('Error updating course ' + response);
                dispatch(addNotification({title: 'Error', message: 'Error updating budget item ' +  response , level: 'error', autoDismiss: 0 }));                     
            });
        };
    }

    static addBudgetAsync(costitem, forecastamount, actualamount, index) {

        return function (dispatch) { 
            console.log('Adding a new line', 'EB');
            axios.post('http://localhost:7676/budget', { costitem: costitem, forecastamount: forecastamount, actualamount: actualamount })
                .then(function (response) {                    
                    dispatch(BudgetActions2.addBudget(response.data, index));
                })
                .catch(function (response) {
                    // console.log('Error in loading Authors **** ' + response);
                    //dispatch(addNotification({title: 'Error', message: 'Error loading Authors ' +  response , level: 'error', autoDismiss: 0 }));                    
                });
        };
    }

}

export default BudgetActions2;
