import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { MenuDoctor } from './MenuDoctor';

export default class Doctor extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        const logOutInput = () => {this.props.funcLogOut()}
        return(
        <div>
            <MenuDoctor logOutInput={ logOutInput }/>
            {/*<Container>*/}
            <div>
                {this.props.children}
            </div>
            {/*</Container>*/}            
        </div>
        );
    }
}