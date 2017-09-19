import axios from 'axios';
import Constants from '../constants';
import Promise from 'bluebird';

//import {addNotification} from '../actions/notificationActions';

//const base = 'http://app.viomedia.com/courses/api';

/* eslint-disable no-console */

class BudgetActions2 {

    static addBudget(budget) {
        return {
            type: Constants.ADD_BUDGET,
            budget: budget
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
    
    static updateBudgetAsync(id, costitem, forecastamount, actualamount){
        return function (dispatch) {

            console.log('updateBudgetAsync', id.toString());
            //console.log('bbb updateBudgetAsync', actualamount.toString());
            console.log('updateBudgetAsync Delete this line with this ID: ', "just to see if it works!");
            console.log('updateBudgetAsync Delete this line with this ID: ', costitem.toString());
            axios.delete('http://localhost:7676/delete_budget/'+ costitem.toString());
            console.log('updateBudgetAsync Reinsert the line with all its new data: ', id.toString());
            axios.post('http://localhost:7676/budget', { costitem }).then(function() {dispatch(BudgetActions2.reloadBudgetAsync());
            console.log('updateBudgetAsync Done reloading inside updateBudgetAsync id: ', costitem.toString());                    
            })
            .catch(function (response) {
                //console.log('Error updating course ' + response);
                dispatch(addNotification({title: 'Error', message: 'Error updating budget item ' +  response , level: 'error', autoDismiss: 0 }));                     
            });
        };
    }

    static updateCostItemAsync(idx, costitemx, forecastamountx, actualamountx){
        return function (dispatch) {
            //...29Sep2017...EB
            console.log('updateCostItemAsync Delete this line with this ID: ', idx.toString());
            console.log('updateCostItemAsync This should be the costitem: ', costitemx.toString());
            axios.delete('http://localhost:7676/delete_budget/'+ idx.toString());
            console.log('updateCostItemAsync Reinsert the line with all its new data: ', idx.toString());
            axios.post('http://localhost:7676/budget', { costitemx, foreacastamountx, actualamountx }).then(function() {dispatch(BudgetActions2.reloadBudgetAsync());
            console.log('updateCostItemAsync Done reloading inside updateBudgetAsync id: ', costitemx.toString());                    
            })
            .catch(function (response) {
                dispatch(addNotification({title: 'Error', message: 'Error updating budget item ' +  response , level: 'error', autoDismiss: 0 }));                     
            });
        };
    }

    static updateForecastAmountAsync(id, forecastamount){
        return function (dispatch) {
            //...29Sep2017...EB
            console.log('updateForecastAmountAsync Delete this line with this ID: ', id.toString());
            console.log('updateForecastAmountAsync This should be the forecast amount: ', forecastamount.toString());
            axios.delete('http://localhost:7676/delete_budget/'+ id.toString());
            console.log('updateForecastAmountAsync Reinsert the line with all its new data: ', id.toString());
            axios.post('http://localhost:7676/budget', { forecastamount }).then(function() {dispatch(BudgetActions2.reloadBudgetAsync());
            console.log('updateForecastAmountAsync Done reloading inside budgetActions2 id: ', forecastamount.toString());                    
            })
            .catch(function (response) {
                //console.log('Error updating course ' + response);
                dispatch(addNotification({title: 'Error', message: 'Error updating budget item ' +  response , level: 'error', autoDismiss: 0 }));                     
            });
        };
    }

    static updateActualAmountAsync(id, actualAmount){
        return function (dispatch) {
            //...29Sep2017...EB
            console.log('updateActualAmountAsync Delete this line with this ID: ', id.toString());
            console.log('updateActualAmountAsync This should be the actualAmount: ', actualAmount.toString());
            axios.delete('http://localhost:7676/delete_budget/'+ id.toString());
            console.log('updateActualAmountAsync Reinsert the line with all its new data: ', id.toString());
            axios.post('http://localhost:7676/budget', { actualAmount }).then(function() {dispatch(BudgetActions2.reloadBudgetAsync());
            console.log('updateActualAmountAsync Done reloading inside updateBudgetAsync id: ', actualAmount.toString());                    
            })
            .catch(function (response) {
                //console.log('Error updating course ' + response);
                dispatch(addNotification({title: 'Error', message: 'Error updating budget item ' +  response , level: 'error', autoDismiss: 0 }));                     
            });
        };
    }

    static addBudgetAsync(costitem, forecastamount, actualamount) {
        return function (dispatch) { 
            console.log('Adding a new line', 'EB');
            axios.post('http://localhost:7676/budget', { costitem: costitem, forecastamount: forecastamount, actualamount: actualamount})
                .then(function (response) {                    
                    dispatch(BudgetActions2.addBudget(response.data));
                })
                .catch(function (response) {
                    // console.log('Error in loading Authors **** ' + response);
                    //dispatch(addNotification({title: 'Error', message: 'Error loading Authors ' +  response , level: 'error', autoDismiss: 0 }));                    
                });
        };
    }

}

export default BudgetActions2;
