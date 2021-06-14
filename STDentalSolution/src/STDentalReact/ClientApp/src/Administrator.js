import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { MenuAdministrator } from './MenuAdministrator';

export default class Administrator extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        const logOutInput = () => {this.props.funcLogOut()}
        return(
        <div>
            <MenuAdministrator logOutInput={ logOutInput }/>
            {/*<Container>*/}
            <div>
                {this.props.children}
            </div>
            {/*</Container>*/}            
        </div>
        );
    }
}