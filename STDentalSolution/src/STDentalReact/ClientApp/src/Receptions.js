import React, { Component } from 'react';
import receptionOrg from './Images/reception.png';
import receptionInsideImage from './Images/receptioninside.png';

export class Receptions extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {       
        return(
            <div>
                {
                    (this.props.roleInside) ? (
                        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                            <img src={receptionInsideImage} alt="receptionInsideImage" style={{ width: "80%", margin: "20px" }}/>
                        </div>
                    ) :
                    (
                        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                            <img src={receptionOrg} alt="receptionOrg" style={{ width: "80%", margin: "20px" }}/>
                        </div>
                    )
                }
            </div>
        );
    }
}