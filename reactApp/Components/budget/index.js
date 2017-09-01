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

   deleteMe(id){        
        this.props.dispatch(BudgetActions.deleteBudgetAsync(id));
    }

    render() {
        return (        
        <tr>
                <td>{this.props.item.get('costitem')}</td>
                <td> {this.props.item.get('forecastamount')}</td>
                <td> {this.props.item.get('actualamount') || 0 }</td>
                <td> {this.props.item.get('actualamount') ? this.props.item.get('actualamount') - this.props.item.get('forecastamount')  : 0 } </td>
                <td>{this.props.item.get('actualamount') ? (this.props.item.get('actualamount') -   this.props.item.get('forecastamount')) / this.props.item.get('forecastamount')  * 100 : 0 }%</td>
                <td><a style={{ float: 'left' }}  onClick={()=>this.updateBudget(this.props.item.get("_id", "costitem")) } className="btn btn-primary btn-sm">Update</a></td>

                              <td><a href="#budgetupdate">update</a></td>
                <td><img style={{cursor:'pointer', float: 'right'}} src="/images/garbage.png" onClick={()=>this.deleteMe(this.props.item.get("_id"))}/></td>
        </tr>)

        
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

class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            test: "test"
        }
        console.log(this.props)
    }

    componentWillMount(){
        console.log('xxxxcomponentWillMount')
    }

    componentDidMount(){
        this.props.dispatch(BudgetActions.loadBudgetAsync())
    }

    addBudget(){ 
        this.props.dispatch(BudgetActions.addBudgetAsync(this.props.newBudget.get('costitem'), this.props.newBudget.get('forecastamount'), this.props.newBudget.get('actualamount') ) )
    }

    updateForm(v, type){
        this.props.dispatch(BudgetActions.newBudget({ value: v, type: type}))
    }

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
            <td><input onChange={(v)=>this.updateForm(v.target.value, 'costitem')} type="text" value={this.props.newBudget.get('costitem')} />&nbsp;&nbsp;</td>
            <td><input onChange={(v)=>this.updateForm(v.target.value, 'forecastamount')} type="text" value={this.props.newBudget.get('forecastamount')} />&nbsp;&nbsp;</td>
            <td><input onChange={(v)=>this.updateForm(v.target.value, 'actualamount')} type="text" value={this.props.newBudget.get('actualamount')} />&nbsp;&nbsp;</td>
            <td><a style={{ float: 'right' }}  onClick={()=>this.addBudget() } className="btn btn-primary btn-sm">Add Budget</a></td>
        </tr>
      

    </table>
           
 
               
   
                 <br/><br/>

                 <table className='table table-striped table-hover'>
                 <thead>
                     <tr>
                         <th>Cost Item</th>
                         <th>Q1 Forecast</th>
                         <th>Q1 Actual</th>
                         <th>Variance</th>
                         <th>Var%</th>
                     </tr>
                 </thead>
                 <tbody>
                    {tb}
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

List = connect(mapStateToProps)(List);

const BudgetRoute = <Route key="budget" path="budget" component = { List } />

export { BudgetRoute }