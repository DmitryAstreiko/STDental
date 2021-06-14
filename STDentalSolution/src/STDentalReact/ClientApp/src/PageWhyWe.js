import React, { Component } from 'react';
import WhyAreWe from './Images/whywe.png';
import { MainMenu } from './MainMenu';

export class PageWhyWe extends Component {

  render () {
    return (
      <div>
        <div>
          <MainMenu />
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <img src={WhyAreWe} alt="WhyAreWe" style={{ width: "80%", margin: "20px" }}/>
        </div>
      </div>
    );
  }
}
