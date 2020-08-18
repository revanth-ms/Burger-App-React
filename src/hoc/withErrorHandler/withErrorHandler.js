import React, { Component } from "react";
import Aux from "../Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
    }
    componentDidMount() {
      axios.interceptors.request.use((res) => {
        this.setState({ error: null });
        return res;
      });

      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmed = () => {
        this.setState({ error: null });
    }
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} 
            clicked={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
