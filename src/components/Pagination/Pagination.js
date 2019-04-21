import React from 'react';

const Pagination = (props) => {
    return ( 
        <div className="pagination">
            Showing {props.displayCount} of {props.totalCount}
        </div>
    );
}
 
export default Pagination;