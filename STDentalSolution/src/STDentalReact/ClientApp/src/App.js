import React, { Component } from 'react';
import { PageHome } from './PageHome';
//import { MainHeader } from './MainHeader';
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./Authorization/auth.service";
import Login from "./Authorization/login.component";
//import Register from "./Authorization/register.component";
import RoleAdministrator from "./RoleAdministrator";
import RoleDoctor from "./RoleDoctor";
import RoleAccountant from "./RoleAccountant";
import RoleHead from "./RoleHead";
import { PageServices } from './PageServices';
import { PageWhyWe } from './PageWhyWe';
import { PageDoctors } from './PageDoctors';
import { PageLicenses } from './PageLicenses';
import { PageContacts } from './PageContacts';
import { Receptions } from './Receptions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
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
    AuthService.logout();  
  }

  render () {
    const logOut = () => { this.logOut() };
    return (
      <div>
        {/*<MainHeader/>*/}  

        {/*<div className="container mt-3">*/}
        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={PageHome} />
            <Route exact path="/login" component={Login} />
            <Route exact path='/reception' component={Receptions} />
            {/*<Route exact path="/register" component={Register} />*/}

            <Route exact path="/pagedoctors" component={PageDoctors} />
            <Route exact path='/pageServices' component={PageServices}/>
            <Route exact path='/pagelicenses' component={PageLicenses}/>
            <Route exact path='/pagewhywe' component={PageWhyWe} />
            <Route exact path='/pagecontacts' component={PageContacts} />                       

            <Route exact path='/appdental/administrator'>
              <RoleAdministrator funcLogOut={ logOut }/>
            </Route>
            <Route exact path='/appdental/doctor'>
              <RoleDoctor funcLogOut={ logOut } />
            </Route>
            <Route exact path='/appdental/accountant'>
              <RoleAccountant funcLogOut={ logOut }/>
            </Route>
            <Route exact path='/appdental/head'>
              <RoleHead funcLogOut={ logOut }/>
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}
