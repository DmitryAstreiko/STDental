import React, { Component } from 'react';
import optionsImage from './Images/options.png';
import Loader from './Loader';
import { Table } from 'reactstrap';
import Error from './Error';
import { NotInfo } from './NotInfo';
import {ApiClient} from './APIClient';

export class Options extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingOptions: true,
            options: [],
            errorLoad: null,
        }

        this.apiClient = new ApiClient();
    }

    componentDidMount() {
        this.populateOptions();
    }

    render() {       
        return(
            <div>
                <div>
                    {this.state.loadingOptions ? (
                        <Loader /> ) : 
                        (
                        (this.state.errorLoad) ? (
                            <Error /> ) :
                            (
                                (this.state.options.length === 0) ? (
                                    <NotInfo /> ) : 
                                    (<Table className='table' aria-labelledby="tabelLabel">
                                        <thead>
                                            <tr>
                                                <th>№ п.п.</th>
                                                <th>Описание</th>
                                                <th>Значение</th>
                                                <th>НАименование</th>
                                            </tr>
                                        </thead>  
                                        <tbody>
                                            {this.state.options.map((option, index) =>
                                                <tr key={option.optionsId}>
                                                    <td>{index + 1}</td>
                                                    <td>{option.description}</td>   
                                                    <td>{option.value}</td>
                                                    <td>{option.name}</td>                               
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>)
                            )
                        )        
                    }            
                </div> 
                <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                    <img src={optionsImage} alt="optionsImage" style={{ width: "80%", margin: "20px" }}/>
                </div>
            </div>
        );
    }

    async populateOptions() {        
        const res = await this.apiClient.getOptions(); 
        this.setState({ options: res, loadingOptions: false });
    }
}