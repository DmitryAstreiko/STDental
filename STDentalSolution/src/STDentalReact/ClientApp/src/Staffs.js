import React, { Component } from 'react';
import staffs from './Images/staffs.png';

export class Staffs extends Component {

  render () {
    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={staffs} alt="staffs" style={{ width: "80%", margin: "20px" }}/>
        </div>
    );
  }
}
