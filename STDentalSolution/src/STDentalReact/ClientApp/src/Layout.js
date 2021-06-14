import React, { Component } from 'react';
//import { Container, Row, Col } from 'reactstrap';
//import { NavMenu } from './NavMenu';
import { MainHeader } from './MainHeader';
//import { MenuDental } from './Application/MenuDental';

export class Layout extends Component {
  /*static displayName = Layout.name;*/

  render () {
    return (
      <div>
        <MainHeader/>        
        {/*<Container>*/}
        <div>
          {this.props.children}
        </div>
        {/*</Container>*/}
      </div>
    );
  }
}
