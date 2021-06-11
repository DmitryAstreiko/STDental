import React, { Component } from 'react';
import {
  Navbar,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';


export class MenuAccountant extends Component{

    render() {
        return(
            <Navbar className="navbar-expand-lg navbar-toggleable-lg ng-white border-bottom box-shadow mb-3" light>
            <div>
                <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/appdental/administrator/talons">Талоны</NavLink>
                </NavItem>
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
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Прейскурант</NavLink>
                </NavItem>
              </ul>
              </div>          
            </Navbar>
        );
    }
}