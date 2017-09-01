import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Route, IndexRoute } from 'react-router';

class Home extends Component {

    constructor() {

        super();
        this.state = {
            name: "Current State"
        }
    }

    componentWillMount(){
    	console.log('componentWillMount')
    }

    componentDidMount(){
    	console.log('componentDidMount')
    }

    clicked(){
    	this.setState({ name: "This is the new set state!!"})
    }
    
    render() {
    	
    	console.log('rendered')

        return (
            <div>
             
                <a href="#budget">Go to budget...</a>
         
            </div>
        );
    }
}

const HomeIndex = <IndexRoute key="index" component = { Home } />

const HomeMain = <Route key="home" path="home" component = { Home } />

export { HomeIndex, HomeMain };