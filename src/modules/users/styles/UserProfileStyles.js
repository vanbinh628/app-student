import styled from 'styled-components';
export const MainViewer = styled.View`
    flex: 1;
    flex-direction: column;
    padding-top: 10px;
    margin-top: 22px;
    backgroundColor: #f1f1f1;
`
export const LoadingView = styled.View`
    margin-top: 30px;
`

export const UserInfoWrapper = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
`

export const Wrapper = styled.View`
  background-color: white;
  min-height: 100px;
  margin-left: 10px;
  margin-right: 10px;
  elevation: 2;
  border-radius: 5px;
  padding: 10px;
  borderColor: #DADADA;
  border-width: 1px;
`
export const InfoWrapper = styled.View`
  flex-direction: row;
`
export const AvatarWrapper = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`
export const Info = styled.View`
  flex: 1;
  padding-left: 10px;
`
export const Name = styled.Text`
  color: #404040;
  font-size: 16px;
  font-weight: bold;
`
export const Email = styled.Text`
  color: #7A7A7A;
  font-size: 14px;
`
export const EditProfile = styled.TouchableOpacity`
  margin-top: 8px;
`
export const EditProfileText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #6DCFF6;
`
export const OverallNumber = styled.View`
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
  flex-direction: row;
  border-top-width: 1px;
  border-color: #DADADA;
`
export const NumberWrapper = styled.View`
  align-items: center;
`

export const Label = styled.Text`
  color: #404040;
  font-size: 14px;
`
export const RNumber = styled.Text`
color: #404040;
font-size: 18px;
font-weight: bold;
`

export const LogoutWrapper = styled.TouchableOpacity`
background-color: white;
min-height: 50px;
margin-left: 10px;
margin-right: 10px;
elevation: 2;
border-radius: 5px;
margin-top: 15px;
padding: 10px;
`

export const LogoutText = styled.Text`
  color: #DB3236;
  font-size: 18;
  text-align: center;
`

export const Container = styled.View`

`

export const TitleWrapper = styled.View`
  height: 40px;
  background-color: #FAFAFA;
  border-color: #DADADA;
  border-bottom-width: 1px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  flex-direction: row;
`
export const TitleTextWrapper = styled.View`
  flex: 1;
`

export const Title = styled.Text`
  color: #404040;
  font-weight: bold;
  font-size: 14;
  text-align: center;
  line-height: 40px;
`

export const WrapperNoPadding = styled.View`
  background-color: white;
  min-height: 100px;
  margin-left: 10px;
  margin-right: 10px;
  elevation: 2;
  border-radius: 5px;
  borderColor: #DADADA;
  border-width: 1px;
`

export const BackButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 3;
    left: 0px;
`
export const ContentWrapper = styled.ScrollView`
  padding: 10px;
`

export const BackButtonIcon = styled.Image`

`
export const InputComponent = styled.View`
  margin-bottom: 20px;
`
export const InputLabel = styled.Text`
  font-size: 14px;
  color: #7A7A7A;
  width: 100%;
  margin-bottom: 5px;
`
export const UsernameTextArea = styled.TextInput`
    border: 1px solid #DADADA;
    border-radius: 5px;
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    color: #404040;
    height: 40px;
`

export const UneditableInput = styled.TextInput`
    border: 1px solid #DADADA;
    border-radius: 5px;
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    color: #404040;
    background-color: #F1F1F1;
    height: 40px;
`
export const InputList = styled.View`
  padding-top: 10px;
`
export const ButtonWrapper = styled.View`
  height: 35px;
  margin-top: 10px;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 20px;
`
export const SubButton = styled.TouchableOpacity`
  width: 45%;
  max-width: 130;
  height: 35px;
  border-radius: 5px;
  border-color: #C4C4C4;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`
export const SubButtonText = styled.Text`
  font-weight: bold;
  color: #7A7A7A;
`
export const MainButton = styled.TouchableOpacity`
  width: 45%;
  max-width: 130;
  height: 35px;
  border-radius: 5px;
  background-color: #6DCFF6;
  justify-content: center;
  align-items: center;
`

export const MainButtonText = styled.Text`
  font-weight: bold;
  color: white;
`
