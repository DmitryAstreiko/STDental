import React, { Component } from 'react'
import Loader from './Loader';
import { Container, Row, Col, Table } from 'reactstrap';

export default class TalonServices extends Component{

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            talonServices: []
        }     
        
        this.populateTalonServices = this.populateTalonServices.bind(this);
    }

    static renderTalonServicesTable(talonServices) {
        return (
            <Table class="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>№ записи</th>
                        <th>Наименование услуги</th>
                        <th>Стоимость</th>
                        <th>Количество</th>
                        <th>Итого</th>
                    </tr>
                </thead>
                <tbody>
                    {talonServices.map(talonService =>
                        <tr key={talonService.talonServiceId}>
                            <td>{talonService.talonServiceId}</td>
                            <td>{talonService.serviceName}</td>
                            <td>{talonService.price}</td> 
                            <td>{talonService.amount}</td>   
                            <td>{talonService.cost}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    render(){   
        console.log("asdsd");
        let contents = this.state.loading
        ? <Loader />
        : TalonServices.renderTalonServicesTable(this.state.talonServices);
        return (
        <div>
            {contents}
        </div>
        )
    }

    async populateTalonServices() {   
        let url = String.join('talonservices?talonid=', this.props.talonId);   
        //const response = await fetch('talonservices');
        const response = await fetch(url);
        const data = await response.json();   
        this.setState({ talonServices: data, loading: false });
    }
}