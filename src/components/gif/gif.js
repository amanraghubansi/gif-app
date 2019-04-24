import React,{Component} from 'react';
import "./gif.scss";

class GifImage extends Component {
    state={
        isStill : true,
        isloadedFirstTime : false,
        containerClass: ["gif-container","loading"]
    }

    clickHandler =()=>{
        this.setState({isStill : !this.state.isStill});
    };

    onloadImage = ()=>{
        if(!this.state.isloadedFirstTime){
            this.setState({isloadedFirstTime : true,containerClass: ["gif-container loaded"]});
        }
    }
    render() {
        return (
            <div className={this.state.containerClass.join(" ")}>
                <div class="icon control-btn" onClick= {this.clickHandler}>
                    <div className={this.state.isStill ? "playicon" : "pauseicon"}></div>
                </div>
                <img onLoad={this.onloadImage}   onClick= {this.clickHandler} src={this.state.isStill ? this.props.still : this.props.moving} alt={this.props.still}/>
                <div className="backdrop"></div>
            </div>
        );
    }
}

export default GifImage;