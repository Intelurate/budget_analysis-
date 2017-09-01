import React, { Component } from 'react';

class PageTwo extends Component {
    
    sp()
    {
        if(!renderSomething)
            return <div/>
        else return <h1> hell0 </h1>
    }

    render() {   
        return (
            <div>
                {sp()}      
                <p>This is Page Two</p>          
            </div>
        );
    }

}

export default PageTwo;