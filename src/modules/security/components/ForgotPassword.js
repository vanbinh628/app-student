import React, { Component } from 'react';
import {Image, Alert} from 'react-native';
import LoadingModal from '../../common/LoadingModal';
import * as styled from '../styles/RegisterStyles.js';

const LOGO_PATH = require('../../../../assets/logos/white.png');

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
          Alert.alert('', 'Please check your email!', 
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

  handleChangeEmail = (email) => this.setState({email});

  handleCloseModal = () => {
    this.props.reset();
  }

  handleLogin = () => {
    this.props.navigation.navigate('Login');
  }

  handleRegister = () => {
    const {
      email,
    } = this.state;

    if (!email) {
      setTimeout(() => {
      Alert.alert('', 'Please enter your email');        
      }, 1000);
      return false;
    } 

    this.props.forgotPassword(email);
  }

  render(){
    const {
      securityReducer
    } = this.props;

    return(
      <styled.MainViewer>
        <LoadingModal
            isVisible={securityReducer.isRequesting}
            message="Sending..."
        />
        <styled.Header><Image source={LOGO_PATH} /></styled.Header>
        <styled.FormView>
            <styled.ForgotPasswordTextWrapper>
                <styled.ForgotPasswordText>Please enter you email. </styled.ForgotPasswordText>
                <styled.ForgotPasswordText>We will send you an email that will allow you to reset password.</styled.ForgotPasswordText>
            </styled.ForgotPasswordTextWrapper>
          
          <styled.NameTextArea autoCapitalize = 'none' placeholder="Email" keyboardType="email-address" onChangeText={this.handleChangeEmail}>
          </styled.NameTextArea>
          <styled.RegisterButton
            onPress={this.handleRegister}
          >
            <styled.RegisterText>Send</styled.RegisterText>
          </styled.RegisterButton>
          <styled.LoginLink
            onPress={this.handleLogin}
          >
            <styled.LoginLinkText>Back to login</styled.LoginLinkText>
          </styled.LoginLink>
        </styled.FormView>
      </styled.MainViewer>
    )
  }
}

export default ForgotPassword;
