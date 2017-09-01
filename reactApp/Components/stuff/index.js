import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Route, IndexRoute } from 'react-router';

class MyCom extends Component{
    render() {
        
        console.log('rendered')

        return (
            <div>
               My New Component Stuff {this.props.myprop.name}
            </div>
        );
    }
}

//http://untangled.io/immutable-js-the-foolproof-guide-to-creating-lists/


class Stuff extends Component {

    constructor() {
        super();
        this.state = {
            name: "Z"
        }
    }

    componentWillMount(){
    	console.log('xxxxcomponentWillMount')
    }

    componentDidMount(){
    	console.log('xxxxxcomponentDidMount')
    }

    render() {
    	
    	console.log('rendered')

        return (
            <div>
                <a href="#home">home</a>&nbsp;&nbsp;
                <a href="#list">list</a>&nbsp;&nbsp;
                <a href="#filteredlist">filtered list</a><br/><br/>
                <MyCom myprop={{name: '    This is a test.'}}/>

                Stuff
            </div>
        );
    }
};


const StuffRoute = <Route key="stuff" path="stuff" component = { Stuff } />

export { StuffRoute }