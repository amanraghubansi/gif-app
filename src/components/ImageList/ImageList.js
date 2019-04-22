import React,{Component} from 'react';
import Pagination from '../Pagination/Pagination';
import "./ImageList.scss";
import GifImage from '../gif/gif';

class ImageList extends Component {

    calculateColumnSize(){
        let elCount = Math.round(this.props.images.length/4);
        let arr = Array(elCount).fill(elCount);
        if(this.props.images.length - elCount*3){
            arr.push(elCount);
        }
        return arr;
    }

    render() {
        // 0*3 , 3
        //  1* 3 , 3*2
        //  2*3 , 3*3

        let columnArr = this.calculateColumnSize();
        let imageArr = this.props.images;
        console.log("1111",columnArr);
        return ( 
            <div className="row">
                {    
                    columnArr.map((columnCount,ind)=>{
                        let imgArr = imageArr.slice(columnCount*ind,columnCount*(ind+1));
                        console.log(imgArr,"heeee",columnCount*ind ,columnCount*(ind+1));
                        return (
                            <div className="column">
                                {
                                    imgArr.map((el,ind)=>{
                                        return (
                                            <div className="image-wrapper" key={ind}>
                                                <GifImage 
                                                    still={el.images.downsized_still.url}
                                                    moving={el.images.original.webp} />
                                            </div>
                                        )
                                    })

                                }
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