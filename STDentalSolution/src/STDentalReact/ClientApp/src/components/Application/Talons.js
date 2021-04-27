import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'reactstrap';

export class Talons extends Component{
    render(){
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
}