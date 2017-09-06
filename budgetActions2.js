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
            
            console.log('ID', id)
            
            axios.delete('http://localhost:7676/delete_budget/'+id.toString())
                .then(dispatch(BudgetActions2.reloadBudgetAsync()) )        
                .catch(function (response) {
                    // console.log('Error in loading Authors **** ' + response);
                    //dispatch(addNotification({title: 'Error', message: 'Error loading Authors ' +  response , level: 'error', autoDismiss: 0 }));                    
                });
        };
    }



    static updateBudgetAsync(budget) {
        return function (dispatch) { 
            
            console.log('ID', id)
            
            axios.put('http://localhost:7676/updatebudget/'+id.toString())
                 .then(function() {
                  dispatch(BudgetActions2.loadBudgetAsync());                
                dispatch(addNotification({title: 'Success', message: 'The budget item ' + budget.get('costitem') + ' was updated', level: 'success' }));
            })
            .catch(function (response) {
                //console.log('Error updating course ' + response);
                dispatch(addNotification({title: 'Error', message: 'Error updating budget item ' +  response , level: 'error', autoDismiss: 0 }));                     
            });
        };
    }


    static addBudgetAsync(costitem, forecastamount, actualamount) {
        return function (dispatch) { 
            //console.log('costitem', costitem)
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



    // static updateCourseAsync(course) {
    //     //console.log('course in actionCreators ', `/courses/${course.get('Id')}`);
    //     return function (dispatch) {
    //         axios.put(base + '/courses/' + course.get('Id'), course)
    //         .then(function() {
    //             // MODIFY API TO RETURN THE UPDATED COURSE - TO DO
    //             dispatch(CourseActions.loadCoursesAsync());                
    //             dispatch(addNotification({title: 'Success', message: 'The course ' + course.get('title') + ' was updated', level: 'success' }));
    //         })
    //         .catch(function (response) {
    //             //console.log('Error updating course ' + response);
    //             dispatch(addNotification({title: 'Error', message: 'Error updating course ' +  response , level: 'error', autoDismiss: 0 }));                     
    //         });
    //     };
    // }

}

export default BudgetActions2;