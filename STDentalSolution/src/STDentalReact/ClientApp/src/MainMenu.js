import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';


export class MainMenu extends Component{
    render() {
        return(
          <nav className="navbar navbar-expand navbar-dark bg-dark">
          
            <div className="navbar-nav mr-auto">            
              <li className="nav-item">
                <Link to={"/pageservices"} className="nav-link">
                    Наши услуги
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/pagewhywe"} className="nav-link">
                    Почему мы
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/pagedoctors"} className="nav-link">
                    Наши врачи
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/pagelicenses"} className="nav-link">
                    Сертификаты
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/pagecontacts"} className="nav-link">
                    Контакты - Reports BI
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
          </nav>
        );
    }
}