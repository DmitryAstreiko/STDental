import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { MenuHead } from './MenuHead';

export default class Head extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return(
        <div>
            <MenuHead />
            <div>
                {this.props.children}
            </div>           
        </div>
        );
    }
}