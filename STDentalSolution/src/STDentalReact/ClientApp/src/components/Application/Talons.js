import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'reactstrap';
import './Talons.css';

export class Talons extends Component{

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            selectedTalonId: null,
            talons: []
        }
    }
        componentDidMount() {
            this.populateTalons();
        }    

    static renderTalonsTable(talons) {
        return (
            <Table striped className='table'>
                <thead>
                    <tr>
                    <th>№ талона</th>
                    <th>ФИО пациента</th>
                    <th>ФИО врача</th>
                    <th>Стоимость</th>
                    <th>Со скидкой</th>
                    <th>Дата талона</th>
                    </tr>
                </thead>
                <tbody>
                    {talons.map(talon =>
                        <tr key={talon.talonId}>
                        <td>{talon.talonId}</td>
                        <td>{talon.patientName}</td>
                        <td>{talon.staffName}</td>
                        <td>{talon.summa}</td>
                        <td>{talon.cost}</td>
                        <td>{talon.createDate}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
        }

    render(){
        let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Talons.renderTalonsTable(this.state.talons);

    return (
        <div>
        {contents}
        </div>
    );
    }

    async populateTalons() {        
        const response = await fetch('talons');
        const data = await response.json();   
        console.log(data);
        this.setState({ talons: data, loading: false });
    }

}