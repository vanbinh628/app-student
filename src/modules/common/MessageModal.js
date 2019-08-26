import React, {PureComponent} from 'react';
import Modal from "react-native-modal";
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainView = styled.View`
    flex-direction: row;
    width: 100%;
    height: auto;
    background-color: #FFF;
    padding: 20px 10px;
    elevation: 1;
`

const LoadingView = styled.View`
    width: 50px;
    height: 100%;
`

const MessageView = styled.View`
    flex: 1;
    justify-content: center;
    padding-left: 20px;
`

const MessageText = styled.Text`
    font-size: 16px;
    color: #000;
`

class MessageModal extends PureComponent {
    render() {
        const {
            isVisible,
            closeModal,
            message
        } = this.props;
        console.log(isVisible, message);
        return (
            <Modal
                isVisible={isVisible}
                onBackButtonPress={closeModal}
                onBackdropPress={closeModal}
                backdropOpacity={0}
            >
                <MainView>
                    <MessageView>
                        <MessageText>{message}</MessageText>
                    </MessageView>
                </MainView>
            </Modal>
        )
    }
}

MessageModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    message: PropTypes.string,
    closeModal: PropTypes.func
}

MessageModal.defaultProps = {
    message: "",
    closeModal: () => null
}

export default MessageModal;