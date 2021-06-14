import React, { Component } from 'react';
import { Navbar, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import AuthService from "./Authorization/auth.service";

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
            <Navbar className="navbar-expand-lg navbar-toggleable-lg ng-white border-bottom box-shadow mb-3" light>
            <div>
                <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/appdental/doctor/talons">Талоны</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/appdental/doctor/talons/add">Создать талон</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Прием пациентов</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="text-dark">{this.state.userNameDental}</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/" onClick={() => this.logOut()}>Выйти</NavLink>
                </NavItem>
              </ul>
              </div>           
            </Navbar>
        );
    }
}