import React, { Component } from 'react';
import styled from 'styled-components';
import QRCodeScanner from 'react-native-qrcode-scanner';

const TopContent = styled.Text`
    flex: 1;
    font-size: 18px;
    padding: 32px;
    color: #777;
`
const BottomContent = styled.View`
    margin-top: 30px;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const BottomButton = styled.TouchableOpacity`
    width: 100px;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #6DCFF6;
    border-radius: 5px;
`

const BottomButtonText = styled.Text`
    color: #FFF;
    font-size: 14px;
`

class Scanner extends Component {
    onSuccess = (e) => {
        const {
            navigation,
            checkIn
        } = this.props;
        
        checkIn(e.data, navigation.getParam("bookingID", ""));
        navigation.goBack();
    }

    handleBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
        <QRCodeScanner
            onRead={this.onSuccess}
            topContent={
            <TopContent>Scan QR code to check in</TopContent>
            }
            bottomContent={
                <BottomContent>
                    <BottomButton onPress={this.handleBack}>
                        <BottomButtonText>Back</BottomButtonText>
                    </BottomButton>
                </BottomContent>
            }
        />
        );
    }
}

export default Scanner;