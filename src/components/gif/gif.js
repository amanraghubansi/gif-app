import React,{Component} from 'react';
import "./gif.scss";

class GifImage extends Component {
    state={
        isStill : true
    }

    clickHandler =()=>{
        this.setState({isStill : !this.state.isStill});
    };
    render() { 
        return (
            <div className="inline-block gif-container">
                {/* <button className="control-btn" onClick= {this.clickHandler}> {this.state.isStill ? 'Play' : 'Pause'}</button> */}
                <div class="icon control-btn" onClick= {this.clickHandler}>
                    <div className={this.state.isStill ? "playicon" : "pauseicon"}></div>
                </div>
                <img onClick= {this.clickHandler} src={this.state.isStill ? this.props.still : this.props.moving} alt={this.props.still}/>
                <div className="backdrop"></div>
            </div>
        );
    }
}

export default GifImage;