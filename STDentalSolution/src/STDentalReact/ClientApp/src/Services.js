import React, { Component } from 'react';
import  servicesAccountantImage  from './Images/servicesaccountant.png';
import  servicesHeadImage  from './Images/serviceshead.png';

export class Services extends Component{

    render(){
        return(
            <div>
                {
                    this.props.roleHead && (
                        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                            <img src={servicesHeadImage} alt="servicesHeadImage" style={{ width: "80%", margin: "20px" }}/>
                        </div>
                    )
                }
                {
                    this.props.roleAccountant && (
                    <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                        <img src={servicesAccountantImage} alt="servicesAccountantImage" style={{ width: "80%", margin: "20px" }}/>
                    </div>
                    )
                }
            </div>
            );
    }
}