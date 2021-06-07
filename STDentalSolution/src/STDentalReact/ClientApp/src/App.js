import React, { Component } from 'react';
/*import { Route } from 'react-router';*/
//import { Layout } from './components/Layout';
import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {Services} from './components/Services';
//import {AuthUser} from './components/Application/AuthUser';
import { Talons } from './components/Application/Talons';
import { TalonCUD } from './components/Application/TalonCUD'
//import {Contacts} from './components/Application/Contacts';
//import { NavMenu } from './components/NavMenu';
//import { MenuDental } from './components/Application/MenuDental';
import { MainHeader } from './components/MainHeader';

import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
/*import Home from "./components/home.component";*/
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Administrator from "./components/Application/Administrator";
import Patients from "./components/Application/Patients";
import Doctor from "./components/Application/Doctor";
import Accountant from "./components/Application/Accountant";
import Head from "./components/Application/Head";

import './custom.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render () {
    //const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div>
        <MainHeader/>  
        {/*<NavMenu />*/}
        {/*<MenuDental />*/}

        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/appdental/administrator"} className="nav-link">
                Администратор
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/appdental/doctor"} className="nav-link">
                Врач
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/appdental/accountant"} className="nav-link">
                Бухгалтер
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/appdental/head"} className="nav-link">
                Руководитель
              </Link>
            </li>
            {/*<li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>*/}
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            
            {/*<li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/services"} className="nav-link">
                _Наши услуги
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/whyme"} className="nav-link">
                _Почему мы
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/doctors"} className="nav-link">
                _Наши врачи
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/licenses"} className="nav-link">
                _Лицензии
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/contacts"} className="nav-link">
                _Контакты
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/appdental/talons"} className="nav-link">
                -Талоны
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/appdental/createtalon"} className="nav-link">
                -Выписка талонов
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}*/}
          </div>

          {/*{currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Записаться на прием
                </Link>
              </li>
              
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Войти
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Регистрация
                </Link>
              </li>
            </div>
          )}*/}
        </nav>        

        {/*<div className="container mt-3">*/}
        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path='/services' Component={Services}/>
            <Route exact path='/whyme' component={Counter} />
            <Route exact path='/appdental/administrator/talons' component={Talons} />
            <Route exact path='/appdental/administrator/talons/add' component={TalonCUD} />
            <Route exact path='/appdental/administrator' component={Administrator} />
            <Route exact path='/appdental/doctor' component={Doctor} />
            <Route exact path='/appdental/accountant' component={Accountant} />
            <Route exact path='/appdental/head' component={Head} />
            <Route exact path='/appdental/administrator/patients' component={Patients} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
        /*<Layout>
          <MenuDental />
          <Route path='/appdental/talons' component={Talons} />      

          <NavMenu />
          <Route exact path='/' component={Home} />
          <Route path='/services' Component={Services}/>
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
          <Route path='/authUser' component={AuthUser} />
          <Route path='/contacts' component={Contacts} /> 
        
      </Layout>*/
    );
  }
}
