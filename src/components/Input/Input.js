import React,{Component} from 'react';
import debounce from "../../utility";
import "./Input.scss";
import { WAIT_TIME } from '../../constants/constants';

class Input extends Component {

    debouncedChangeHander = debounce(this.props.changeHandler,WAIT_TIME);
    
    changeHandler = (e)=>{
        let val = e.target.value;
        this.debouncedChangeHander(val);
    }

    render() { 
        return (
            <label htmlFor="inp" className="inp">
                <input type="text" id="inp" placeholder="&nbsp;"  val={this.props.userInput} onChange={this.changeHandler}/>
                    <span className="label">{this.props.label}</span>
                <span className="border"></span>
            </label>
        );
    }
}

export default Input;