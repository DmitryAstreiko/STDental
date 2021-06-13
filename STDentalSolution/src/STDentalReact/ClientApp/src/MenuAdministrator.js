import React, { Component } from 'react';
import {  Navbar,  NavItem,  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import AuthService from "./Authorization/auth.service";
import { Button } from 'bootstrap';

export class MenuAdministrator extends Component{
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
    console.log(`logOut-MenuAdmin.js`); 
    this.props.logOutInput();       
  }

    render() {
      const { userNameDental } = this.state;
        return(
          <div>
            <div>
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
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuReport" x-placement="bottom-start" style={{position: "absolute", 
                      transform: "translate3d(0px, 38px, 0px)", top: "0px", left: "0px", willchange: "transform"}}>
                      
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

                  <NavItem>
                    <NavLink className="text-dark">{userNameDental}</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/" onClick={() => this.logOut()}>Выйти</NavLink>
                  </NavItem>
                 
                </ul>
                </div>           
              {/*</Container>*/}
              </Navbar>
            </div>
            <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">          
              <div className="navbar-nav mr-auto">            
                <li className="nav-item">
                  <Link to={"/appdental/administrator/talons"} className="nav-link">
                    Талоны
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/appdental/administrator/talons/add"} className="nav-link">
                    Создать талон
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/appdental/administrator/reports"} className="nav-link">
                    Отчеты
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/appdental/administrator/services"} className="nav-link">
                    Прейскурант
                  </Link>
                </li>

                <li className="nav-item">
                  
                  <Link to={"/contacts"} className="nav-link">
                      Справочники1
                    </Link>
                </li>  

                <li className="nav-item">
                  <Link to={"/appdental/administrator/receptions"} className="nav-link">
                    Прием пациентов
                  </Link>
                </li> 
         
              </div> 

              <div>
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link">{userNameDental}</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/"} className="nav-link" onClick={() => this.logOut()}>
                        Выйти
                      </Link>
                    </li>
                </div>
              </div>

            </nav>
            </div>
          </div>

        );
    }
}