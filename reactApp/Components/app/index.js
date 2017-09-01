import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
class Main extends Component {

    componentWillMount() {
        //this.props.dispatch(CourseActions.loadAuthorsAsync());
    }

    changeUser(e) {
        //this.props.dispatch(UserActions.changeUser());
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    {this.props.children}
                </div>
                <Footer/>
                 </div>
        );
    }
}

export default Main;