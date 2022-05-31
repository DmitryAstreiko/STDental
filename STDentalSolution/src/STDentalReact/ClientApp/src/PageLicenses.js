import React, { Component } from 'react';
import license from './Images/licenses.png';
import { MainMenu } from './MainMenu';

export class PageLicenses extends Component {

  render () {
    return (
      <div>
        <div>
          <MainMenu />
        </div>
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={license} alt="license" style={{ width: "80%", margin: "20px" }}/>
        </div>
      </div>
    );
  }
}
