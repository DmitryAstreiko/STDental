import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'reactstrap';

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

    render(){
        if(this.state.loading){
            return
            <h3><em>Loading</em></h3>
        }

        return(
            <Container>
                <Row xs="2">
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                <th>#</th>
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
                                    <td>{talon.summa}</td>
                                    <td>{talon.cost}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                    <Table>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Шифр</th>
                                <th>Наименование</th>
                                <th>Стоимость</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                                </tr>
                            </thead>
                        </Table>
                    </Col>
                </Row>
            </Container>
            )
        }

    async populateTalons() {        
        const response = await fetch('talons');
        const data = await response.json();        
        this.setState({ talons: data, loading: false });
    }

}