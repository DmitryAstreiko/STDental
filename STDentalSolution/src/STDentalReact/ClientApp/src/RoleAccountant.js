import React, { Component } from 'react';
import { MenuRoleAccountant } from './MenuRoleAccountant';
import AuthService from "./Authorization/auth.service";
import { Talons } from './Talons';
import { Services } from './Services';
import { Reports } from './Reports';

export default class RoleAccountant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTalons: true,
            showServices: false,
            userNameDental: false,
            userIdDental: false,
            showReports: false
        };
    }

    setFlagTalons() {
        this.setState({ showTalons: true });
        this.setState({ showServices: false });
        this.setState({ showReports: false });
    }

    setFlagServices() {
        this.setState({ showTalons: false });
        this.setState({ showServices: true });
        this.setState({ showReports: false });
    }

    setFlagReports() {
        this.setState({ showTalons: false });
        this.setState({ showServices: false });
        this.setState({ showReports: true });
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
        this.setState({ userNameDental: user });
        }
    }

    render() {
        const logOutInput = () => {this.props.funcLogOut()};
        const setFlagTalons = () => {this.setFlagTalons()};
        const setFlagServices = () => {this.setFlagServices()};
        const setFlagReports = () => {this.setFlagReports()};
        return(
        <div>
            <div style={{ marginBottom: "10px" }}>
            <MenuRoleAccountant
                logOutInput={ logOutInput } setFlagTalons={setFlagTalons} setFlagServices={setFlagServices} setFlagReports={setFlagReports} 
                userNameDental={ this.state.userNameDental }/>
            </div>
            {this.state.showTalons && <Talons roleAccountant={true}/>}
            {this.state.showServices && <Services />}
            {this.state.showReports && <Reports />}
        </div>
        );
    }
}