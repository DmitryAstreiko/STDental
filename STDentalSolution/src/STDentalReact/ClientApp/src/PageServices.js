import React, { Component } from 'react';
import ourServices from './Images/ourservices.png';
import { MainMenu } from './MainMenu';

export class PageServices extends Component {

  render () {
    return (
      <div>
        <div>
          <MainMenu />
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={ourServices} alt="ourServices" style={{ width: "80%", margin: "20px" }}/>
        </div>
      </div>
    );
  }
}
