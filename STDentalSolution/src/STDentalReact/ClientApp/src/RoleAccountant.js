import React, { Component } from 'react';
import { MenuRoleAccountant } from './MenuRoleAccountant';
import AuthService from "./Authorization/auth.service";
import { Talons } from './Talons';
import { Services } from './Services';
import { Reports } from './Reports';
import { Materials } from './Materials';
import { Units } from './Units';

export default class RoleAccountant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTalons: true,
            showServices: false,
            userNameDental: false,
            userIdDental: false,
            showReports: false,
            showMaterials: false,
            showUnits: false
        };
    }

    setFlagTalons() {
        this.setState({ showTalons: true });
        this.setState({ showServices: false });
        this.setState({ showReports: false });
        this.setState({ showMaterials: false });
        this.setState({ showUnits: false });
    }

    setFlagServices() {
        this.setState({ showTalons: false });
        this.setState({ showServices: true });
        this.setState({ showReports: false });
        this.setState({ showMaterials: false });
        this.setState({ showUnits: false });
    }

    setFlagReports() {
        this.setState({ showTalons: false });
        this.setState({ showServices: false });
        this.setState({ showReports: true });
        this.setState({ showMaterials: false });
        this.setState({ showUnits: false });
    }

    setFlagMaterials() {
        this.setState({ showTalons: false });
        this.setState({ showServices: false });
        this.setState({ showReports: false });
        this.setState({ showMaterials: true });
        this.setState({ showUnits: false });
    }

    setFlagUnits() {
        this.setState({ showTalons: false });
        this.setState({ showServices: false });
        this.setState({ showReports: false });
        this.setState({ showMaterials: false });
        this.setState({ showUnits: true });
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
        this.setState({ userNameDental: user });
        }
    }

    render() {

        return(
        <div>
            <div style={{ marginBottom: "10px" }}>
            <MenuRoleAccountant
                logOutInput={ () => this.props.funcLogOut() } setFlagTalons={() => this.setFlagTalons()} setFlagServices={() => this.setFlagServices()} 
                setFlagReports={() => this.setFlagReports()} userNameDental={ this.state.userNameDental } setFlagMaterials={() => this.setFlagMaterials()} 
                setFlagUnits={() => this.setFlagUnits()}/>
            </div>
            {this.state.showTalons && <Talons roleAccountant={true}/>}
            {this.state.showServices && <Services roleAccountant={true}/>}
            {this.state.showReports && <Reports roleAccountant={true}/>}
            {this.state.showMaterials && <Materials />}
            {this.state.showUnits && <Units />}
        </div>
        );
    }
}