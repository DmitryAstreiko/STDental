import React, { Component } from 'react';
import { Talons } from './Talons';
import { TalonCUD } from './TalonCUD';
import Patients from './Patients';
import { Receptions } from './Receptions';
import { MenuRoleAdministrator } from './MenuRoleAdministrator';
import AuthService from "./Authorization/auth.service";

export default class RoleAdministrator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTalons: true,
            showAddTalon: false,
            showReception: false,
            showPatients: false,
            userNameDental: false,
            userIdDental: false
        };
    };

    setFlagTalons() {
        this.setState({ showTalons: true });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
    };

    setFlagAddTalon() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: true });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
    };

    setFlagReception() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: true });
        this.setState({ showPatients: false });
    };

    setFlagPatients() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: true });
    };

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
        this.setState({ userNameDental: user });
        }

        const staffId = AuthService.getCurrentStaffId();
        if (staffId) {
        this.setState({ userIdDental: staffId });
        };
    };

    render() {
        const logOutInput = () => {this.props.funcLogOut()};
        const setFlagTalons = () => {this.setFlagTalons()};
        const setFlagAddTalon = () => {this.setFlagAddTalon()};
        const setFlagReception = () => {this.setFlagReception()};
        const setFlagPatients = () => {this.setFlagPatients()};
        return(
        <div>
            <div style={{ marginBottom: "10px" }}>
            <MenuRoleAdministrator
                logOutInput={ logOutInput } setFlagTalons={setFlagTalons} setFlagAddTalon={setFlagAddTalon} setFlagReception={setFlagReception}
                userNameDental={ this.state.userNameDental } setFlagPatients={setFlagPatients}/>
            </div>
            {this.state.showTalons && <Talons roleAdministrator={true} />}
            {this.state.showAddTalon && <TalonCUD vabelButtonSave={'Сохранить'} flagTalonCreate={true}/>}
            {this.state.showReception && <Receptions />}
            {this.state.showPatients && <Patients />}
        </div>
        );
    }
}