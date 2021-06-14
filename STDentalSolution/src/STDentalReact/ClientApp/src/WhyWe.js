import React, { Component } from 'react';
import WhyAreWe from './Images/whywe.png';

export class WhyWe extends Component {

  render () {
    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={WhyAreWe} alt="WhyAreWe" style={{ width: "80%", margin: "20px" }}/>
        </div>
    );
  }
}
