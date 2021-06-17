import React, { Component } from 'react';
import groupServicesImage from './Images/groupservices.png';

export class GroupServices extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {       
        return(
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={groupServicesImage} alt="groupServicesImage" style={{ width: "80%", margin: "20px" }}/>
        </div>
        );
    }
}