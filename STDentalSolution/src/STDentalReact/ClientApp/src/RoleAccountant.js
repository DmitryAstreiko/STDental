import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { MenuRoleAccountant } from './MenuRoleAccountant';

export default class RoleAccountant extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return(
        <div>
            <MenuRoleAccountant />
            {/*<Container>*/}
            <div>
                {this.props.children}
            </div>
            {/*</Container>*/}            
        </div>
        );
    }
}