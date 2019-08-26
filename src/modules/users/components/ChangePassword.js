import React, {Component} from 'react';
import {StatusBar, Alert} from 'react-native';
import LoadingModal from '../../common/LoadingModal';
import * as styled from '../styles/UserProfileStyles';

const BACK_ARROW = require('../../../../assets/icons/back-arrow.png');

class ChangePassword extends Component{
  constructor(props){
    super(props);
    this.state = {
        oldPassword: '',
        newPassword: '',
        confirm: '',
    }
  }

  componentDidUpdate() {
    const {
      userFormReducer : {
        done,
        hasError,
        data
      },
      reset,
      navigation: {
          state: {
              routeName
          }
      }
    } = this.props;

    if (routeName === 'ChangePassword') {
        if (done) {
          setTimeout(() => {
            Alert.alert('Change Password', 'Change password success');
          }, 1000);
            
            reset();
        } else if (hasError) {
          setTimeout(() => {
            Alert.alert('Change Password',  data.messag);
          }, 1000);

            reset();
        }
    }
    
  }

  handleBack = () => {
    this.props.navigation.goBack();
  }

  handleUpdate = () => {
      const {
          oldPassword,
          newPassword,
          confirm
      } = this.state;

      if (newPassword !== confirm) {
        setTimeout(() => {
          Alert.alert('Change Password', 'Wrong confirm password');
        }, 1000);
        return false;
      }

    this.props.changePassword({
      oldPassword,
      newPassword
    })
  }

  handleChangeOldPassword = (oldPassword) => {
    this.setState({
        oldPassword
    })
  }

  handleChangeNewPassword = (newPassword) => {
    this.setState({
        newPassword
    })
  }

  handleChangeConfirm = (confirm) => {
    this.setState({
        confirm
    })
  }


  render(){
    const {
        oldPassword,
        newPassword,
        confirm
    } = this.state;

    const {
      userFormReducer
    } = this.props;

    return(
      <styled.MainViewer>
        <StatusBar
            backgroundColor="#f1f1f1"
            translucent={true}
            barStyle="dark-content"
        />
        <LoadingModal
            isVisible={userFormReducer.isRequesting}
            message="Changing password..."
        />
        <styled.WrapperNoPadding>
          <styled.TitleWrapper>
            <styled.BackButton
                onPress={this.handleBack}
            >
                <styled.BackButtonIcon source={BACK_ARROW}/>
            </styled.BackButton>
            <styled.TitleTextWrapper>
              <styled.Title>Change Password</styled.Title>
            </styled.TitleTextWrapper>
          </styled.TitleWrapper>
          <styled.ContentWrapper>
            <styled.InputList>
              <styled.InputComponent>
                <styled.InputLabel>Current password</styled.InputLabel>
                <styled.UsernameTextArea
                    placeholder={oldPassword}
                    value={oldPassword}
                    onChangeText={this.handleChangeOldPassword}
                    secureTextEntry={true}
                  >
                </styled.UsernameTextArea>
              </styled.InputComponent>
              <styled.InputComponent>
                <styled.InputLabel>New password</styled.InputLabel>
                <styled.UsernameTextArea
                    placeholder={newPassword}
                    value={newPassword}
                    onChangeText={this.handleChangeNewPassword}
                    secureTextEntry={true}
                  >
                </styled.UsernameTextArea>
              </styled.InputComponent>
              <styled.InputComponent>
                <styled.InputLabel>Confirm</styled.InputLabel>
                <styled.UsernameTextArea
                    placeholder={confirm}
                    value={confirm}
                    onChangeText={this.handleChangeConfirm}
                    secureTextEntry={true}
                  >
                </styled.UsernameTextArea>
              </styled.InputComponent>
            </styled.InputList>
            <styled.ButtonWrapper>
              <styled.SubButton
                onPress={this.handleBack}
              >
                <styled.SubButtonText>Cancel</styled.SubButtonText>
              </styled.SubButton>
              <styled.MainButton
                onPress={this.handleUpdate}
              >
                <styled.MainButtonText>Update</styled.MainButtonText>
              </styled.MainButton>
            </styled.ButtonWrapper>
          </styled.ContentWrapper>
        </styled.WrapperNoPadding>
      </styled.MainViewer>
    );
  }
}

export default ChangePassword;
