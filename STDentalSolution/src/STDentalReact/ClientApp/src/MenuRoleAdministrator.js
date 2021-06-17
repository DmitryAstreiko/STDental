import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import AuthService from "./Authorization/auth.service";
import Button from '@material-ui/core/Button';
import "./App.css";
import IconButton from '@material-ui/core/IconButton';
import { purple } from '@material-ui/core/colors';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';

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
                  <Button onClick={ () => this.props.setFlagGroupServices() }>Группировка услуг</Button>
                  <Button onClick={ () => this.props.setFlagReports() }>Отчеты</Button>
                  <Button onClick={ () => this.props.setFlagServices() }>Прейскурант</Button>
                  <Button onClick={ () => this.props.setFlagPatients() } >Пациенты</Button>
                  <Button onClick={ () => this.props.setFlagDoctors() }>Врачи</Button>
                  <Button onClick={ () => this.props.setFlagCallPatients() }>Список обзвона</Button>
                  <Button onClick={ () => this.props.setFlagReception() } >Запись на прием</Button>
                </div>

                <div >
                  <IconButton 
                      aria-label="params" 
                      style={{ color: "rgb(255, 255, 255, 0.5)" }}
                      onClick={ () => this.props.setFlagOptions() }>
                      <AppsOutlinedIcon fontSize="small" />
                  </IconButton>
                  <Button >{this.props.userNameDental} </Button>                  
                  <Button href="/" onClick={ () => this.props.logOutInput() } >Выйти</Button>
                </div>
            </div>
          </div>
        )
    }
}