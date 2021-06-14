import React, { Component } from 'react';
import { Home } from './Home';
import { MainHeader } from './MainHeader';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./Authorization/auth.service";
import Login from "./Authorization/login.component";
import Register from "./Authorization/register.component";
import RoleAdministrator from "./RoleAdministrator";
import Patients from "./Patients";
import RoleDoctor from "./RoleDoctor";
import RoleAccountant from "./RoleAccountant";
import Head from "./Head";
import { OurServices } from './OurServices';
import { WhyWe } from './WhyWe';
import { Staffs } from './Staffs';
import { Licenses } from './Licenses';
import { ContactsOrg } from './Contacts';
import { Receptions } from './Receptions';

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

    const flag = AuthService.getFlagAutorization();
    
    if (flag) {
      this.setState({ flagAutorization: true });

      /*switch (AuthService.getCurrentRole()){
        case 1:  //Admin
          this.props.history.push("/appdental/admin");
        break;
        case 2:  //Administrator
          this.props.history.push("/appdental/administrator");
        break;
        case 3:  //Doctor
          this.props.history.push("/appdental/doctor");
        break;
        case 4:  //Accountant
          this.props.history.push("/appdental/accountant");
        break;
        case 5:  //Head
          this.props.history.push("/appdental/head");
        break;
        default:
          this.props.history.push("/login");
      }          
      window.location.reload();
      */
    } 
    else {
      this.setState({ flagAutorization: false });
    }       
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
                  Наши услуги
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/whywe"} className="nav-link">
                  Почему мы
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/doctors"} className="nav-link">
                  Наши врачи
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/licenses"} className="nav-link">
                  Сертификаты
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/contacts"} className="nav-link">
                  Контакты
              </Link>
            </li>            
          </div>
          

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/reception"} className="nav-link">
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
            <Route exact path="/doctors" component={Staffs} />
            <Route exact path='/services' component={OurServices}/>
            <Route exact path='/licenses' component={Licenses}/>
            <Route exact path='/whywe' component={WhyWe} />
            <Route exact path='/contacts' component={ContactsOrg} />
            <Route exact path='/reception' component={Receptions} />

            <Route exact path='/appdental/administrator'>
              <RoleAdministrator funcLogOut={ logOut }/>
            </Route>
            <Route exact path='/appdental/doctor'>
              <RoleDoctor funcLogOut={ logOut } />
            </Route>
            <Route exact path='/appdental/accountant'>
              <RoleAccountant funcLogOut={ logOut }/>
            </Route>
            <Route exact path='/appdental/head' component={Head} />
          </Switch>
        </div>
      </div>
    );
  }
}
