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
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';


export class MenuAdministrator extends Component{

    render() {
        return(
            <Navbar className="navbar-expand-lg navbar-toggleable-lg ng-white border-bottom box-shadow mb-3" light>
            <Container>           
                <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/appdental/administrator/talons">Талоны</NavLink>
                  </NavItem>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Выписка талона</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Выписка талона</NavLink>
                </NavItem>
                <NavItem>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="dropdownMenuReport" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Отчеты
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuReport" x-placement="bottom-start" style={{position: "absolute", transform: "translate3d(0px, 38px, 0px)", top: "0px", left: "0px", willchange: "transform"}}>
                    
                    <NavLink tag={Link} className="text-dark" to="/">Материалы за период</NavLink>
                    <a class="dropdown-item" href="/">Оплата за период (оплата)</a>
                    <a class="dropdown-item" href="/">Талоны за период</a>
                    <a class="dropdown-item" href="/">Остаток материалов</a>
                    <a class="dropdown-item" href="/">Задолженность на дату</a>
                    <a class="dropdown-item" href="/">Кол. пациентов по годам</a>
                  </div>
                </div>
                </NavItem>
                <NavItem>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="dropdownMenuVocabulary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Оплата
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuVocabulary" x-placement="bottom-start" style={{position: "absolute", transform: "translate3d(0px, 38px, 0px)", top: "0px", left: "0px", willchange: "transform"}}>
                    <a class="dropdown-item" href="/">Оплатить</a>
                    <a class="dropdown-item" href="/">Погашение задолженноси</a>
                    <a class="dropdown-item" href="/">История платежей</a>
                  </div>
                </div>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Прейскурант</NavLink>
                </NavItem>
                <NavItem>
                <div class="dropdown">
                  <button class="btn dropdown-toggle" type="button" id="dropdownMenuVocabulary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Справочники
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuVocabulary" x-placement="bottom-start" style={{position: "absolute", transform: "translate3d(0px, 38px, 0px)", top: "0px", left: "0px", willchange: "transform"}}>
                    <a class="dropdown-item" href="/">Пациенты</a>
                    <a class="dropdown-item" href="/">Сотрудники</a>
                  </div>
                </div>
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