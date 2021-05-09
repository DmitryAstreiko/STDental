import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'reactstrap';
import './Talons.css';

import Loader from './Loader';
import DetailRowView from './DetailRowView';
import TalonServices from './TalonServices';
import { MenuAdministrator } from './MenuAdministrator';

export class Talons extends Component{

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            talons: [],
            selectedTalon: null,
        }

        this.onRowSelect = this.onRowSelect.bind(this);
    }

    componentDidMount() {
        this.populateTalons();
    } 

    onRowSelect = row => ( 
        (row !== null) && (
            this.setState({selectedTalon: row}),
            <TalonServices talonId="1" />
        )       
        
    )

    static renderTalonsTable(talons, onRowSelect) {
        return (
            <div>
            <MenuAdministrator />
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="">Выбран талон: </span>
                </div>
                <input type="text" value="№ 56695"/>
                <input type="text" value="Пациент - Астаповчик ю.А."/>
                <input type="text" value="Врач - Алибегов А.А"/>
                <input type="text" value="Дата талона - 25.25.2020"/>
                <input type="text" value="Итого по талону - 52336,36"/>
            </div>
            
            <div>
                Search
            </div>
            <div>
            <Table className='table' aria-labelledby="tabelLabel">
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
                        <tr key={talon.talonId} className="talonnotpaid" onClick={onRowSelect.bind(null, talon)}>
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
            </div>
            </div>
        );
    }

    render(){   
        let contents = this.state.loading
        ? <Loader />
        : Talons.renderTalonsTable(this.state.talons, this.onRowSelect, this.getClassName);

        return (
        <div>
        {
            contents
            //<TalonServices talonid={this.selectedTalon.talonId}/>
        }   
        {
        //this.state.row ? <DetailRowView person={this.state.row} /> : null
        //    <DetailRowView />
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