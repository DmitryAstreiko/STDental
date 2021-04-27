import React, { Component } from 'react';
import Container from 'reactstrap/lib/Container';
import './MainHeader.css';

export class MainHeader extends Component{

    render() {
        return(
            <Container class="header-row">
                <div class="headerlogo">
                <a href="index.html">                    
                    <img src="images/logo.png" alt="Кристальная улыбка" 
                    width="100px" height="100px" />
                    <span>
                        Стоматологическая компания
                        <span>Кристальная улыбка</span>
                    </span>
                </a>
                <img src="/images/phone_blue.jpg" width="20" height="15"/> 
                    <a href="/">+375 17 322 33 22</a>
                    <span>- городской</span>
                </div>
                <div class="headercontact">
                <div>
                    <img src="images/phone_blue.jpg" width="20" height="15" /> 
                    <a href="/">+375 17 322 33 22</a>
                    <span>- городской</span>
                </div> 
                <div> 
                    <img src="images/phone_red.jpg" width="20" height="15" />
                    <a href="/">+375 29 322 33 22</a>
                    <span>- МТС</span>
                </div>   
                <div> 
                    <img src="images/phone_green.jpg" width="20" height="15" />
                    <a href="/">+375 29 322 33 22</a>
                    <span>- A1</span>
                </div>           
            </div>
            <div class="headeradress">
                <a href="/">
                    <img src="images/geolocation.jpg" width="90" height="58" />                
                    <span>г. Минск
                        <span>ул. Повстанцев, 66</span>
                    </span>
                </a>
            </div>


            </Container>

            /*
            
            
            <button type="button" class="headerbutton">
                <a href="startpage.html">Вход в кабинет</a>
            </button>
            </div>*/
        );
    }
}