import styled from 'styled-components';

export const MainViewer = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: white;
`

export const LogoViewer = styled.View`
    background-color: #6DCFF6;
    flex: 1;
    align-items: center;
    justify-content: center;
    elevation: 1;
`

export const ContentViewer = styled.View`
    flex: 3;
    flex-direction: column;
    align-items: center;
`

export const UsernameTextArea = styled.TextInput`
    margin-top: 25px;
    border: 1px solid #DADADA;
    border-radius: 5px;
    width: 80%;
    padding-left: 10px;
    font-size: 18px;
    color: #404040;
    height: 40px;
`

export const PasswordTextArea = styled.TextInput`
    margin-top: 10px;
    border: 1px solid #DADADA;
    border-radius: 5px;
    width: 80%
    padding-left: 10px;
    font-size: 18px;
    color: #404040;
    height: 40px;
`
export const ContentButton = styled.View`
    flex-direction: row;
    align-items: center;
`

export const LoginButton = styled.TouchableOpacity`
    margin-top: 20px;
    background-color: #6DCFF6;
    width: 40%;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    elevation: 2;
`
export const LoginText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`

export const ForgotPasswordText = styled.Text`
    margin-top: 15px;
    color: #6DCFF6;
    font-size: 13px;
    font-weight: bold;
`
export const RegisterWrapper = styled.TouchableOpacity`
`
export const RegisterView = styled.View`
    width: 40%;
    height: 40px;
    align-items: center;
    justify-content: center;
    elevation: 2;
`
export const RegisterText = styled.Text`
    margin-top: 15px;
    color: #7A7A7A;
    font-size: 16px;
    font-weight: bold;
`