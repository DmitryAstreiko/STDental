import React, { Component } from 'react';
//import { Container } from 'reactstrap';
import { MenuDoctor } from './MenuRoleDoctor';
import { Talons } from './Talons';
import { TalonCUD } from './TalonCUD';
import Receptions from './Receptions';

export default class RoleDoctor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTalons: false,
            showAddTalon: false,
            showReception: false
        };
    }

    setFlagTalons() {
        this.setState({ showTalons: true });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: false });
    }

    setFlagAddTalon() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: true });
        this.setState({ showReception: false });
    }

    setFlagReception() {
        this.setState({ showTalons: false });
        this.setState({ showAddTalon: false });
        this.setState({ showReception: true });
    }

    render() {
        const logOutInput = () => {this.props.funcLogOut()}
        const setFlagTalons = () => {this.setFlagTalons()}
        const setFlagAddTalon = () => {this.setFlagAddTalon()}
        const setFlagReception = () => {this.setFlagReception()}
        return(
        <div>
            <div style={{ marginBottom: "10px" }}>
            <MenuDoctor
                logOutInput={ logOutInput } setFlagTalons={setFlagTalons} setFlagAddTalon={setFlagAddTalon} setFlagReception={setFlagReception}/>
            </div>
            {this.state.showTalons && <Talons roleDoctor={true}/>}
            {this.state.showAddTalon && <TalonCUD vabelButtonSave={'Сохранить'} flagTalonCreate={true}/>}
            {this.state.showReception && <Receptions />}
        </div>
        );
    }
}