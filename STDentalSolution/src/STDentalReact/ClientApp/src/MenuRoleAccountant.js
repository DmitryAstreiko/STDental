import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@material-ui/core/Button';

export class MenuRoleAccountant extends Component{

    render() {
        return(
          <div style={{ backgroundColor: "#eaebec", height: "50px" }}>
          <div class="d-flex justify-content-between">
              <div>
                  <Button onClick={ () => this.props.setFlagTalons() } 
                      style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px"}}
                  >Талоны</Button>                
                  <Button onClick={ () => this.props.setFlagReports() } 
                      style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px"}} 
                  >Отчеты</Button>
                  <Button onClick={ () => this.props.setFlagServices() } 
                      style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px"}}
                  >Прейскурант</Button>
              </div>
              <div>
                  <Button className="button-menu-role" 
                      style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px"}} 
                  >{this.props.userNameDental} </Button>
                  <Button outline  href="/" onClick={ () => this.props.logOutInput() } className="button-menu-role"
                      style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px"}}
                  >Выйти</Button>
              </div>
          </div>
      </div>
        );
    }
}