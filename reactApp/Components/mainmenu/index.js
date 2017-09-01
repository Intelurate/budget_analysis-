import React, { Component } from 'react';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';

class MainMenu extends Component{

    render(){
        return <div style={{margin:"20px"}}>
            <ButtonGroup vertical>
                <Button>Home</Button>
                <Button>Courses</Button>
                <Button>Add Course</Button>
                <Button><span className="icon-search" style={{fontSize: '12px'}}/> Search Courses</Button>
                <DropdownButton title="Jump To Course" id="jump-to-course">
                    <MenuItem eventKey="1"><span className="icon-file-text2" style={{color:"gray", fontSize: '14px', marginRight: '5px'}}/> Static List Course 1</MenuItem>
                    <MenuItem eventKey="2"><span className="icon-file-text2" style={{color:"gray", fontSize: '14px', marginRight: '5px'}}/> Static List Course 2</MenuItem>
                </DropdownButton>
            </ButtonGroup> 
        </div>;
    }
}

export default MainMenu;

