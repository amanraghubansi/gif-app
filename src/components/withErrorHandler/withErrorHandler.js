import React, { Component } from 'react';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state = {
            error : null
        }
        constructor(props) {
            super(props);
            this.requestInterceptor = axios.interceptors.request.use((req) =>{
                this.setState({error : null});
                return req;
            });

            this.responseInterceptor = axios.interceptors.response.use(res => res , (err) =>{
                this.setState({error : err});
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
            
        }

        errorAcknowledged = ()=>{
            this.setState({error : null});
        }

        render() {
            return (
                <React.Fragment>
                    {/* <Modal show={this.state.error} modalClosed={this.errorAcknowledged}>
                        {this.state.error && this.state.error.message ? this.state.error.message : null}
                    </Modal> */}
                    <p show={this.state.error} onClick={this.errorAcknowledged}>
                        {this.state.error && this.state.error.message ? this.state.error.message : null}
                    </p>
                    <WrappedComponent {...this.props} ></WrappedComponent>
                </React.Fragment>
            )
        }

    }
}

export default withErrorHandler;