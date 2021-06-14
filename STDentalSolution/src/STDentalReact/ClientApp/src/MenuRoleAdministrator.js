import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import AuthService from "./Authorization/auth.service";
import Button from '@material-ui/core/Button';

export class MenuRoleAdministrator extends Component{
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
    this.props.logOutInput();       
  }

    render() {
      const { userNameDental } = this.state;
        return(
          <div style={{ backgroundColor: "#343a40", height: "50px" }}>
            <div class="d-flex justify-content-between">
                <div>
                  <Button onClick={ () => this.props.setFlagTalons() } 
                      style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", 
                        letterSpacing: "0px", color: "rgb(255 255 255 / 50%)", fontWeight: "400"}}
                  >Талоны</Button>
                  <Button onClick={ () => this.props.setFlagAddTalon() } 
                      variant="text" 
                      style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", 
                        letterSpacing: "0px", color: "rgb(255 255 255 / 50%)", fontWeight: "400" }} 
                  >Добавить талон</Button>
                  <Button 
                      style={{textTransform: "none", fontWeight: "400", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px", color: "rgb(255 255 255 / 50%)"}}
                  >Группировка услуг</Button>
                  <Button 
                      style={{textTransform: "none", fontWeight: "400", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px", color: "rgb(255 255 255 / 50%)"}}
                  >Отчеты</Button>
                  <Button 
                      style={{textTransform: "none", fontWeight: "400", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px", color: "rgb(255 255 255 / 50%)"}}
                  >Прейскурант</Button>
                  <Button 
                      style={{textTransform: "none", fontWeight: "400", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px", color: "rgb(255 255 255 / 50%)"}}
                  >Справочники</Button>
                  <Button onClick={ () => this.props.setFlagReception() } 
                      style={{textTransform: "none", fontWeight: "400", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px", color: "rgb(255 255 255 / 50%)"}}
                  >Прием пациентов</Button>
                  <Button  
                      style={{textTransform: "none", fontWeight: "400", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px", color: "rgb(255 255 255 / 50%)"}}
                  >Загрузка врачей</Button>
                </div>
                <div>
                  <Button className="button-menu-role" 
                      style={{textTransform: "none", fontWeight: "400", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px", color: "rgb(255 255 255 / 50%)"}} 
                  >{this.props.userNameDental} </Button>
                  
                  <Button outline  href="/" onClick={ () => this.props.logOutInput() } className="button-menu-role"
                      style={{textTransform: "none", fontWeight: "400", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px", color: "rgb(255 255 255 / 50%)"}}
                  >Выйти</Button>
                </div>
            </div>
          </div>
        );
    }
}