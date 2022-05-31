import React, { Component } from 'react';
import { MenuDoctor } from './MenuRoleDoctor';
import { Talons } from './Talons';
import { TalonCUD } from './TalonCUD';
import { Receptions } from './Receptions';
import AuthService from "./Authorization/auth.service";
import { Reports } from "./Reports";

export default class RoleDoctor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTalons: false,
            showAddTalon: false,
            showReception: false,
            userNameDental: false,
            userIdDental: false,
            showReport: false,
            selectedDoctor: []
        };
    }

    setFlagTalons() {
        this.setState({ showTalons: true });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showReport: false });
    }

    setFlagAddTalon() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: true });
        this.setState({ showReception: false });
        this.setState({ showReport: false });
    }

    setFlagReception() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: true });
        this.setState({ showReport: false });
    }

    setFlagReport() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
        this.setState({ showReport: true });
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({ userNameDental: user });
        }

        const staffId = AuthService.getCurrentStaffId();
        if (staffId) {
        
            this.setState({ selectedDoctor: {id: staffId, name: user}});
            this.setState({ showTalons: true });
        };
    }

    render() {
        return(
        <div>
            <div style={{ marginBottom: "10px" }}>
            <MenuDoctor
                logOutInput={ () => this.props.funcLogOut() } setFlagTalons={() => this.setFlagTalons()} setFlagAddTalon={() => this.setFlagAddTalon()} 
                setFlagReception={() => this.setFlagReception()} userNameDental={ this.state.userNameDental }  setFlagReport={() => this.setFlagReport()}/>
            </div>
            {this.state.showTalons && <Talons roleDoctor={true} selectedDoctor={this.state.selectedDoctor}/>}

            {this.state.showAddTalon && <TalonCUD flagTalonCreate={true} flagTalonEdit={false} flagTalonDelete={false}  
                vabelButtonSave={"Сохранить талон"} labelAction={"Добавление нового талона"} closingPatient={() => this.setFlagTalons()} 
                roleDoctor={true} actionAddButton={true} selectedDoctor={this.state.selectedDoctor}/>}

            {this.state.showReception && <Receptions roleInside={true}/>}
            {this.state.showReport && <Reports roleDoctor={true}/>}
        </div>
        );
    }
}