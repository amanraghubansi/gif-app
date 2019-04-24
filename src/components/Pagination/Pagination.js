import React from 'react';
import "./Pagination.scss";

const Pagination = (props) => {
    return ( 
        <div className="align-right">
            <div className="pagination inline-block">
                <p>Displaying {props.displayCount}  from {props.totalCount} images</p>
            </div>
        </div>
        
    );
}
 
export default Pagination;