import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import Modal from 'react-awesome-modal';
import BudgetActions from 'budgetActions';

import store from '../../store.js';





class TableItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }
    
    updateMe(id){        
        this.props.dispatch(BudgetActions.BudgetUpdate(id));
    }


}

TableItem = connect()(TableItem);



// const TableItem = function(item, i){    
//     return <li key={i}>{item.get('name')}<span className="icon-face-sunglasses" onClick={()=>this.deleteMe(item.get("_id"))}></span></li>
// }

const Table = (list) => {
    var items = list.map((v,i)=>{
        return <TableItem item={v} index={i} key={i} />
    })
    return items;
}

class BudgetUpdate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            test: "test"
        }
        console.log(this.props)
    }



    updateBudget(id){        
        this.props.dispatch(BudgetActions.updateBudget(id), { value: v, type: type});
    }

    // updateBudget(v, type){
    //     this.props.dispatch(BudgetActions.updateBudget({ value: v, type: type}))
    // }

    render() {
        
    var tb = Table(this.props.budgetList);

    return (
        <div>
          
        <div className="page-header">
            <h4>Manufacturing Overhead Costs</h4>
        </div>
        <table>
        
            <tr>
                <td>Cost Item</td>
                <td>Q1 Forecast Amount</td>
                <td>Q1 Actual Amount</td>

            </tr>
        
            <tr>
            <td><input onChange={(v)=>this.updateBudget(v.target.value, 'costitem')} type="text" value={this.props.budget.get('costitem')} />&nbsp;&nbsp;</td>
            <td><input onChange={(v)=>this.updateBudget(v.target.value, 'forecastamount')} type="text" value={this.props.budget.get('forecastamount')} />&nbsp;&nbsp;</td>
            <td><input onChange={(v)=>this.updateBudget(v.target.value, 'actualamount')} type="text" value={this.props.budget.get('actualamount')} />&nbsp;&nbsp;</td>
            <td><a style={{ float: 'right' }}  onClick={()=>this.updateBudget() } className="btn btn-primary btn-sm">Update Budget Item</a></td>
        </tr>
      

    </table>
           

   
                 
        </div>

    );
}
};


function mapStateToProps(state) {
    return {
        budgetList: state.budget.get('list'),
        newBudget: state.budget.get('newBudget')
    };
}

BudgetUpdate = connect(mapStateToProps)(BudgetUpdate);
const BudgetUpdateRoute = <Route key="budgetupdate" path="budgetupdate" component = { BudgetUpdate } />

export { BudgetUpdateRoute }