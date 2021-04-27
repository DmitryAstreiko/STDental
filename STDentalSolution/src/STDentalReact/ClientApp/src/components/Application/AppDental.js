import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import { Link } from 'react-router-dom';


export class AppDental extends Component{

    render() {
        return(
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
            <Container>
                <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink>Талоны</NavLink>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/appdental/talons">Просмотр талонов</NavLink>
                    <NavLink tag={Link} className="text-dark" to="/">Выписка талонов</NavLink>
                  </NavItem>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Отчеты</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Прейскурант</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Справочники</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Прием пациентов</NavLink>
                </NavItem>
              </ul>
            </Container>
            </Navbar>
        );
    }
}