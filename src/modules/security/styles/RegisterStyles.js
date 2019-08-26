import styled from 'styled-components';

export const MainViewer = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: white;
`
export const Header = styled.View`
  height: 120px;
  background-color: #6DCFF6;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`
export const NameTextArea = styled.TextInput`
    margin-top: 25px;
    border: 1px solid #DADADA;
    border-radius: 5px;
    width: 75%;
    padding-left: 10px;
    font-size: 18px;
    color: #404040;
    height: 40px;
`
export const FormView = styled.View`
  display: flex;
  align-items: center;
`
export const RegisterButton = styled.TouchableOpacity`
    margin-top: 20px;
    background-color: #6DCFF6;
    width: 40%;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    elevation: 2;
`
export const RegisterText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`

export const LoginLink = styled.TouchableOpacity`
  margin-top: 10px;
`
export const LoginLinkText = styled.Text`
  color: #6DCFF6;
  font-size: 16px;
  font-weight: bold;
`

export const ForgotPasswordText = styled.Text`
  color: #404040;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

export const ForgotPasswordTextWrapper = styled.View`
  margin-top: 25px;
  width: 75%;
  padding-left: 10px;
`
