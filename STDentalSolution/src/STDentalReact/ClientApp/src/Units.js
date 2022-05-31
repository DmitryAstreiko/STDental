import React, { Component } from 'react';
import unitsImage from './Images/units.png';

export class Units extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {       
        return(
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={unitsImage} alt="unitsImage" style={{ width: "80%", margin: "20px" }}/>
        </div>
        );
    }
}