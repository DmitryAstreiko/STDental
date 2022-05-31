import React, { Component } from 'react';
//import  servicesAccountantImage  from './Images/servicesaccountant.png';
//import  servicesHeadImage  from './Images/serviceshead.png';
import TreeView from './TreeView.component';
import TreeView1 from './TreeView';
import TextField from '@material-ui/core/TextField';
import { Table } from 'reactstrap';
import { ApiClient } from './APIClient';

export class Services extends Component{
    constructor(props){
        super(props);

        this.state = {
            actualServices: [],
            }

        this.apiClient = new ApiClient();
    }

    componentDidMount() {
        this.getActualServices();        
    }

    render(){
        console.log(this.state.actualServices[0])
        return(
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <TreeView1 actualServices={this.state.actualServices}/>
                    </div>
                    <div className="col-sm-6">
                        <div >
                            <Table className='table' aria-labelledby="tabelLabel">
                                <thead>
                                    <tr>
                                        <th>№ п.п</th>
                                        <th>Наименование материала</th>
                                        <th>Ед. измерения</th>
                                        <th>Норма</th>
                                        <th>Цена</th>
                                        <th>Стоимость</th>
                                    </tr>
                                </thead>           
                                    <tbody>
                                        {/*{this.state.talons.map((talon, index) =>
                                            //<tr key={talon.talonId} className={talon.talonStatus} onClick={() => this.onRowSelect(talon)}>
                                            <tr key={talon.talonId} className={talon.talonStatus} >
                                                <td>{talon.talonId}</td>
                                                <td>
                                                    <ViewTalonServices talonNumber={talon.talonId} patinetN={talon.patientName}/>
                                                </td>
                                                <td>{talon.patientName}</td>
                                                <td>{talon.staffName}</td> 
                                                <td>{talon.summa.toFixed(2)}</td>   
                                                <td>{talon.cost.toFixed(2)}</td>
                                                {this.state.roleAdministrator && <td>
                                                    <Payment />
                                                </td>
                                                }
                                                <td>{moment(talon.createDate).format('DD.MM.YYYY')}</td>
                                                <td>{talon.description}</td>                                      
                                            </tr>
                                        )}*/}                                        
                                    </tbody>                  
                            </Table>
                        </div>

                        <div>
                            <div className={"d-flex justify-content-around"} style={{ marginTop: "20px" }}>
                                <div>
                                    <TextField id="outlined-basic-total" 
                                        label="Всего по услуге" 
                                        variant="outlined" 
                                        style={{ width: "200px", marginTop: "10px" }} 
                                        //disabled={true}      
                                    />
                                </div>
                                <div>
                                    <TextField id="outlined-basic-discount" 
                                        label="% скидки" 
                                        variant="outlined" 
                                        style={{ width: "200px", marginTop: "10px" }}       
                                    />
                                </div>
                                <div>
                                    <TextField id="outlined-basic-cost" 
                                        label="Итого по услуге" 
                                        variant="outlined" 
                                        style={{ width: "200px", marginTop: "10px" }}       
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*{
                    this.props.roleHead && (
                        <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                            <img src={servicesHeadImage} alt="servicesHeadImage" style={{ width: "80%", margin: "20px" }}/>
                        </div>
                    )
                }
                {
                    this.props.roleAccountant && (
                    <div style={{display: "flex", alignItems: "center", flexDirection: 'column' }}>
                        <img src={servicesAccountantImage} alt="servicesAccountantImage" style={{ width: "80%", margin: "20px" }}/>
                    </div>
                    )
                }*/}
            </div>
            );
    }

    async getActualServices() {        
        const res = await this.apiClient.getActualServices();  
        this.setState({ actualServices: res });
    }
}