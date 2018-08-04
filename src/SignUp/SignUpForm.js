import React, { PropTypes, Component } from 'react';
import { Input } from 'react-toolbox/lib/input';
import FullWidthButton from 'components/FullWidthButton';
import FormError from 'components/FormError';
import _curry from 'lodash/curry';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import _identity from 'lodash/identity';

import styles from 'components/FormError.scss';

class SignUpForm extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    isLoading: false,
    errorMessage: '',
    onSubmit: _identity,
  };

  constructor(props, context) {
    super(props, context);
    // do we need initial state?, if so set it here...
    this.state = {
      password: '',
      username: '',
      errors: {
        password: [],
        username: [],
      },
      tags: {
        list: [
          {id:'len', sts:true, msg:'The password should be at least 8 characters long'},
          {id:'lower', sts:true, msg: 'The password should contain at least one lowercase character'},
          {id:'upper', sts:true, msg: 'The password should contain at least one uppercase character'},
          {id:'digit', sts:true, msg: 'The password should contain at least one digit character'},
          {id:'spec', sts:true, msg: 'The password should contain at least one symbol'}
        ]
      },
      tagsVisible:false,
    };
  }


  tagsToggle = (type, value) => {
    if (type === 'password') {
      value.length > 0 ? (
        this.setState({tagsVisible:true})
      ) : (
        this.setState({tagsVisible:false})
      ) 
    }
  }

  tagsChangeState = (type,active) => {
    const newTagsList = [...this.state.tags.list];
    const targetIndex = newTagsList.findIndex(item => {
      return item.id === type;
    });
  
    newTagsList[targetIndex].sts = active;
  
    this.setState({
      tags: {
        list: newTagsList
      }
    });
  }

  tagsEvaluate = (type, value) => {
    if (type === 'password') {

      // Check minimum password length
      if (value.length >= 8) {
        this.tagsChangeState('len',false);
      } else if (value.length < 8) {
        this.tagsChangeState('len',true);
      }

      // Check lower case
      if (/([a-z])/.test(value)) {
        this.tagsChangeState('lower',false);
      } else if (!/([a-z])/.test(value)){
        this.tagsChangeState('lower',true);
      }

      // Check upper case
      if (/([A-Z])/.test(value)) {
        this.tagsChangeState('upper',false);
      } else if (!/([A-Z])/.test(value)){
        this.tagsChangeState('upper',true);
      }

      // Check digit
      if (/([0-9])/.test(value)) {
        this.tagsChangeState('digit',false);
      } else if (!/([0-9])/.test(value)){
        this.tagsChangeState('digit',true);
      }

      // Check symbol
      if (/(?=.*?[#?!@$%^&*-])/.test(value)) {
        this.tagsChangeState('spec',false);
      } else if (!/(?=.*?[#?!@$%^&*-])/.test(value)){
        this.tagsChangeState('spec',true);
      }
  
    }
  }

  // update the state when the input fields change...
  handleInputChange = _curry((name, value) => {
    this.setState({ [name]: value });
    
    // Hide/show tags list
    this.tagsToggle(name,value);
    
    // Evaluate min password length
    this.tagsEvaluate(name, value);
  });
  handleUsernameChange = this.handleInputChange('username');
  handlePasswordChange = this.handleInputChange('password');

  // handle the form submission...
  handleSubmit = e => {
    e.preventDefault();

    const usernameErrors = this.validateUsernameField();
    const passwordErrors = this.validatePasswordField();

    this.setState({
      errors: {
        ...this.state.errors,
        username: usernameErrors,
        password: passwordErrors,
      },
    });

    if (Array.concat(usernameErrors, passwordErrors).length === 0) { // is form valid
      this.props.onSubmit({
        username: this.state.username,
        password: this.state.password,
      });
    }
  };

  validateUsernameField = () => {
    const errors = [];
    const value = this.state.username;

    if (value.length < 3) {
      errors.push('Username minimum length is 3 chars');
    }

    return errors;
  };

  validatePasswordField = () => {
    const errors = [];
    const value = this.state.password;

    if (value.length < 8) {
      errors.push('The password should be at least 8 characters long');
    }

    if (!/(?=.*?[a-z])/.test(value)) { // lowercase
      errors.push('The password should contain at least one lowercase character');
    }

    if (!/(?=.*?[A-Z])/.test(value)) { // uppercase
      errors.push('The password should contain at least one uppercase character');
    }

    if (!/(?=.*?[0-9])/.test(value)) { // digit
      errors.push('The password should contain at least one digit character');
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(value)) { // symbol
      errors.push('The password should contain at least one symbol');
    }

    return errors;
  };

  renderFieldErrors = fieldName => {
    const errors = (this.state.errors[fieldName] || []).map(
      message => <div key={message}>{message}</div>
    );
    return errors.length ? <FormError error={errors} /> : null;
  };


  render() {
    const { isLoading, errorMessage } = this.props;

    let tagList = null;

    if (this.state.tagsVisible) {
      tagList = this.state.tags.list.map(item => {
        return <li
         key={item.id}
         className={item.sts ? styles.formError : null}>
         {item.msg}
         </li>
      });
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <Input
            label="Username"
            type="input"
            onChange={this.handleUsernameChange}
            value={this.state.username}
          />

          {this.renderFieldErrors('username')}

          <Input
            label="Password"
            type="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
          {this.renderFieldErrors('password')}

          <ul>{tagList}</ul>

          {isLoading ? (
            <div>
              <ProgressBar type="circular" mode="indeterminate" multicolor />
            </div>
          ) : (
            <FullWidthButton
              label="Sign up!"
              type="submit"
              raised
              primary
            />
          )}
          <FormError error={errorMessage} />

        </form>
      </div>
    );
  }
}

export default SignUpForm;
