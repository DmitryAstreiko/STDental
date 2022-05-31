import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@material-ui/core/Button';

export class MenuRoleHead extends Component{

    render() {
        return(
            <div className="menu-roles">
            <div class="d-flex justify-content-between">
                <div>
                    <Button onClick={ () => this.props.setFlagTalons() } >Талоны</Button>                
                    <Button onClick={ () => this.props.setFlagReports() } >Отчеты</Button>
                    <Button onClick={ () => this.props.setFlagServices() } >Прейскурант</Button>
                </div>
                <div>
                    <Button >{this.props.userNameDental} </Button>
                    <Button outline  href="/" onClick={ () => this.props.logOutInput() }>Выйти</Button>
                </div>
            </div>
        </div>
        );
    }
}