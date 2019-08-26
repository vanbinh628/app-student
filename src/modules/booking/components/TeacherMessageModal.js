import React, {PureComponent} from 'react';
import Modal from "react-native-modal";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainView = styled.View`
    width: 96%;
    height: auto;
    margin-top: 10px;
    margin-left: 2%;
    margin-bottom: 20px;
    align-items: center;
    border-radius: 5px;
    elevation: 1;
    padding-bottom: 10px;
    background-color: #FFF;
`

const HeaderView = styled.View`
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: #DADADA;
    border-style: solid;
    background-color: #FAFAFA;
    width: 100%
    height: 40px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 1px;
`

const HeaderText = styled.Text`
    font-size: 14px;
    font-weight: bold;
`

const MessageTextInput = styled.TextInput`
    width: 90%;
    text-align: left;
    text-align-vertical: top;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
    padding: 10px;
    height: 80px;
    backgroundColor: #f2f3f5;
    borderColor: #ccd0d5;
    borderWidth: 1px;
    borderRadius: 5px;
`

const NextButton = styled.TouchableOpacity`
    width: 180px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.disabled ? '#DADADA' : '#6DCFF6'};
    border-radius: 5px;
`

const NextButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #FFF;
`

class TeacherMessageModal extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            message: props.message,
        }
    }

    handleMessage = (message) => {
        this.setState({
            message
        });
    }

    handleNext = () => {
        this.props.onNext(this.state.message);
    }

    render() {
        const {
            isVisible,
            closeModal
        } = this.props;

        return (
            <Modal
                isVisible={isVisible}
                onBackButtonPress={closeModal}
                onBackdropPress={closeModal}
                backdropOpacity={0.5}
                avoidKeyboard={true}
            >
                <MainView>
                    <HeaderView>
                        <HeaderText>Message to teacher</HeaderText>
                    </HeaderView>
                    <MessageTextInput
                        placeholder="Add your message"
                        multiline
                        numberOfLines={9}
                        maxLength={400}
                        returnKeyLabel="done"
                        returnKeyType="done"
                        value={this.state.message}
                        onChangeText={this.handleMessage}
                    />
                    <NextButton
                        onPress={this.handleNext}
                    >
                        <NextButtonText>Next</NextButtonText>
                    </NextButton>
                </MainView>
            </Modal>
        )
    }
}

TeacherMessageModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func,
    onNext: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
}

TeacherMessageModal.defaultProps = {
    closeModal: () => null
}

export default TeacherMessageModal;
