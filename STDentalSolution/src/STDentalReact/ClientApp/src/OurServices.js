import React, { Component } from 'react';
import ourServices from './Images/ourservices.png';

export class OurServices extends Component {

  render () {
    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={ourServices} alt="ourServices" style={{ width: "80%", margin: "20px" }}/>
        </div>
    );
  }
}
