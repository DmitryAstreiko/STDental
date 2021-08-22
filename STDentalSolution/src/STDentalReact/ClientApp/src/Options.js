import React, { Component } from 'react';
import Loader from './Loader';
import { Table } from 'reactstrap';
import Error from './Error';
import { NotInfo } from './NotInfo';
import {ApiClient} from './APIClient';
import EditIcon from '@material-ui/icons/Edit';
import OptionsEdit from './OptionsEdit';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';

export class Options extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingOptions: true,
            options: [],
            errorLoad: null,
            optionEdit: false,
            selectedOptionId: null,
            selectedOptionName: null,
            selectedOptionValue: null,
            selectedOptionDescription: null
        }

        this.apiClient = new ApiClient();
    }

    componentDidMount() {
        this.populateOptions();
    }

    onEditOption(optionId, optionValue, optionDescription, optionName) {
        this.setState({ optionEdit: true });
        this.setState({ selectedOptionId: optionId });
        this.setState({ selectedOptionName: optionName });
        this.setState({ selectedOptionValue: optionValue });
        this.setState({ selectedOptionDescription: optionDescription });
    }

    closeOption(){
        this.setState({ optionEdit: false });
        this.populateOptions();
    }

    render() {      
        const changeState = () => { this.closeOption() }; 
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
                                    (<Table className='table' aria-labelledby="tabelLabel" style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>№ п.п.</th>
                                                <th>Описание</th>
                                                <th>Значение</th>
                                                <th></th>
                                                {/*<th>Наименование</th>*/}
                                            </tr>
                                        </thead>  
                                        <tbody>
                                            {this.state.options.map((option, index) =>
                                                <tr key={option.optionsId}>
                                                    <td>{index + 1}</td>
                                                    <td>{option.description}</td>   
                                                    <td>{option.value}</td>
                                                    <td>
                                                        <IconButton 
                                                            aria-label="edit" 
                                                            style={{ color: green[500] }}
                                                            onClick={ () => (this.onEditOption(option.optionsId, option.value, option.description, option.name)) }>
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </td>
                                                    {/*<td>{option.name}</td>*/}                               
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>)
                            )
                        )        
                    }            
                </div> 
                <div>
                    {this.state.optionEdit && <OptionsEdit optionId={this.state.selectedOptionId} optionName={this.state.selectedOptionName} optionValue={this.state.selectedOptionValue} 
                        labelAction={`${this.state.selectedOptionDescription}`} changeState={ changeState } 
                        />
                    }
                </div>
            </div>

            
        );
    }

    async populateOptions() {        
        const res = await this.apiClient.getOptions(); 
        this.setState({ options: res, loadingOptions: false });
    }
}