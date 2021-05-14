import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { MenuAdministrator } from './MenuAdministrator';

export default class Administrator extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return(
        <div>
            <MenuAdministrator />
            {/*<Container>*/}
            <div>
                {this.props.children}
            </div>
            {/*</Container>*/}            
        </div>
        );
    }
}