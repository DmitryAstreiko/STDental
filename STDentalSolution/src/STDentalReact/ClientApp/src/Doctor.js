import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { MenuDoctor } from './MenuDoctor';

export default class Doctor extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return(
        <div>
            <MenuDoctor />
            {/*<Container>*/}
            <div>
                {this.props.children}
            </div>
            {/*</Container>*/}            
        </div>
        );
    }
}