import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import AuthService from "./Authorization/auth.service";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom';

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
        <div>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={ () => this.props.setFlagTalons() }>Талоны</Button>
                <Button onClick={ () => this.props.setFlagAddTalon() }>Добавить талон</Button>
                <Button onClick={ () => this.props.setFlagReception() }>Прием пациентов</Button>
            </ButtonGroup>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button>{this.state.userNameDental}</Button>
                <Button href="/" onClick={ () => this.props.logOutInput() }>Выйти</Button>
            </ButtonGroup>
        </div>
    );
}
    
}