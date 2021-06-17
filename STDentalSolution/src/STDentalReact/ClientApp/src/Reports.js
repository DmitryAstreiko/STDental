import React, { Component } from 'react';
import reportAccountantImage from './Images/reportaccountant.png';
import reportDoctorImage from './Images/reportdoctor.png';
import reportHeadImage from './Images/reporthead.png';
import reportAdministratorImage from './Images/reportadministrator.png';

export class Reports extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {       
        return(
        <div>
            { this.props.roleAccountant && (
            <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                <img src={reportAccountantImage} alt="reportAccountantImage" style={{ width: "80%", margin: "20px" }}/>
            </div> )
            }
            { this.props.roleDoctor && (
            <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                <img src={reportDoctorImage} alt="reportDoctorImage" style={{ width: "80%", margin: "20px" }}/>
            </div> )
            }
            { this.props.roleHead && (
            <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                <img src={reportHeadImage} alt="reportHeadImage" style={{ width: "80%", margin: "20px" }}/>
            </div> )
            }
            { this.props.roleAdministrator && (
            <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                <img src={reportAdministratorImage} alt="reportAdministratorImage" style={{ width: "80%", margin: "20px" }}/>
            </div> )
            }
        </div>
        );
    }
}