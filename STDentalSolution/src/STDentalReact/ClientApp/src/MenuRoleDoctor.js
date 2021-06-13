import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import AuthService from "./Authorization/auth.service";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom';
import './custom.css';

export class MenuDoctor extends Component{
constructor(props) {
    super(props);

    this.state = {
        userNameDental: false
    };
}

componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(`user = ${user}`);
    if (user) {
        this.setState({ userNameDental: user });
    };
}

logOut() {
    console.log(`logOut-MenuDoctor.js`); 
    this.props.logOutInput();       
}

render() {
    return(
        <div style={{ backgroundColor: "yellow", height: "50px" }}>
            <div class="d-flex justify-content-between">
                <div>
                    <Button onClick={ () => this.props.setFlagTalons() } className="button-menu-role">Талоны</Button>
                    <Button onClick={ () => this.props.setFlagAddTalon() } variant="text" 
                        style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px"}} >Добавить талон</Button>
                    <Button onClick={ () => this.props.setFlagReception() } className="button-menu-role">Прием пациентов</Button>
                    {/*<button type="button" class="btn btn-outline-info" >qwewqe</button>*/}
                </div>
                <div>
                    <Button className="button-menu-role" >{this.state.userNameDental} </Button>
                    <Button outline  href="/" onClick={ () => this.props.logOutInput() } className="button-menu-role">Выйти</Button>
                </div>
            </div>
        </div>
    );
}
    
}