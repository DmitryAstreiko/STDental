import React, { Component } from 'react';
import groupDoctorsImage from './Images/doctors.png';

export class Doctors extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {       
        return(
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={groupDoctorsImage} alt="groupDoctorsImage" style={{ width: "80%", margin: "20px" }}/>
        </div>
        );
    }
}