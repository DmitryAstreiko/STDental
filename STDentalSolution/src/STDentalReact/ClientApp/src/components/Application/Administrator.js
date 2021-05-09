import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { MenuAdministrator } from './MenuAdministrator';

export default class Administrator extends Component {
    render() {
        return(
        <div>
            <MenuAdministrator />
            <Container>
                {this.props.children}
            </Container>            
        </div>
        );
    }
}