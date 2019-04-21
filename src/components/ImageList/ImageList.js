import React,{Component} from 'react';
import Pagination from '../Pagination/Pagination';
import "./ImageList.scss";
import GifImage from '../gif/gif';

class ImageList extends Component {

    render() { 
        return ( 
            <div className="result-list">
                {
                    this.props.images.map((el,ind)=>{
                        return (
                            <div className="image-wrapper" key={ind}>
                                <GifImage 
                                    still={el.images.downsized_still.url}
                                    moving={el.images.original.webp} />
                            </div>
                        )
                    })
                }
                <Pagination totalCount={this.props.totalCount} displayCount={this.props.images.length}/>
            </div>
         );
    }
}
 
export default ImageList;