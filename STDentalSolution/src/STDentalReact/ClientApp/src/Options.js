import React, { Component } from 'react';
import optionsImage from './Images/options.png';

export class Options extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {       
        return(
        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
            <img src={optionsImage} alt="optionsImage" style={{ width: "80%", margin: "20px" }}/>
        </div>
        );
    }
}