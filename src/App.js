import React, { Component } from 'react';
import DeboucedInput from "./components/Input/Input";
import axiosInstance from './axios-orders';
import withErrorHandler from './components/withErrorHandler/withErrorHandler';
import { SERVER_URLS, COUNT, WAIT_TIME } from './constants/constants';
import ImageList from './components/ImageList/ImageList';
import './App.css';
import Loader from './components/Loader/Loader';
import debounce from './utility';
import Pagination from './components/Pagination/Pagination';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      userInput: '',
      imagesArr : [],
      totalCount : 0,
      isLoading : false
    }
    this.resetData = false;
    this.offset = 0
    this.debouncedScrollHander=null;
  
  }
  
  fetchData = (val)=> {
    this.setState({isLoading :  true});
    let queryParams=[];
    queryParams.push('q='+val);
    queryParams.push('limit='+COUNT);
    queryParams.push('offset='+(this.resetData ? 0 : this.offset));
    let str = "&" + queryParams.join("&");
    axiosInstance.get(SERVER_URLS.SEARCH+str)
      .then((res) => {
        let data = {
          totalCount : res.data.pagination.total_count,
          isLoading : false
        }
        console.log(res.data.data);
        if(this.resetData){
          this.resetData=false;
          data['imagesArr'] = res.data.data;
          this.offset = 1;
        }else{
          data['imagesArr'] = [...this.state.imagesArr].concat(res.data.data);
          this.offset = this.offset+1;
        }
        this.setState(data);
      },()=>{
        //handle here
        this.setState({isLoading : false});
      });
  }

  inputChangeHandler = (val) => {
    this.resetData = true;
    this.setState({ userInput: val});
    this.fetchData(val);
  }

  // Binds our scroll event handler
  onScrollHandler = () => {
    if(this.state.isLoading || this.state.totalCount <= this.state.imagesArr.length){
      return;
    }

    //fetch if you are at bottom of page
    if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      this.fetchData(this.state.userInput);
    }
  };

  componentDidMount() {
    this.debouncedScrollHander = debounce(this.onScrollHandler,WAIT_TIME);
    window.addEventListener('scroll' ,this.debouncedScrollHander);
  }

  componentWillUnmount(){
    window.removeEventListener(this.debouncedScrollHander); 
  }


  render() {
    return (
      <div className="App">
        { this.state.isLoading ? <Loader /> : ''}  
        <header className="App-header">
          <a className="logo">GIF App</a>
          <DeboucedInput userInput={this.state.userInput} changeHandler={this.inputChangeHandler} label="Search gifs" />
        </header>
        {

        }
        <div className='container'>
          {
            this.state.imagesArr.length 
            ? 
            <React.Fragment>
              <Pagination totalCount={this.state.totalCount} displayCount={this.state.imagesArr.length}/>
              <ImageList images={this.state.imagesArr} totalCount={this.state.totalCount} />
            </React.Fragment>
            :
            <div className="align-center">
              <img src="./images/walking.gif" />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withErrorHandler(App, axiosInstance);
