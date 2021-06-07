import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { MenuAccountant } from './MenuAccountant';

export default class Accountant extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return(
        <div>
            <MenuAccountant />
            {/*<Container>*/}
            <div>
                {this.props.children}
            </div>
            {/*</Container>*/}            
        </div>
        );
    }
}