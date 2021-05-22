//https://material-ui.com/ru/components/pagination/

import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

export default class PaginationControlled extends Component {
  
  constructor(props){
    super(props);

    this.state = {
        page: 1,
    }
  }

  render() {    

    const { talonsPerPage, totalTalons, paginate, currentPage } = this.props;

    const countPage = Math.ceil(totalTalons / talonsPerPage);

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

/*
export default function PaginationControlled() {
  //const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div className={"d-flex justify-content-center"}>
        <Typography>Page: {page}</Typography>

        <Pagination count={10} page={page} variant="outlined" shape="rounded" onChange={handleChange} color="primary"/>
      </div>    
    </div>
  );
}
*/
