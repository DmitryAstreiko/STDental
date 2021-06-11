import React, { Component } from 'react';
import { Home } from './Home';
import { Services } from './Services';
import { Talons } from './Talons';
import { TalonCUD } from './TalonCUD'
import { MainHeader } from './MainHeader';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./Authorization/auth.service";
import Login from "./Authorization/login.component";
import Register from "./Authorization/register.component";
import Administrator from "./Administrator";
import Patients from "./Patients";
import Doctor from "./Doctor";
import Accountant from "./Accountant";
import Head from "./Head";

import './custom.css'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      //userNameDental: false,
      flagAutorization: false
    };
  }

  componentDidMount() {
    /*const user = AuthService.getCurrentUser();
    console.log(`user = ${user}`);
    if (user) {
      this.setState({ userNameDental: user });
    };*/

    const flag = AuthService.getFlagAutorization();
    console.log(`flag = ${flag}`);
    this.setState({ flagAutorization: flag });
    console.log(`FlagAutorization = ${this.state.flagAutorization}`);    
  }

  logOut() {
    this.setState({ flagAutorization: false });
    AuthService.logout();    
  }

  render () {
    const { flagAutorization } = this.state;
    const logOut = () => { this.logOut() };
    return (
      <div>
        <MainHeader/>  
        {/*<NavMenu /> */}
        { !flagAutorization && (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          
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

          <div>
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Войти
                  </Link>
                </li>
            </div>
          </div>
          

          {/*{userNameDental ?
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
          }*/}

        </nav>
        )    
        }    

        {/*<div className="container mt-3">*/}
        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path='/services' component={Services}/>
            <Route exact path='/whyme' component={Services} />
            <Route exact path='/appdental/administrator/talons' component={Talons} />
            <Route exact path='/appdental/administrator/talons/add' component={TalonCUD} />
            {/*<Route exact path='/appdental/administrator' component={ Administrator } />*/}
            <Route exact path='/appdental/administrator'>
              <Administrator logOut={logOut}/>
            </Route>
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
