import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "./auth.service";
import loginUser from '../Images/login.jpg';
import { MainMenu } from '../MainMenu';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Поле должно быть заполнено.
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {    

          
          
          switch (AuthService.getCurrentRole()){
            case 1:  //Admin
              this.props.history.push("/appdental/admin");
              window.location.reload();
            break;
            case 2:  //Administrator
              this.props.history.push("/appdental/administrator");
              window.location.reload();
            break;
            case 3:  //Doctor
              this.props.history.push("/appdental/doctor");
              window.location.reload();
            break;
            case 4:  //Accountant
              this.props.history.push("/appdental/accountant");
              window.location.reload();
            break;
            case 5:  //Head
              this.props.history.push("/appdental/head");
              window.location.reload();
            break;
            default:
              //this.props.history.push("/login");
              this.setState({ 
                loading: false,
                message: `Не правильный логин или пароль!`
              })
          }          
          //window.location.reload();

        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } 
    else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <MainMenu />
        </div>
        <div className="col-md-12">
          <div className="card card-container">
            <img
              //src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              src={loginUser}
              alt="profile-img"
              className="profile-img-card"
            />

            <Form
              onSubmit={this.handleLogin}
              ref={c => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="username">Логин</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Войти</span>
                </button>
              </div>

              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
