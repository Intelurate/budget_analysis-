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
        this.props.dispatch(BudgetActions2.BudgetUpdate(id));
    }

}

TableItem = connect()(TableItem);

const Table = (list) => {
    var items = list.map((v,i)=>{
        return <TableItem item={v} index={i} key={i} />
    })
    return items;
}

class BudgetUpdate2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            test: "test"
        }
        console.log(this.props)
    }

    updateBudget(id){        
        this.props.dispatch(BudgetActions2.updateBudget(id), { value: v, type: type});
    }

    render() {
        
    var tb = Table(this.props.budgetList);

    return (
        <div>
          
        <div className="page-header">
            <h4>Manufacturing Overhead Costs Eddie Brown</h4>
        </div>
            <table>
                <tbody>
                    <tr>
                        <td>COST ITEM</td>
                        <td>Q1 FORECAST AMOUNT</td>
                        <td>Q1 ACTUAL AMOUNT</td>

                    </tr>
                    <tr>
                        <td><input onChange={(v)=>this.updateBudget(v.target.value, 'costitem')} type="text" value={this.props.budget.get('costitem')} />&nbsp;&nbsp;</td>
                        <td><input onChange={(v)=>this.updateBudget(v.target.value, 'forecastamount')} type="text" value={this.props.budget.get('forecastamount')} />&nbsp;&nbsp;</td>
                        <td><input onChange={(v)=>this.updateBudget(v.target.value, 'actualamount')} type="text" value={this.props.budget.get('actualamount')} />&nbsp;&nbsp;</td>
                        <td><a style={{ float: 'right' }}  onClick={()=>this.updateBudget() } className="btn btn-primary btn-sm">Update Budget Item</a></td>
                    </tr>
                </tbody>
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

BudgetUpdate2 = connect(mapStateToProps)(BudgetUpdate2);
const BudgetUpdateRoute2 = <Route key="budgetupdate2" path="budgetupdate2" component = { BudgetUpdate2 } />

export { BudgetUpdateRoute2 }