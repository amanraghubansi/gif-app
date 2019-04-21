import React,{Component} from 'react';
import { runInThisContext } from 'vm';

class GifImage extends Component {
    state={
        isStill : true
    }

    clickHandler =()=>{
        this.setState({isStill : !this.state.isStill});
    };
    render() { 
        return (
            <div>
                <button onClick= {this.clickHandler}> {this.state.isStill ? 'Play' : 'Pause'}</button>
                <img onClick= {this.clickHandler} src={this.state.isStill ? this.props.still : this.props.moving} alt={this.props.still}/>
                
            </div>
        );
    }
}

export default GifImage;