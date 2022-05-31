import React, { Component } from 'react';
import callPatientsImage from './Images/callpatients.png';

export class CallPatients extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {       
        return(
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={callPatientsImage} alt="callPatientsImage" style={{ width: "80%", margin: "20px" }}/>
        </div>
        );
    }
}