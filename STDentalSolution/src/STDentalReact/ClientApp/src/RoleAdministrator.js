import React, { Component } from 'react';
import { Talons } from './Talons';
import { TalonCUD } from './TalonCUD';
import Patients from './Patients';
import { Receptions } from './Receptions';
import { MenuRoleAdministrator } from './MenuRoleAdministrator';
import AuthService from './Authorization/auth.service';
import { GroupServices } from './GroupServices';
import { Reports } from './Reports';
import { Services } from './Services';
import { Doctors } from './Doctors';
import { CallPatients } from './CallPatients';
import { Options } from './Options';


export default class RoleAdministrator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTalons: true,
            showAddTalon: false,
            showReception: false,
            showPatients: false,
            userNameDental: false,
            userIdDental: false,
            showGroupServices: false,
            showReports: false,
            showServices: false,
            showDoctors: false,
            showCallPatients: false,
            showOptions: false
        };
    };

    setFlagTalons() {
        this.setState({ showTalons: true });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
        this.setState({ showGroupServices: false });
        this.setState({ showReports: false });
        this.setState({ showServices: false });
        this.setState({ showDoctors: false });
        this.setState({ showCallPatients: false });
        this.setState({ showOptions: false });
    };

    setFlagAddTalon() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: true });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
        this.setState({ showGroupServices: false });
        this.setState({ showReports: false });
        this.setState({ showServices: false });
        this.setState({ showDoctors: false });
        this.setState({ showCallPatients: false });
        this.setState({ showOptions: false });
    };

    setFlagReception() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: true });
        this.setState({ showPatients: false });
        this.setState({ showGroupServices: false });
        this.setState({ showReports: false });
        this.setState({ showServices: false });
        this.setState({ showDoctors: false });
        this.setState({ showCallPatients: false });
        this.setState({ showOptions: false });
    };

    setFlagPatients() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: true });
        this.setState({ showGroupServices: false });
        this.setState({ showReports: false });
        this.setState({ showServices: false });
        this.setState({ showDoctors: false });
        this.setState({ showCallPatients: false });
        this.setState({ showOptions: false });
    };

    setFlagGroupServices() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
        this.setState({ showGroupServices: true });
        this.setState({ showReports: false });
        this.setState({ showServices: false });
        this.setState({ showDoctors: false });
        this.setState({ showCallPatients: false });
        this.setState({ showOptions: false });
    };

    setFlagReports() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
        this.setState({ showGroupServices: false });
        this.setState({ showReports: true });
        this.setState({ showServices: false });
        this.setState({ showDoctors: false });
        this.setState({ showCallPatients: false });
        this.setState({ showOptions: false });
    };

    setFlagServices() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
        this.setState({ showGroupServices: false });
        this.setState({ showReports: false });
        this.setState({ showServices: true });
        this.setState({ showDoctors: false });
        this.setState({ showCallPatients: false });
        this.setState({ showOptions: false });
    };

    setFlagDoctors() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
        this.setState({ showGroupServices: false });
        this.setState({ showReports: false });
        this.setState({ showServices: false });
        this.setState({ showDoctors: true });
        this.setState({ showCallPatients: false });
        this.setState({ showOptions: false });
    };

    setFlagCallPatients() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
        this.setState({ showGroupServices: false });
        this.setState({ showReports: false });
        this.setState({ showServices: false });
        this.setState({ showDoctors: false });
        this.setState({ showCallPatients: true });
        this.setState({ showOptions: false });
    };

    setFlagOptions() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showPatients: false });
        this.setState({ showGroupServices: false });
        this.setState({ showReports: false });
        this.setState({ showServices: false });
        this.setState({ showDoctors: false });
        this.setState({ showCallPatients: false });
        this.setState({ showOptions: true });
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
        return(
        <div>
            <div style={{ marginBottom: "10px" }}>
            <MenuRoleAdministrator
                logOutInput={ () => this.props.funcLogOut() } setFlagTalons={ () => this.setFlagTalons()} setFlagAddTalon={ () => this.setFlagAddTalon() } setFlagReception={ () => this.setFlagReception() }
                userNameDental={ this.state.userNameDental } setFlagPatients={ () => this.setFlagPatients() } setFlagGroupServices={ () => this.setFlagGroupServices() }
                setFlagReports={ () => this.setFlagReports() }  setFlagServices={ () => this.setFlagServices() } setFlagDoctors={ () => this.setFlagDoctors() }
                setFlagCallPatients={ () => this.setFlagCallPatients() } setFlagOptions={ () => this.setFlagOptions() }/>
            </div>
            {this.state.showTalons && <Talons roleAdministrator={true} />}

            {this.state.showAddTalon && <TalonCUD flagTalonCreate={true}
                vabelButtonSave={"Сохранить талон"} labelAction={"Добавление нового талона"} 
                closingPatient={() => this.setFlagTalons()} actionAddButton={true} />}

            {this.state.showReception && <Receptions roleInside={true}/>}
            {this.state.showPatients && <Patients />}
            {this.state.showGroupServices && <GroupServices />}
            {this.state.showReports && <Reports roleAdministrator={true}/>}
            {this.state.showServices && <Services roleHead={true}/>}
            {this.state.showDoctors && <Doctors />}
            {this.state.showCallPatients && <CallPatients />}
            {this.state.showOptions && <Options />}
        </div>
        );
    }
}