import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import './MainHeader.css';
import logo from './Application/Images/logo.png';
import phonegreen from './Application/Images/phonegreen.jpg';
import phonered from './Application/Images/phonered.jpg';
import phoneblue from './Application/Images/phoneblue.jpg';
import geolocation from './Application/Images/geolocation.jpg';

export class MainHeader extends Component{
    static displayName = MainHeader.name;

    render() {
        return(
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <a href="/">                    
                                <img src={logo}
                                width="100px" height="100px" />  
                                </a>     
                            </Col>
                            <Col>
                            <Row>
                                Стоматологическая компания                            
                            </Row>
                            <Row>
                                Кристальная улыбка
                            </Row>
                            </Col>
                        </Row>                                               
                    </Col>
                    <Col>
                        <Row>
                            <img src={phoneblue} width="20" height="15" /> 
                            <a href="/contacts">+375 17 322 33 22 </a>
                            <span>&nbsp;- городской</span>
                        </Row>
                        <Row>
                            <img src={phoneblue} width="20" height="15" /> 
                            <a href="/contacts">+375 17 322 33 66 </a>
                            <span>&nbsp;- городской</span>
                        </Row>
                        <Row>
                            <img src={phonered} width="20" height="15" />
                            <a href="/contacts">+375 29 322 33 22 </a>
                            <span>&nbsp;- МТС</span>
                        </Row>
                        <Row>
                            <img src={phonegreen} width="20" height="15" />
                            <a href="/contacts">+375 29 322 33 22 </a>
                            <span>&nbsp;- A1</span>
                        </Row>
                        </Col>
                    <Col>                        
                        <img src={geolocation} width="90" height="58" /> 
                        <a href="/contacts">
                            <span>  г. Минск, ул. Повстанцев, 66</span>
                        </a>
                    </Col>
                </Row>           
            </Container>
        );
    }
}