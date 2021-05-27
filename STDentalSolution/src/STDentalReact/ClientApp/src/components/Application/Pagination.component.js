//https://material-ui.com/ru/components/pagination/

import React, { Component } from 'react';
import Pagination from '@material-ui/lab/Pagination';

export default class PaginationControlled extends Component {
  
  constructor(props){
    super(props);

    this.state = {
        page: 1,
    }
  }

  render() {    
    const { infoPerPage, totalInfo, paginate, currentPage } = this.props;

    const countPage = Math.ceil(totalInfo / infoPerPage);

    const handleChange = (event, value) => {
      this.setState({ page: currentPage });
      paginate(value);
    };

    return (
      <div>
        <div className={"d-flex justify-content-center"}>
          <Pagination count={countPage} page={this.page} variant="outlined" shape="rounded" 
            onChange={handleChange} color="primary"/>
        </div>    
      </div>
    );
  }
}