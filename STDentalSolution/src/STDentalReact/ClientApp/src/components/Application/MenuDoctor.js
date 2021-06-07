import React, { Component } from 'react';
import {
  Navbar,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';


export class MenuDoctor extends Component{

    render() {
        return(
            <Navbar className="navbar-expand-lg navbar-toggleable-lg ng-white border-bottom box-shadow mb-3" light>
            <div>
                <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/appdental/administrator/talons">Талоны</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/appdental/administrator/talons/add">Создать талон</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Прием пациентов</NavLink>
                </NavItem>
              </ul>
              </div>           
            </Navbar>
        );
    }
}