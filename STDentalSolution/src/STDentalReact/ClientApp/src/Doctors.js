import React, { Component } from 'react';
import Error from './Error';
import Loader from './Loader';
import { Table } from 'reactstrap';
import { ApiClient } from './APIClient';
import { NotInfo }  from './NotInfo';

export class Doctors extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            loadingDoctors: true,
            errorLoad: false,
        }

        this.apiClient = new ApiClient();
    }

componentDidMount() {
    this.populateDoctors();      
} 
    render() {
        return(
            <div>           
                {this.state.loadingDoctors ? (
                    <Loader /> ) : 
                    (
                    (this.state.errorLoad) ? (
                        <Error /> ) :
                        (
                            (this.state.doctors.length === 0) ? (
                                <NotInfo /> ) :                                
                                (<Table className='table' aria-labelledby="tabelLabel">
                                    <thead>
                                        <tr>
                                            <th>№ п.п.</th>
                                            <th>Описание</th>
                                            <th>Значение</th>
                                        </tr>
                                    </thead>  
                                    <tbody>
                                        {this.state.doctors.map((option, index) =>
                                            <tr key={option.optionsId}>
                                                <td>{index + 1}</td>
                                                <td>{option.name}</td>   
                                                <td>{option.post}</td>                              
                                            </tr>
                                        )}
                                    </tbody>                 
                                </Table> 
                                )
                        )
                    )                    
                }                               
            </div>
        )
    }

    async populateDoctors() {       
        const res = this.apiClient.getDoctors();
        console.log(res);
        this.setState({ doctors: res, loadingDoctors: false });
    }
}