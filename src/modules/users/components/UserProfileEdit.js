import React, {Component} from 'react';
import {Image, StatusBar, Alert, ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import cryptojs from 'crypto-js';
import LoadingModal from '../../common/LoadingModal';
import * as styled from '../styles/UserProfileStyles';

import {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} from '../../../../env';

const BACK_ARROW = require('../../../../assets/icons/back-arrow.png');

class UserProfileEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      ...props.userReducer.data,
      isUploading: false
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

    if (routeName === 'EditProfile') {
      if (done) {
        setTimeout(() => {
          Alert.alert('Edit Profile', 'Update profile success');
        }, 1000);
        
        reset();
      } else if (hasError) {
        setTimeout(() => {
          Alert.alert('Edit Profile', data.message);
        }, 1000);
        reset();
      }
    }
  }

  handleChangeAvatar = () => {
    ImagePicker.openPicker({
      includeBase64: true
    }).then((image) => {
      const timestamp = moment().unix();
      this.setState({
        isUploading: true
      })
      return this.props.uploadImage({
        file: `data:image/png;base64,${image.data}`,
        api_key: CLOUDINARY_API_KEY,
        timestamp,
        signature: cryptojs.SHA1(`timestamp=${timestamp}${CLOUDINARY_API_SECRET}`).toString()
      })
    }).then((result) => {
      this.setState({
        avatar: result.payload.secure_url,
        isUploading: false
      })
    }).catch((err) => {
      if (err.message === "User cancelled image selection") {
        return false;
      }
      
      Alert.alert('', 'Something went wrong! Please try again later');
    })
  }

  handleBack = () => {
    this.props.navigation.goBack();
  }

  handleUpdate = () => {
    this.props.updateProfile({
      ...this.state
    })
  }

  handleChangePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  }

  handleChangeName = (name) => {
    this.setState({
      name
    })
  }

  handleChangeUsername = (username) => {
    this.setState({
      username
    })
  }

  handleChangePhone = (phone) => {
    this.setState({
      phone
    })
  }


  render(){
    const {
        name,
        username,
        email,
        avatar,
        phone,
        isUploading
    } = this.state;

    const {
      userReducer: {
        data
      },
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
            message="Updating your profile..."
        />
        <styled.WrapperNoPadding>
          <styled.TitleWrapper>
            <styled.BackButton
                onPress={this.handleBack}
            >
                <styled.BackButtonIcon source={BACK_ARROW}/>
            </styled.BackButton>
            <styled.TitleTextWrapper>
              <styled.Title>Edit Profile</styled.Title>
            </styled.TitleTextWrapper>
          </styled.TitleWrapper>
          <styled.ContentWrapper>
            <styled.UserInfoWrapper>
              <styled.AvatarWrapper onPress={this.handleChangeAvatar}>
                {
                  !isUploading ?
                  <Image
                    style={{width:70, height: 70, borderRadius: 35}} source={{uri: avatar}} /> :
                  <ActivityIndicator size="large" color="#6DCFF6"/>
                }
              </styled.AvatarWrapper>
              <styled.Info>
                <styled.Name>{data.name}</styled.Name>
                <styled.Email>{email}</styled.Email>
                <styled.EditProfile
                  onPress={this.handleChangePassword}
                >
                  <styled.EditProfileText>Change your password</styled.EditProfileText>
                </styled.EditProfile>
              </styled.Info>
            </styled.UserInfoWrapper>
            <styled.InputList>
              <styled.InputComponent>
                <styled.InputLabel>Fullname</styled.InputLabel>
                <styled.UsernameTextArea
                    placeholder={name}
                    value={name}
                    onChangeText={this.handleChangeName}
                  >
                </styled.UsernameTextArea>
              </styled.InputComponent>
              <styled.InputComponent>
                <styled.InputLabel>Username</styled.InputLabel>
                <styled.UsernameTextArea
                    placeholder={username}
                    value={username}
                    onChangeText={this.handleChangeUsername}
                  >
                </styled.UsernameTextArea>
              </styled.InputComponent>
              <styled.InputComponent>
                <styled.InputLabel>Email</styled.InputLabel>
                <styled.UneditableInput
                    placeholder={email}
                    editable={false}
                  >
                </styled.UneditableInput>
              </styled.InputComponent>
              <styled.InputComponent>
                <styled.InputLabel>Phone</styled.InputLabel>
                <styled.UsernameTextArea
                    placeholder={phone}
                    value={phone}
                    onChangeText={this.handleChangePhone}
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
                disabled={isUploading}
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

export default UserProfileEdit;
