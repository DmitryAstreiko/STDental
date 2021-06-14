import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import AuthService from "./Authorization/auth.service";
import Button from '@material-ui/core/Button';
import "./App.css";

export class MenuRoleAdministrator extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userNameDental: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({ userNameDental: user });
    };
  }

  logOut() { 
    this.props.logOutInput();       
  }

    render() {
        return(
          <div className="menu-roles">
            <div className="d-flex justify-content-between">
                <div>
                  <Button onClick={ () => this.props.setFlagTalons() } >Талоны</Button>
                  <Button onClick={ () => this.props.setFlagAddTalon() } >Добавить талон</Button>
                  <Button >Группировка услуг</Button>
                  <Button >Отчеты</Button>
                  <Button >Прейскурант</Button>
                  <Button onClick={ () => this.props.setFlagPatients() } >Пациенты</Button>
                  <Button >Врачи</Button>
                  <Button onClick={ () => this.props.setFlagReception() } >Запись на прием</Button>
                </div>

                <div >
                  <Button >{this.props.userNameDental} </Button>                  
                  <Button outline  href="/" onClick={ () => this.props.logOutInput() } >Выйти</Button>
                </div>
            </div>
          </div>
        )
    }
}