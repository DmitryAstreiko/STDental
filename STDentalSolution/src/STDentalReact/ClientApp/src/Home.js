import React, { Component } from 'react';
import functionality from './Images/functionality.png';
import aboutSystem from './Images/aboutsystem.png';
import softEnv from './Images/softwareenvironment.png';
import roleAdministrator from './Images/roleadministrator.png';
import roleHead from './Images/rolehead.png';
import roleAccountant from './Images/roleaccountant.png';
import roleDoctor from './Images/roledoctor.png';

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
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <img src={roleAdministrator} alt="roleAdministrator" style={{ width: "80%", margin: "20px" }}/>
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <img src={roleHead} alt="roleHead" style={{ width: "80%", margin: "20px" }}/>
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <img src={roleAccountant} alt="roleAccountant" style={{ width: "80%", margin: "20px" }}/>
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
          <img src={roleDoctor} alt="roleDoctor" style={{ width: "80%", margin: "20px" }}/>
        </div>
      </div>
    );
  }
}
