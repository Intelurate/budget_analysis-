import React, { Component } from 'react';

import axios from 'axios';


class DynamicComponent extends Component{

    constructor(props) {

        super(props);
        
        this.state = {
            name : "bobn",
            myBorder: styles.redBorder,
            user: {
                email:"whatever@gmail.com",
                fname:"john",
                lname:"guy",
                title:"Not a Software Dude"
            },
            titleDisplay: true
        }

        axios.get('http://localhost:8887/user_profile')
        .then(response=>{
            console.log(response.data);
        });
    }

    componentWillMount(){
        console.log('componentWillMount')
    }

    componentDidMount(){
        console.log('componentDidMount')
    }
    

    clickMe(v){

        // axios.get('http://localhost:8887/user_profile')
        // .then(response=>{
        //     this.setState({ user : response.data, titleDisplay: false });
        // });

        this.setState({ myBorder : { border: '1px solid ' + v } });
        this.setState({ titleDisplay: false });

    }

    createEle(v, key) {
        return <li key={key} onClick={ (t)=>this.clickMe(v) }>{v}</li>
    }

    renderTitle(){

        var display = {
            display: 'block'   
        }

        if(this.state.titleDisplay == false){
            display.display = 'none'
        }

        return <p style={display}>My Title</p>;
    }

    render(){

    //    console.log('rendering....')
       
        var l = ["red","blue",'green','purple','yellow'];

        var elements = l.map((v, i)=>{
            return this.createEle(v,i);
        });

    	return <div style={this.state.myBorder}>
            
            {this.renderTitle()}

            <h3>{this.props.myProp}</h3>
            <p>{this.state.user.email}</p>
            <p>{this.state.user.title}</p>
            <p>{this.state.user.fname}</p>
            <p>{this.state.user.lname}</p>
            <p>{this.state.name}</p><ul>{elements}</ul>
        </div>;
    }
}

var styles = {

    redBorder: {
        border: "1px solid red"
    },

    greenBorder: {
        border: "1px solid green"
    }
}

export default DynamicComponent;

