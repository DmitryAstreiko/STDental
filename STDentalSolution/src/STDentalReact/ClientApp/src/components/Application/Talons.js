import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'reactstrap';
import './Talons.css';

import Loader from './Loader';
import DetailRowView from './DetailRowView';

export class Talons extends Component{

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            talons: [],
            selectedTalon: null,
        }
    }

    componentDidMount() {
        this.populateTalons();
    } 

    onRowSelect = row => (
        this.setState({selectedTalon: row})
    )

    static renderTalonsTable(talons, onRowSelect) {
        return (
            <Table striped className='table' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                    <th>№ талона</th>
                    <th>ФИО пациента</th>
                    <th>ФИО врача</th>
                    <th>Стоимость</th>
                    <th>Со скидкой</th>
                    <th>Дата талона</th>
                    <th>Cтатус талона</th>
                    </tr>
                </thead>
                <tbody>
                    {talons.map(talon =>
                        <tr key={talon.talonId} onClick={onRowSelect.bind(null, talon)}>
                        <td>{talon.talonId}</td>
                        <td>{talon.patientName}</td>
                        <td>{talon.staffName}</td> 
                        <td>{talon.summa}</td>   
                        <td>{talon.cost}</td>
                        <td>{talon.createDate}</td>
                        <td>{talon.talonStatus}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
        }

    render(){   
        let contents = this.state.loading
        ? <Loader />
        : Talons.renderTalonsTable(this.state.talons, this.onRowSelect);

        return (
        <div>
        {
            contents
        }   
        {
        //this.state.row ? <DetailRowView person={this.state.row} /> : null
            <DetailRowView />
        }     
        </div>
        )
    }

    async populateTalons() {        
        const response = await fetch('talons');
        const data = await response.json();   
        this.setState({ talons: data, loading: false });
    }

}