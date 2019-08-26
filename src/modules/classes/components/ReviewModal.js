import React, { PureComponent } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import Styled from '../styles/ReviewModalStyles'

class ReviewModal extends PureComponent {
    state = {
        feedBackClass: {
            feedbackType: 1,
            rating: 0,
            comment: '',
            targetID: ''
        },

        feedBackTeacher: {
            feedbackType: 2,
            rating: 0,
            comment: '',
            targetID: ''
        }
    }
    constructor(props) {
        super(props)

        this.state = {
            comment: '',
            ratingClass: 0,
            ratingTeacher: 0,

        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.feedBackClass === prevState.feedBackClass && nextProps.feedBackTeacher === prevState.feedBackTeacher) {
            return null
        }
        if (typeof prevState.feedBackClass === 'undefined' ||
            typeof  prevState.feedBackTeacher === 'undefined') {
            return{
                feedBackClass: nextProps.feedBackClass,
                feedBackTeacher: nextProps.feedBackTeacher
            }
        }
            // console.log('Review Modal value feedback Class', nextProps.feedBackClass)
            // console.log('Review Modal value feedback Teacher', nextProps.feedBackTeacher)

            return{
                feedBackClass:{ 
                    ...prevState.feedBackClass,
                    targetID:nextProps.feedBackClass.targetID
                },
                feedBackTeacher: { 
                    ...prevState.feedBackTeacher,
                    targetID:nextProps.feedBackTeacher.targetID
                },
            }
            
    }

    handleComment = (comment) => {
        this.setState({
            comment,
        })
        this.setState({
            feedBackClass: {
                ...this.state.feedBackClass,
                comment,
            },
        })

    }
    handleRatingClass = (ratingClass) => {
        this.setState({
            ratingClass
        })
        this.setState({
            feedBackClass: {
                ...this.state.feedBackClass,
                rating: ratingClass,
            }
        })
    }



    handleRatingTeacher = (ratingTeacher) => {
        this.setState({
            ratingTeacher
        })
        this.setState({
            feedBackTeacher: {
                ...this.state.feedBackTeacher,
                rating: ratingTeacher,
            }
        })
    }


    handleCancel = () => {
        console.log('Review on press handleCancel');
        this.props.onCancel();
    }
    handleSend = () => {
        console.log('Review on press send', this.state.comment);
        console.log('Review on press send', this.state.feedBackClass);
        console.log('Review on press send', this.state.feedBackClass);

        this.props.onSend(this.state.feedBackClass, this.state.feedBackTeacher);
    }

    render() {
        const {
            isVisible,
            closeModal,
        } = this.props;

        const {
            comment,
            ratingClass,
            ratingTeacher,
        } = this.state;

        const actionButtons = (
            <View style={Styled.actionButtonsContainer}>
                <TouchableOpacity
                    style={Styled.cancel}
                    onPress={this.handleCancel}
                >
                    <Text style={Styled.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Styled.send}
                    onPress={this.handleSend}
                >
                    <Text style={Styled.sendText}>Send</Text>
                </TouchableOpacity>
            </View>
        )

        return (
            <Modal
                isVisible={isVisible}
                onBackButtonPress={closeModal}
                //onBackdropPress={closeModal}
                backdropOpacity={0.5}
                avoidKeyboard={true}
            >
                <View style={Styled.modalContainer}>
                    <View style={Styled.innerContainer}>
                        <Text style={Styled.rateText}>How would you rate for your overall experience?</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={ratingClass}
                            starSize={30}
                            containerStyle={Styled.rating}
                            buttonStyle={Styled.star}
                            fullStarColor='#6DCFF6'
                            emptyStarColor='#6DCFF6'
                            halfStarEnabled={true}
                            selectedStar={this.handleRatingClass}
                        />
                        <Text style={Styled.rateText}>How would you rate for the coach?</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={ratingTeacher}
                            starSize={30}
                            containerStyle={Styled.rating}
                            buttonStyle={Styled.star}
                            fullStarColor='#6DCFF6'
                            emptyStarColor='#6DCFF6'
                            halfStarEnabled={true}
                            selectedStar={this.handleRatingTeacher}
                        />
                        <View style={Styled.reviewMessageContainer}>
                            <TextInput
                                style={Styled.reviewMessage}
                                placeholder="Your comment ..."
                                multiline={true}
                                onChangeText={this.handleComment}
                                value={comment}
                            />
                        </View>
                        {actionButtons}
                    </View>
                </View>
            </Modal>
        )
    }
}


ReviewModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func,
    onSend: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
}

ReviewModal.defaultProps = {
    closeModal: () => null
}

export default ReviewModal;
