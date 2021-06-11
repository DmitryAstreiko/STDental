import React, { Component } from 'react';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { Services } from './components/Services';
import { Talons } from './components/Application/Talons';
import { TalonCUD } from './components/Application/TalonCUD'
import { MainHeader } from './components/MainHeader';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./components/Application/Authorization/services/auth.service";
import Login from "./components/Application/Authorization/login.component";
import Register from "./components/Application/Authorization/register.component";
import Administrator from "./components/Application/Administrator";
import Patients from "./components/Application/Patients";
import Doctor from "./components/Application/Doctor";
import Accountant from "./components/Application/Accountant";
import Head from "./components/Application/Head";
import { NavMenu } from './components/NavMenu';

import './custom.css'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      userNameDental: null,
      visibleMainMenu: true
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(`user = ${user}`);
    if (user) {
      this.setState({
        userNameDental: user
      });
    }
  }

  logOut() {
    this.setState({ userNameDental: null });
    AuthService.logout();    
  }

  closeMainMenu() {
    this.setState({ visibleMainMenu: false });
  }

  render () {
    const { userNameDental, visibleMainMenu} = this.state;

    return (
      <div>
        <MainHeader/>  
        {/*<NavMenu /> */}

        <nav className="navbar navbar-expand navbar-dark bg-dark">
          {visibleMainMenu} ? (
          <div className="navbar-nav mr-auto">            
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
          </div>
          

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Записаться на прием
              </Link>
            </li>
          </div>
          )
          
          {userNameDental ?
          (<div>
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
          </div>)
          :
          (<div>
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Войти
                  </Link>
                </li>
            </div>
          </div>)
          }

        </nav>        

        {/*<div className="container mt-3">*/}
        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path='/services' component={Services}/>
            <Route exact path='/whyme' component={Counter} />
            <Route exact path='/appdental/administrator/talons' component={Talons} />
            <Route exact path='/appdental/administrator/talons/add' component={TalonCUD} />
            <Route exact path='/appdental/administrator' component={ Administrator } />
            <Route exact path='/appdental/doctor' component={Doctor} />
            <Route exact path='/appdental/accountant' component={Accountant} />
            <Route exact path='/appdental/head' component={Head} />
            <Route exact path='/appdental/administrator/patients' component={Patients} />
          </Switch>
        </div>
      </div>
    );
  }
}
