import React, { Component } from 'react';

export default class Pagination extends Component {
    
    render() {
        
        const { talonsPerPage, totalTalons, paginate, nextPage, prevPage } = this.props;

        const pageNumbers = [];

        for(let i = 1; i <= Math.ceil(totalTalons / talonsPerPage); i++) {
            pageNumbers.push(i);
        }        
        
        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li>
                        <button onClick={() => prevPage()}>987987</button>
                    </li>
                    <li className="page-item">
                        <a className="page-link" onClick={() => prevPage()} href="#">Previous</a>
                        <button className="page-link" onClick={() => prevPage()} >Previous</button>
                    </li>
                    {pageNumbers.map(num => (
                        <li className="page-item" key={num}>
                            <a onClick={() => paginate(num)} href="#" className="page-link">{num}</a>    
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" onClick={() => nextPage()} href="#">Next</a>
                    </li>
                </ul>    
            </nav>
        )
    }
}