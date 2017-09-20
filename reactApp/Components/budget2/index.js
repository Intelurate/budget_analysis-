import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
import BudgetActions2 from 'budgetActions2';

import store from '../../store.js';

class TableItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

   deleteMe(id){
        console.log('deleteMe(id) inside budget2', "....EB");
        this.props.dispatch(BudgetActions2.deleteBudgetAsync(id));
    }

    updateBudget(index){        

        if(this.props.newBudget.get("_id")==="new"){
            this.props.dispatch(BudgetActions2.addBudgetAsync(
                    this.props.newBudget.get("costitem"), 
                    this.props.newBudget.get("forecastamount"), this.props.newBudget.get("actualamount"), index) )
        }else{
            this.props.dispatch(BudgetActions2.updateBudgetAsync(
                this.props.newBudget.get("_id"), this.props.newBudget.get("costitem"), 
                this.props.newBudget.get("forecastamount"), this.props.newBudget.get("actualamount"), index));
        }
    }

    updateForm(id, costitem, forecastamount, actualamount){
        console.log('updateForm(id) inside budget2', "......EB");
        this.props.dispatch(BudgetActions2.updateFormAsync(id, costitem, forecastamount, actualamount));
    }

    updateCostItem(idx, costitemx, forecastamountx, actualamountx){
        console.log('updateCostItem values:', idx, costitemx, forecastamountx, actualamountx );
        this.props.dispatch(BudgetActions2.updateCostItemAsync(idx, costitemx, forecastamountx, actualamountx));
    }

    updateForecastAmount(idx, costitemx, forecastamountx, actualamountx){
        console.log('updateForecastAmount values:', idx, costitemx, forecastamountx, actualamountx );
        this.props.dispatch(BudgetActions2.updateForecastAmountAsync(idx, costitemx, forecastamountx, actualamountx));
    }

    updateActualAmount(idx, costitemx, forecastamountx, actualamountx){
        console.log('updateActualAmount values:', idx, costitemx, forecastamountx, actualamountx );
        this.props.dispatch(BudgetActions2.updateActualAmountAsync(idx, costitemx, forecastamountx, actualamountx));
    }


    editSelectedRecord(key, value, index){
        this.props.dispatch(BudgetActions2.editSelectedRecord(key, value, index))
    }

    editBudget(index){
        this.props.dispatch(BudgetActions2.editBudget(index))
    }

    focusRecord(key, value, index){

        this.props.dispatch( BudgetActions2.focusRecord(key, value, index) )

    }

    render() {
        return (                 
            <tr>
                {/* Page Load and Post Back*/}

                {/* Cost Item Column */}
                <td> {!this.props.item.get('edit') ? this.props.item.get('costitem') : 
                    <input onFocus={(v)=>this.focusRecord( "costitem" , v.target.value, this.props.index )} 
                            onChange={(v)=>this.editSelectedRecord( "costitem" , v.target.value, this.props.index )} 
                    type="text" value={ this.props.item.get('costitem') } />
                } </td>

                {/* Forecast Column */}
                <td> {!this.props.item.get('edit') ? this.props.item.get('forecastamount') : 
                    <input  onFocus={(v)=>this.focusRecord( "costitem" , v.target.value, this.props.index )}  
                        onChange={(v)=>this.editSelectedRecord( 'forecastamount', v.target.value, this.props.index )} 
                    type="text" value={ this.props.item.get('forecastamount')} />
                } </td>        

                {/* <td> {this.props.item.get('actualamount') || 0 }</td> */}
                <td> {!this.props.item.get('edit') ? this.props.item.get('actualamount') : 
                    <input onFocus={(v)=>this.focusRecord( "costitem" , v.target.value, this.props.index )} 
                            onChange={(v)=>this.editSelectedRecord('actualamount',  v.target.value, this.props.index  )} 
                    type="text" value={ this.props.item.get('actualamount')} />
                } </td>           

                {/* Variance Column */}
                <td> {this.props.item.get('actualamount') ? this.props.item.get('actualamount') - this.props.item.get('forecastamount')  : 0 } </td>

                {/* Variance Percent Column */}
                <td> {this.props.item.get('actualamount') ? (this.props.item.get('actualamount') - this.props.item.get('forecastamount')) / this.props.item.get('forecastamount')  * 100 : 0 }%</td>
                
                <td>{this.props.item.get("edit") === true 
                ? <a style={{ float: 'left' }} onClick={()=>this.updateBudget(this.props.index) } className="btn btn-primary btn-sm" id="btnSave">Save</a> 
                : <a style={{ float: 'left' }} onClick={()=>this.editBudget(this.props.index) } className="btn btn-primary btn-sm" id="btnSave">Edit</a> }</td>

                {/* Delete Button */}
                <td><img style={{cursor:'pointer', float: 'right'}} src="/images/garbage.png" 
                onClick={()=>this.deleteMe(this.props.item.get("_id"))} id="btnDelete"/></td>
            </tr>
            )}
        }


function mapStateToProps(state) {
    return {
        budgetList: state.budget.get('list'),
        newBudget: state.budget.get('newBudget')
    };
}
TableItem = connect(mapStateToProps)(TableItem);

const Table = (list) => {
    var items = list.map((v,i)=>{
        return <TableItem item={v} index={i} key={i} />
    })
    return items;
}

class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            test: "test"
        }
        console.log(this.props)
    }

    componentWillMount(){
        console.log('EddiecomponentWillMount')
    }

    componentDidMount(){
        this.props.dispatch(BudgetActions2.loadBudgetAsync())
    }

    addBudget(){ 
        this.props.dispatch(BudgetActions2.addBudgetToCreate());
    }

    updateForm(v, type){
        this.props.dispatch(BudgetActions2.newBudget({ value: v, type: type}))
    }

    render() {
        
    var tb = Table(this.props.budgetList);var tb = Table(this.props.budgetList);

    return (
        <div>

        <div className="page-header">
            <h4>Manufacturing Overhead Costs by E. Brown</h4>
        </div>
        <table>
            <tbody>
                <tr>
                    <td><a style={{ float: 'right' }}  onClick={()=>this.addBudget() } className="btn btn-primary btn-sm">Add a Line</a></td>
                </tr>
            </tbody>
        </table>
        
        <br/><br/>
             <table className='table table-striped table-hover'>
                 <thead>
                     <tr>
                         <th>Cost Item</th>
                         <th>Forecast</th>
                         <th>Actual</th>
                         <th>Variance</th>
                         <th>Var(%)</th>
                     </tr>
                 </thead>
                 <tbody>
                    {tb}
                </tbody>
             </table>
             {this.props.children}
        </div>
    );
  }
};

const myCom = () => {
    return <div>Eddie</div>
}

const myCom2 = () => {
    return <div>Brown</div>
}

function mapStateToProps(state) {
    return {
        budgetList: state.budget.get('list'),
        newBudget: state.budget.get('newBudget')
    };
}

List = connect(mapStateToProps)(List);

const BudgetRoute2 = <Route key="budget2" path="budget2" component = { List } >
    <IndexRoute key="upi" component={myCom} />
    <Route key="up" path="up" component = { myCom } />
    <Route key="down" path="down" component = { myCom2 } />
</Route>

export { BudgetRoute2 }
