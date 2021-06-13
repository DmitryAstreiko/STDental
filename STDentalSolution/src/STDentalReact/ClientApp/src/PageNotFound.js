import React, { Component } from 'react';
import oops from './Images/oops_404.jpg';

export class PageNotFound extends Component{

    /*constructor(props){
        super(props);
    }*/

    render() {
        return(
            <div style={{display: "flex", alignItems: "center", flexDirection: 'column'}}>
                <img src={oops} alt="oops"/>
            </div>
        )
    }
}