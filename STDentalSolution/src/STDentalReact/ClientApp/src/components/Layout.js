import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { MainHeader } from './MainHeader';

export class Layout extends Component {
  /*static displayName = Layout.name;*/

  render () {
    return (
      <div>
        <MainHeader/>
        <NavMenu />
        <Container>
              {this.props.children}
        </Container>
      </div>
    );
  }
}
