import React, { Component } from 'react';
import receptionOrg from './Images/reception.png';

export class Receptions extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {       
        return(
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={receptionOrg} alt="receptionOrg" style={{ width: "80%", margin: "20px" }}/>
        </div>
        );
    }
}