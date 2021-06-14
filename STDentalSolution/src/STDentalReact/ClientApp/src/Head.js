import React, { Component } from 'react';


export default class Head extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return(
        <div>           
            <div>
                {this.props.children}
            </div>           
        </div>
        );
    }
}