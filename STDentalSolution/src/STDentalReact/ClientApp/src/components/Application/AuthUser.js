import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { Link, Redirect  } from 'react-router-dom';

export class AuthUser extends Component{
  constructor(props) {
    super(props);

    this.state = { redirect: false };
  }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/appdental' push></Redirect>
    }
  }   


  render () {
    return (
        <Form class="form-auth">
        <div class="mb-3">
          <label for="login" class="form-label">Логин</label>
          <input type="text" class="form-control" id="login" name="login" placeholder="Введите логин"/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input type="password" class="form-control" id="password" name="password" placeholder="Введите пароль"/>
        </div>
        <div>
        <button type="submit" class="btn btn-primary" onClick={this.setRedirect}>Войти</button>
        {this.renderRedirect()}
        <button type="button" class="btn btn-primary" onClick={this.setRedirect}>Назад</button>
        </div>           
      </Form> 
    );
  }   
}