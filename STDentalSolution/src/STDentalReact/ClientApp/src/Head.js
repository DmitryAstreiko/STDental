import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { MenuMain } from './MenuMain';

export default class Head extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return(
        <div>
            <MenuMain />
            <div>
                {this.props.children}
            </div>           
        </div>
        );
    }
}