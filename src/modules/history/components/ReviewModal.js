import React, {PureComponent} from 'react';
import Modal from "react-native-modal";
import styled from 'styled-components';
import StarRating from 'react-native-star-rating';
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

const ActionButtonWrapper = styled.View`
    width: 90%;
    height: 50px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

const NextButton = styled.TouchableOpacity`
    margin-left: 10px;
    width: 140px;
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

const CancelButton = styled.TouchableOpacity`
    width: 140px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: #DADADA;
    border-radius: 5px;
`


const CancelButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #404040;
`

const StarRatingStyle = {
    marginLeft: 10,
    width: 200,
    marginTop: 5,
}

class ReviewModal extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            message: props.message,
            rating: props.rating
        }
    }

    handleMessage = (message) => {
        this.setState({
            message
        });
    }

    handleRating = (rating) => {
        this.setState({rating})
    }

    handleNext = () => {
        this.props.onSend(this.state.message, this.state.rating);
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
                        <HeaderText>Review your class</HeaderText>
                    </HeaderView>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.rating}
                        starSize={30}
                        containerStyle={StarRatingStyle}
                        fullStarColor='#FEAF34'
                        emptyStarColor='#FEAF34'
                        halfStarEnabled={true}
                        selectedStar={this.handleRating}
                    />
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
                    <ActionButtonWrapper>
                        <CancelButton
                            onPress={closeModal}
                        >
                            <CancelButtonText>Cancel</CancelButtonText>
                        </CancelButton>
                        <NextButton
                            onPress={this.handleNext}
                        >
                            <NextButtonText>Send</NextButtonText>
                        </NextButton>
                    </ActionButtonWrapper>
                    
                </MainView>
            </Modal>
        )
    }
}

ReviewModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func,
    onSend: PropTypes.func.isRequired,
    message: PropTypes.string,
}

ReviewModal.defaultProps = {
    closeModal: () => null,
    message: undefined
}

export default ReviewModal;
