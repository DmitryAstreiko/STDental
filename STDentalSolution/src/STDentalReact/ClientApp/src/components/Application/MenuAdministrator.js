import React, { Component } from 'react';
import {
  //Collapse,
  Navbar,
  //NavbarToggler,
  //NavbarBrand,
  //Nav,
  NavItem,
  NavLink,
  //UncontrolledDropdown,
  //Dropdown,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem,
  //NavbarText
} from 'reactstrap';
//import Container from 'reactstrap/lib/Container';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';


export class MenuAdministrator extends Component{

    render() {
        return(
            <Navbar className="navbar-expand-lg navbar-toggleable-lg ng-white border-bottom box-shadow mb-3" light>
            {/*<Container>*/}
            <div>
                <ul className="navbar-nav flex-grow">
                <NavItem>
                <NavLink tag={Link} className="text-dark" to="/appdental/administrator/talons">Талоны</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/appdental/administrator/talons/add">Создать талон</NavLink>
                </NavItem>
                {/*<NavItem>
                <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" id="dropdownMenuVocabulary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Редактирование/удаление талона
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuVocabulary" x-placement="bottom-start" style={{position: "absolute", transform: "translate3d(0px, 38px, 0px)", top: "0px", left: "0px", willchange: "transform"}}>
                    <a className="dropdown-item" href="/">Редактировать</a>
                    <a className="dropdown-item" href="/">Удалить</a>
                  </div>
                </div>
                </NavItem>*/}
                <NavItem>
                <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" id="dropdownMenuReport" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Отчеты
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuReport" x-placement="bottom-start" style={{position: "absolute", transform: "translate3d(0px, 38px, 0px)", top: "0px", left: "0px", willchange: "transform"}}>
                    
                    <NavLink tag={Link} className="text-dark" to="/">Материалы за период</NavLink>
                    <a className="dropdown-item" href="/">Оплата за период (оплата)</a>
                    <a className="dropdown-item" href="/">Талоны за период</a>
                    <a className="dropdown-item" href="/">Остаток материалов</a>
                    <a className="dropdown-item" href="/">Задолженность на дату</a>
                    <a className="dropdown-item" href="/">Кол. пациентов по годам</a>
                  </div>
                </div>
                </NavItem>
                {/*<NavItem>
                <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" id="dropdownMenuVocabulary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Оплата
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuVocabulary" x-placement="bottom-start" style={{position: "absolute", transform: "translate3d(0px, 38px, 0px)", top: "0px", left: "0px", willchange: "transform"}}>
                    <a className="dropdown-item" href="/">Оплатить</a>
                    <a className="dropdown-item" href="/">Погашение задолженноси</a>
                    <a className="dropdown-item" href="/">История платежей</a>
                  </div>
                </div>
                </NavItem>*/}
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Прейскурант</NavLink>
                </NavItem>
                <NavItem>
                <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" id="dropdownMenuVocabulary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Справочники
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuVocabulary" x-placement="bottom-start" style={{position: "absolute", transform: "translate3d(0px, 38px, 0px)", top: "0px", left: "0px", willchange: "transform"}}>
                    <a className="dropdown-item" href="/appdental/administrator/patients">Пациенты</a>
                    <a className="dropdown-item" href="/">Сотрудники</a>
                  </div>
                </div>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Прием пациентов</NavLink>
                </NavItem>
              </ul>
              </div>           
            {/*</Container>*/}
            </Navbar>
        );
    }
}