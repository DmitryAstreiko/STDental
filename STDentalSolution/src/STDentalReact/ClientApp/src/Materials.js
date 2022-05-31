import React, { Component } from 'react';
import materialsImage from './Images/materials.png';

export class Materials extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {       
        return(
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={materialsImage} alt="materialsImage" style={{ width: "80%", margin: "20px" }}/>
        </div>
        );
    }
}