import React, { Component } from 'react';
import { MenuRoleHead } from './MenuRoleHead';
import AuthService from "./Authorization/auth.service";
import { Talons } from './Talons';
import { Services } from './Services';
import { Reports } from './Reports';

export default class RoleHead extends Component {
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
        return(
        <div>
            <div style={{ marginBottom: "10px" }}>
            <MenuRoleHead
                logOutInput={ () =>this.props.funcLogOut() } setFlagTalons={() => this.setFlagTalons()} setFlagServices={() => this.setFlagServices()} 
                setFlagReports={() => this.setFlagReports()} userNameDental={ this.state.userNameDental }/>
            </div>
            {this.state.showTalons && <Talons roleHead={true}/>}
            {this.state.showServices && <Services roleHead={true}/>}
            {this.state.showReports && <Reports roleHead={true}/>}
        </div>
        );
    }
}