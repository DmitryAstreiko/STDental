import React, { Component } from 'react';

export default class Pagination extends Component {
    
    render() {
        
        const { talonsPerPage, totalTalons, paginate, nextPage, prevPage } = this.props;

        const pageNumbers = [];

        for(let i = 1; i <= Math.ceil(totalTalons / talonsPerPage); i++) {
            pageNumbers.push(i);
        }   

        const handleNextClick = (e) => {
            e.preventDefault();  
            nextPage();
        }

        const handlePrevClick = (e) => {
            e.preventDefault();  
            prevPage();
        }

        /*const handlePaginateClick = (e) => {
            e.preventDefault();  
        }*/

        /*paginaterr(num) {
            () => {paginate(num)};
        } */
        
        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" onClick={handlePrevClick} href="/" >Previous</a>
                    </li>
                    {pageNumbers.map(num => (
                        <li className="page-item" key={num}>
                            {/*<a onClick={() => paginate(num)} href="/" className="page-link">{num}</a>*/}
                            <a onClick={(e) => { e.preventDefault(); paginate(num); }} href="/" className="page-link">{num}</a>
                        </li>
                    ))}
                    <li className="page-item">
                        {/*<a className="page-link" onClick={() => nextPage()} href="/">Next</a>*/}
                        <a className="page-link" onClick={handleNextClick} href="/">Next</a>
                    </li>
                </ul>    
            </nav>
        )
    }
}