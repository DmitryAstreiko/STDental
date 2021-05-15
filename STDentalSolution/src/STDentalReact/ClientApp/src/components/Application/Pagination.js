import React, { Component } from 'react';

export default class Pagination extends Component {
    
    /*constructor(props){
        super(props);
    }*/

    handleClick(e) {    
        e.preventDefault();   
        console.log('По ссылке кликнули.');  
    }

    render() {
        
        const { talonsPerPage, totalTalons, paginate, nextPage, prevPage } = this.props;

        const pageNumbers = [];

        for(let i = 1; i <= Math.ceil(totalTalons / talonsPerPage); i++) {
            pageNumbers.push(i);
        }      
        
        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" onClick={() => prevPage()} href="/">Previous</a>
                        <button className="page-link" onClick={() => prevPage()} >Previous</button>
                    </li>
                    {pageNumbers.map(num => (
                        <li className="page-item" key={num}>
                            <a onClick={() => paginate(num)} href="/" className="page-link">{num}</a>    
                        </li>
                    ))}
                    <li className="page-item">
                        {/*<a className="page-link" onClick={() => nextPage()} href="/">Next</a>*/}
                        <a className="page-link" onClick={() => {handleClick; nextPage()}} href="/">Next</a>
                    </li>
                </ul>    
            </nav>
        )
    }
}