import React, { Component } from 'react';
import { Image, AsyncStorage, Alert } from 'react-native';
import LoadingModal from '../../common/LoadingModal';
import MessageModal from '../../common/MessageModal';
import * as styled from '../styles/LoginStyles';

const LOGO_PATH = require('../../../../assets/logos/white.png');

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
        this.playerId = "";
        const fromLogout = props.navigation.getParam("fromLogout", false);

        AsyncStorage.getItem('PLAYER_ID').then(result => {
            this.playerId = result;
            console.log("DeviceID", result);
        })


        if (!fromLogout) {
            AsyncStorage.getItem('USER_CREDENTIAL').then((result) => {
                if (result) {
                    props.loadCredential(JSON.parse(result));
                }
            })
        }
    }

    componentDidUpdate() {
        const {
            securityReducer: {
                isRequesting,
                done,
                hasError,
                data,
                isLoaded,
                message
            },
            navigation,
            reset,
            checkToken
        } = this.props;

        if (!isRequesting && done) {
            if (!isLoaded) {
                AsyncStorage.setItem('USER_CREDENTIAL', JSON.stringify(data));
            } else {
                // Check token expiry. If expired then stay on login screen
                checkToken(data.token).then((result) => {
                    if (result.payload.status === 'FAIL') {
                        console.log('BBBBBBBBBBBBBB')
                        return false;
                    } else {
                        console.log('CCCCCCCCCCCCCCCCC')
                        // Navigate to home screen
                        navigation.navigate('ChooseClass');
                    }
                })
            }
            console.log('AAAAAAAAAAAA')
            // Navigate to home screen
            navigation.navigate('ChooseClass');
        } else if (hasError) {
            setTimeout(() => {
                Alert.alert('Learn SmartR Login',
                    message);
            }, 1000);
            reset();
        }
    }

    handleUsernameInput = (value) => {
        this.setState({
            ...this.state,
            username: value
        })
    }

    handlePasswordInput = (value) => {
        this.setState({
            ...this.state,
            password: value
        })
    }

    handleRegister = () => {
        this.props.navigation.navigate('Register');
    }

    handleForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    handleLogin = () => {
        const { login } = this.props;
        const { username, password } = this.state;

        login(username, password, this.playerId);
        // this.props.navigation.navigate('Home')
    }

    handleCloseModal = () => {
        this.props.reset();
    }

    render() {
        const {
            securityReducer
        } = this.props;
        return (
            <styled.MainViewer>
                <LoadingModal
                    isVisible={securityReducer.isRequesting}
                    message="Login..."
                />
                <styled.LogoViewer>
                    <Image source={LOGO_PATH} />
                </styled.LogoViewer>
                <styled.ContentViewer>
                    <styled.UsernameTextArea
                        placeholder="User name"
                        keyboardType="email-address"
                        value={this.state.username}
                        onChangeText={this.handleUsernameInput}
                        autoCapitalize='none'
                    />
                    <styled.PasswordTextArea
                        placeholder="Password"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={this.handlePasswordInput}
                        autoCapitalize='none'
                    />
                    <styled.ContentButton>
                        <styled.RegisterView>
                            <styled.RegisterText>Register</styled.RegisterText>
                        </styled.RegisterView>

                        <styled.LoginButton
                            onPress={this.handleLogin}
                        >
                            <styled.LoginText>Login</styled.LoginText>
                        </styled.LoginButton>
                    </styled.ContentButton>
                    {/* Temporary disable */}
                    {/* <styled.RegisterWrapper onPress={this.handleRegister}>
                        <styled.RegisterText>Register</styled.RegisterText>
                    </styled.RegisterWrapper> */}
                    <styled.RegisterWrapper onPress={this.handleForgotPassword}>
                        <styled.ForgotPasswordText>Forgot your password</styled.ForgotPasswordText>
                    </styled.RegisterWrapper>
                    {/* <styled.ForgotPasswordText>
                        Forgot your password
                    </styled.ForgotPasswordText> */}
                    {/* <styled.ForgotPasswordText>
                        Forgot your password
                    </styled.ForgotPasswordText> */}
                </styled.ContentViewer>
            </styled.MainViewer>
        )
    }
}

export default LoginScreen;
