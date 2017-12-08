import React, { Component } from 'react'
import { Textfield, Snackbar } from 'react-mdl'
import { Post } from "../../controllers/Post";
import {provider} from "../../config/constants";

class AttendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id : this.props.match.params.id,
      text: '',
      isSnackbarActive: false
    };

    this.postController = new Post();
  }

  handleSubmit = () => {
    const application_details = { post_id : this.state.post_id, text : this.state.text };
    this.postController.addUserToPost(application_details)
      .then(() => {this.setState({isSnackbarActive: true})})
      .catch(e => console.log(e));
  };

  handleTimeoutSnackbar() {
    this.setState({ isSnackbarActive: false });
    this.props.history.push('/')
  }

  render() {
    return (
        <div>
        <Snackbar active={this.state.isSnackbarActive} onTimeout={() => this.handleTimeoutSnackbar()}>Request has been succesfully sent!</Snackbar>
          <form onSubmit={this.handleSubmit}>
            <Textfield
              onChange={e => this.setState({text: e.target.value})}
              pattern="([^\s]*)"
              error="Text must not be empty!"
              label="Why?"
              rows={3}
              style={{width: '500px'}}
              value={this.state.text}
            />
            <button type="button" onClick={this.handleSubmit}>Send </button>
          </form>
        </div>
    );
  }

}

export default AttendForm;
