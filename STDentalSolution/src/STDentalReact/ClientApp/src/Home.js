import React, { Component } from 'react';
import functionality from './Images/functionality.png';
import aboutSystem from './Images/aboutsystem.png';
import softEnv from './Images/softwareenvironment.png';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <img src={aboutSystem} alt="aboutSystem" style={{ width: "80%", margin: "20px" }}/>
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <img src={functionality} alt="functionality" style={{ width: "80%", margin: "20px" }}/>
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <img src={softEnv} alt="softEnv" style={{ width: "80%", margin: "20px" }}/>
        </div>
      </div>
    );
  }
}
