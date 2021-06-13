import React, { Component } from 'react';
import license from './Images/licenses.png';

export class Licenses extends Component {

  render () {
    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={license} alt="license" style={{ width: "80%", margin: "20px" }}/>
        </div>
    );
  }
}
