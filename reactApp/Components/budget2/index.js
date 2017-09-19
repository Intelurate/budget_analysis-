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

    updateBudget(id, costitem, forecastamount, actualamount){
        console.log('updateBudget(id) inside budget2', ".....EB");
        this.props.dispatch(BudgetActions2.updateBudgetAsync(id));
    }

    updateForm(id, costitem, forecastamount, actualamount){
        console.log('updateForm(id) inside budget2', "......EB");
        this.props.dispatch(BudgetActions2.updateFormAsync(id, costitem, forecastamount, actualamount));
    }

    updateCostItem(idx, costitemx, forecastamountx, actualamountx){
        console.log('updateCostItem(id, costitemx){', "......EB");
        console.log('updateCostItem values:', idx, costitemx, forecastamountx, actualamountx );
        this.props.dispatch(BudgetActions2.updateCostItemAsync(idx, costitemx, forecastamountx, actualamountx));
    }

    updateForecastAmount(idx, foreCastamountx){
        console.log('updateCostItem values:', idx, foreCastamountx ); 
        this.props.dispatch(BudgetActions2.updateForecastAmountAsync(idx, foreCastamountx));
    }

    updateActualAmount(idx, updateActualamountx){
        console.log('updateCostItem(id, updateActualamountx){', "......EB");
        console.log('updateCostItem values:', idx, updateActualamountx); 
        this.props.dispatch(BudgetActions2.updateActualAmountAsync(idx, updateActualamountx));
    }

    render() {
        return (    
    <tr>
        {/* Page Load and Post Back*/}

        {/* Cost Item Column */}
        <td> {this.props.item.get('costitem' ) ? this.props.item.get('costitem') : 
            <input onChange={(v)=>this.updateCostItem( this.props.item.get('_id') , v.target.value, this.props.item.get('_forecastamount'), this.props.item.get('actualamount')  )} 
            type="text" value={ this.props.item.get('costitem') || "--insert COST item--" } />
        } </td>

        {/* Forecast Column */}
        <td> {this.props.item.get('forecastamount') ? this.props.item.get('forecastamount') : 
            <input onChange={(v)=>this.updateForecastAmount(this.props.item.get("_id") , v.target.value)} 
            type="text" value={ this.props.item.get('forecastamount') || "--insert FORECAST amount--" } />
        } </td>        

        {/* <td> {this.props.item.get('actualamount') || 0 }</td> */}
        <td> {this.props.item.get('actualamount') ? this.props.item.get('actualamount') : 
            <input onChange={(v)=>this.updateActualAmount(this.props.item.get("_id") , v.target.value)} 
            type="text" value={ this.props.item.get('actualamount') || "--insert ACTUAL amount--" } />
        } </td>           

        {/* Variance Column */}
        <td> {this.props.item.get('actualamount') ? this.props.item.get('actualamount') - this.props.item.get('forecastamount')  : 0 } </td>

        {/* Variance Percent Column */}
        <td> {this.props.item.get('actualamount') ? (this.props.item.get('actualamount') -   this.props.item.get('forecastamount')) / this.props.item.get('forecastamount')  * 100 : 0 }%</td>
        
        {/* Update Button */}
        <td><a style={{ float: 'left' }}  
        onClick={()=>this.updateBudget(this.props.item.get("_id", "costitem", "forecastamount", "actualamount")) } className="btn btn-primary btn-sm">Edit</a></td>

        {/* Delete Button */}
        <td><img style={{cursor:'pointer', float: 'right'}} src="/images/garbage.png" 
        onClick={()=>this.deleteMe(this.props.item.get("_id"))}/></td>
    </tr>)
        
    }
}

TableItem = connect()(TableItem);

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
        this.props.dispatch(BudgetActions2.addBudgetAsync())
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
