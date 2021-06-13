import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@material-ui/core/Button';

export class MenuDoctor extends Component{
constructor(props) {
    super(props);
}

logOut() {
    this.props.logOutInput();       
}

render() {
    return(
        <div style={{ backgroundColor: "#eaebec", height: "50px" }}>
            <div class="d-flex justify-content-between">
                <div>
                    <Button onClick={ () => this.props.setFlagTalons() } 
                        style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px"}}
                    >Талоны</Button>
                    <Button onClick={ () => this.props.setFlagAddTalon() } variant="text" 
                        style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px"}} 
                    >Добавить талон</Button>
                    <Button onClick={ () => this.props.setFlagReception() } 
                        style={{textTransform: "none", padding: ".375rem .75rem", fontSize: "1rem", marginTop: "5px", letterSpacing: "0px"}}
                    >Прием пациентов</Button>
                    {/*<button type="button" class="btn btn-outline-info" >qwewqe</button>*/}
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