import React, {Component} from 'react';
import {Image, StatusBar, ActivityIndicator, AsyncStorage} from 'react-native';
import * as styled from '../styles/UserProfileStyles';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.playerId = null;

    AsyncStorage.getItem('PLAYER_ID').then(result => {
      this.playerId = result;
    })

    this.props.fetchProfile();
  }

  handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile');
  }

  handleLogout = () => {
    AsyncStorage.multiRemove(["USER_CREDENTIAL"]);
    this.props.logout(this.playerId);
    this.props.navigation.navigate('Login', {
      fromLogout: true
    });
  }

  renderUserOverview = () => {
    const {
      userReducer
    } = this.props;

    if (userReducer.isRequesting) {
      return (
          <styled.LoadingView>
              <ActivityIndicator size="large" color="#6DCFF6"/>
          </styled.LoadingView>
      )
    } else if (!userReducer.isRequesting && userReducer.done) {
      const {
        name,
        username,
        email,
        avatar,
        classLimit,
        totalClass
      } = userReducer.data;

      return(
        <styled.Wrapper>
          <styled.UserInfoWrapper>
            <styled.AvatarWrapper>
              <Image
                style={{width:70, height: 70, borderRadius: 35}} source={{uri: avatar}} />
            </styled.AvatarWrapper>
            <styled.Info>
              <styled.Name>{name}</styled.Name>
              <styled.Email>{username || email}</styled.Email>
              <styled.EditProfile
                onPress={this.handleEditProfile}>
                <styled.EditProfileText>Edit your profile</styled.EditProfileText>
              </styled.EditProfile>
            </styled.Info>
          </styled.UserInfoWrapper>
          <styled.OverallNumber>
            <styled.NumberWrapper>
              <styled.Label>Total class</styled.Label>
              <styled.RNumber>{totalClass || 0}</styled.RNumber>
            </styled.NumberWrapper>
            <styled.NumberWrapper>
              <styled.Label>Remain class</styled.Label>
              <styled.RNumber>{classLimit || 0}</styled.RNumber>
            </styled.NumberWrapper>
          </styled.OverallNumber>
        </styled.Wrapper>
      )
    }
  }

  render(){
    return (
      <styled.MainViewer>
        <StatusBar
            backgroundColor="#f1f1f1"
            translucent={true}
            barStyle="dark-content"
        />
        {this.renderUserOverview()}
        <styled.LogoutWrapper
          onPress={this.handleLogout}
        >
          <styled.LogoutText>
            Log out
          </styled.LogoutText>
        </styled.LogoutWrapper>
      </styled.MainViewer>
    )
  }
}

export default UserProfile;
