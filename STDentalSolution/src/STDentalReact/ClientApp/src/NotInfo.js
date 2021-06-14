import React, { Component } from 'react';
import oops from './Images/notinfo.png';

export class NotInfo extends Component{

    render() {
        return(
            <div style={{display: "flex", alignItems: "center", flexDirection: 'column'}}>
                <img src={oops} alt="notinfo"/>
            </div>
        );
    }
}