import React, { PureComponent } from 'react';
import Modal from "react-native-modal";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainView = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: center;
    align-items: center;
`

const InnerContainer = styled.View`
    width: 300px;
    border-radius: 5px;
    elevation: 1;
    padding-bottom: 10px;
    background-color: white;
    flexDirection: column;
    alignItems: center;
`

const HeaderView = styled.View`
    align-items: center;
    border-style: solid;
    background-color: white;
    width: 100%;
    height: auto;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-top: 20px;
    flexDirection: column;
`

const HeaderText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
`

const MessageText = styled.Text`
    font-size: 14px;
    text-align: center;
    color: #343E49;
    marginLeft: 30px;
    marginRight: 30px;
    marginTop: 8px;
`

const NextButton = styled.TouchableOpacity`
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.disabled ? '#DADADA' : '#6DCFF6'};
    border-radius: 5px;
    marginTop: 15px;
    marginBottom: 20px;
    paddingLeft: 10px;
    paddingRight: 10px;
`

const NextButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #FFF;
`

class BookingDialogModal extends PureComponent {

    constructor(props) {
        super(props)
        this.ref = React.createRef();
        this.state={
            navigation:props.navigation
        }
    }
    handlePress=()=>{
        this.props.onNext();
        //console.log('Booking Modal handlePress',this.state.navigation);
        //this.state.navigation.navigate('UserClass');
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
                //onBackdropPress={closeModal}
                backdropOpacity={0.5}
                avoidKeyboard={true}
            >
                <MainView>
                    <InnerContainer>
                        <HeaderView>
                            <HeaderText>Congratulations!</HeaderText>
                            <MessageText>Your request has been sent. Please wait for your coach to accept.</MessageText>
                        </HeaderView>
                        <NextButton
                            onPress={this.handlePress}
                        >
                            <NextButtonText>View your classes</NextButtonText>
                        </NextButton>
                    </InnerContainer>
                </MainView>
            </Modal>
        )
    }
}

BookingDialogModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func,
    onNext: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
}

BookingDialogModal.defaultProps = {
    closeModal: () => null
}

export default BookingDialogModal;
