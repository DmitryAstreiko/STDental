import React, { Component } from 'react';
import staffs from './Images/staffs.png';
import { MainMenu } from './MainMenu';

export class PageDoctors extends Component {

  render () {
    return (
      <div>
        <div>
          <MainMenu />
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={staffs} alt="staffs" style={{ width: "80%", margin: "20px" }}/>
        </div>
      </div>
    );
  }
}
