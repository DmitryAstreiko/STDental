import React, { Component } from 'react';
import oops from './Application/Images/oops.jpg';

export default class NotInfo extends Component{

    /*constructor(props){
        super(props);
    }*/

    render() {
        return(
            <div>
                <div>
                    <img src={oops} alt="oops"/>
                </div>
                <div>
                    Нет информации для отображения
                </div>
            </div>
        )
    }
}