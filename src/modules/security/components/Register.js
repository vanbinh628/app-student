import React, { Component } from 'react';
import {Image, Alert} from 'react-native';
import LoadingModal from '../../common/LoadingModal';
import MessageModal from '../../common/MessageModal';
import * as styled from '../styles/RegisterStyles.js';

const LOGO_PATH = require('../../../../assets/logos/white.png');

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm: '',
    }
  }

  componentDidUpdate() {
	const {
		securityReducer: {
			isRequesting,
			done,
			hasError,
			message
		},
		navigation,
		reset
	} = this.props;

    if (!isRequesting && done) {
        reset();
        setTimeout(() => {
          Alert.alert('', 'Successfully!', 
        [
          {text: 'OK', onPress: () => navigation.navigate('Login')},
        ]);
        }, 1000);
    } else if (hasError) {
      setTimeout(() => {
        Alert.alert('', message);        
      }, 1000);
      reset();
    }
}

  handleChangeName = (name) => this.setState({name});
  handleChangeEmail = (email) => this.setState({email});
  handleChangePhone = (phone) => this.setState({phone});
  handleChangePassword = (password) => this.setState({password});
  handleChangeConfirm = (confirm) => this.setState({confirm});

  handleCloseModal = () => {
	this.props.reset();
  }

  handleLogin = () => {
	this.props.navigation.navigate('Login');
  }

  handleRegister = () => {
    const {
      name,
      email,
      phone, 
      password,
      confirm
    } = this.state;

    if (!name) {
      setTimeout(() => {
      Alert.alert('', 'Please enter your name');        
      }, 1000);
      return false;
    } else if (!email) {
      setTimeout(() => {
      Alert.alert('', 'Please enter your email');        
      }, 1000);
      return false;
    } else if (!phone) {
      setTimeout(() => {
      Alert.alert('', 'Please enter your phone');        
      }, 1000);
      return false;
    } else if (password !== confirm) {
      setTimeout(() => {
      Alert.alert('', 'Confirm password is wrong!');        
      }, 1000);
      return false;
    }

    this.props.register(name, phone, email, password);
  }

  render(){
	const {
	  securityReducer
	} = this.props;

    return(
      <styled.MainViewer>
        <LoadingModal
            isVisible={securityReducer.isRequesting}
            message="Register..."
        />
        <styled.Header><Image source={LOGO_PATH} /></styled.Header>
        <styled.FormView>
          <styled.NameTextArea placeholder="Full name" onChangeText={this.handleChangeName}>
          </styled.NameTextArea>
          <styled.NameTextArea placeholder="Email"  autoCapitalize = 'none' keyboardType="email-address" onChangeText={this.handleChangeEmail}>
          </styled.NameTextArea>
          <styled.NameTextArea placeholder="Phone" keyboardType="numeric" onChangeText={this.handleChangePhone}>
          </styled.NameTextArea>
          <styled.NameTextArea placeholder="Password" onChangeText={this.handleChangePassword} secureTextEntry={true}>
          </styled.NameTextArea>
          <styled.NameTextArea placeholder="Confirm password" onChangeText={this.handleChangeConfirm} secureTextEntry={true}>
          </styled.NameTextArea>
          <styled.RegisterButton
            onPress={this.handleRegister}
          >
            <styled.RegisterText>Register</styled.RegisterText>
          </styled.RegisterButton>
          <styled.LoginLink
            onPress={this.handleLogin}
          >
            <styled.LoginLinkText>Login here</styled.LoginLinkText>
          </styled.LoginLink>
        </styled.FormView>
      </styled.MainViewer>
    )
  }
}

export default Register;
