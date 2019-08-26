import React, {Component} from 'react';
import {StatusBar, Alert, ActivityIndicator} from 'react-native';
import StarRating from 'react-native-star-rating';
import * as styled from '../styles/ClassDetailStyles';
import HorizontalCalender from '../../common/calender/HorizontalCalender';
import {getHourFormat, getDateFromString} from '../../../utils/helper';
import LoadingModal from '../../common/LoadingModal';
import ReviewModal from './ReviewModal';

const BACK_ARROW = require('../../../../assets/icons/back-arrow.png');
const DONE = require("../../../../assets/icons/checkin-done.png")

class ClassDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }

        const classItem = props.navigation.getParam("classItem", {});
        const bookingID = props.navigation.getParam("bookingID", "");

        props.fetchBookingDetail(bookingID);
    }

    keyExtractor = (item, index) => `schedule-${index}`;

    handleBack = () => {
        this.props.navigation.goBack();
    }

    handleScanQRCode = () => {
        const {
            navigation
        } = this.props;
        const bookingID = navigation.getParam("bookingID", "");

        navigation.navigate("Scanner",{
            bookingID
        });
    }

    handleCloseModal = () => {
        this.props.resetBooking();
    }

    handleReviewPress = () => {
        this.setState({modalVisible: true});
    }

    handleCloseReviewModal = () => {
        this.setState({modalVisible: false})
    }

    handleReview = (message, rating) => {
        const bookingID = this.props.navigation.getParam("bookingID", "");
        this.setState({modalVisible: false, message, rating});
        this.props.reviewClass({
            classID: bookingID,
            feedback: message,
            rating
        })
    }

    renderScanQR = (shouldRender = false) => {
        const {
            bookingReducer
        } = this.props;

        if (!shouldRender) {
            return null;
        }

        if (bookingReducer.done) {
            return (
                <styled.ConfirmButtonWrapper>
                    <styled.EnjoyClassIcon source={DONE}/>
                    <styled.EnjoyClassText>Enjoy your class</styled.EnjoyClassText>
                </styled.ConfirmButtonWrapper>
            )
        } else {
            return (
                <styled.ConfirmButtonWrapper>
                    <styled.ConfirmButton
                        onPress={this.handleScanQRCode}
                    >
                        <styled.ConfirmButtonText>{`Scan QR Code`}</styled.ConfirmButtonText>
                    </styled.ConfirmButton>
                </styled.ConfirmButtonWrapper>
            )
        }
    }

    renderReviewAction = (shouldRender = false) => {
        if (shouldRender) {
            return (
                <styled.ActionButtonWrapper>
                    <styled.AcceptButton
                        onPress={this.handleReviewPress}
                    >
                        <styled.AcceptButtonText>Review</styled.AcceptButtonText>
                    </styled.AcceptButton>
                </styled.ActionButtonWrapper>
            )
        }

        return null;
    }

    renderMessage = (shouldRender) => {
        if (!shouldRender) {
            return null;
        }

        const {
            bookingReducer
        } = this.props;

        if (bookingReducer.isRequesting) {
            return (
                <LoadingModal
                    isVisible={bookingReducer.isRequesting}
                    message="Sending"
                />
            )
        }

        if (bookingReducer.done) {
            setTimeout(() => {
                Alert.alert('', 'Successful', [{
                    text: 'OK',
                    onPress: this.handleCloseModal
                }]);
            }, 1000);
        }

        if (bookingReducer.hasError) {
            setTimeout(() => {
                Alert.alert('', bookingReducer.message || bookingReducer.data, [{
                    text: 'OK',
                    onPress: this.handleCloseModal
                }]);
            }, 1000);
        }

        // if (bookingReducer.hasError) {
        //     return (
        //         <MessageModal
        //             isVisible={bookingReducer.hasError}
        //             closeModal={this.handleCloseModal}
        //             message={bookingReducer.data}
        //         />
        //     )
        // }
    }

    render(){
        const {
            navigation,
            classReducer
        } = this.props;


        if (classReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6"/>
                </styled.LoadingView>
            )
        }

        const isCheckIn = navigation.getParam("isCheckIn", false);
        const isReview = navigation.getParam("isReview", false);

        const {
            _id,
            class: classData
        } = classReducer.data;

        

        if (classData) {
            const {
                dateStarted,
                dateEnded,
                locationName,
                locationAddress,
                teacherImage,
                // message: studentMessage,
                teacherName,
                topicName,
                subjectName,
                // feedback,
                // rating
            } = classData[0];
    
            // const {
            //     message,
            //     rating: reviewRating,
            //     modalVisible
            // } = this.state;
    
            // let studentFeedBack = {};
            // let teacherFeedBack = {};
    
            // if (classReducer.done && feedback.length) {
            //     studentFeedBack = feedback.find((item) => item.from === 3) || {};
            //     teacherFeedBack = feedback.find((item) => item.from === 2) || {};
            // }

            return (
                <styled.MainViewer>
                    <StatusBar
                        backgroundColor="transparent"
                        translucent={true}
                    />
                    {this.renderMessage(navigation.isFocused())}
                    <styled.CoverViewer>
                        <styled.CoverImage source={{uri: teacherImage}} resizeMode="cover"/>
                        <styled.CoverGradient
                            colors={['#C4C4C4', '#000']}
                        />
                        <styled.HeaderView>
                            <styled.BackButton
                                onPress={this.handleBack}
                            >
                                <styled.BackButtonIcon source={BACK_ARROW}/>
                            </styled.BackButton>
                            <styled.TeacherInfoView>
                                <styled.TeacherName>
                                    {teacherName}
                                </styled.TeacherName>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={0}
                                    starSize={15}
                                    containerStyle={styled.TeacherRating}
                                    fullStarColor='#FEAF34'
                                    emptyStarColor='#FEAF34'
                                    halfStarEnabled={true}
                                />
                            </styled.TeacherInfoView>
                        </styled.HeaderView>
                    </styled.CoverViewer>
                    <styled.ContentViewer>
                        <HorizontalCalender
                            shouldCenterActiveDate={false}
                            showMonthYear={false}
                            showDaysBeforeCurrent={3}
                            showDaysAfterCurrent={11}
                            defaultSelectedDate={3}
                            disabled={true}
                            shouldHideAll={true}
                            currentDate={dateStarted}
                            onSelectDate={this.handleSelectDate}
                        />
                        <styled.BookedClassOverview key="station">
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassTimePlace>{`${getHourFormat(dateStarted, dateEnded)}  |  ${locationName}`}</styled.ClassTimePlace>
                                    <styled.ClassAddress>{locationAddress}</styled.ClassAddress>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>
                        <styled.BookedClassOverview key="topic">
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>{subjectName}</styled.ClassInfoText>
                                    <styled.ClassSubInfoText>{topicName}</styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>
                        {/* <styled.BookedClassOverview key="message">
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Message to teacher</styled.ClassInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                            {
                                !!studentMessage &&
                                <styled.TeacherMessageView hideShadow>
                                    <styled.TeacherMessageText
                                        numberOfLines={9}
                                        ellipsizeMode='tail'
                                    >{studentMessage}</styled.TeacherMessageText>
                                </styled.TeacherMessageView>
                            }
                        </styled.BookedClassOverview> */}
                        {/* {
                            isReview &&
                            <styled.BookedClassOverview key="comment">
                                <styled.BookedInfo hideShadow>
                                    <styled.ClassInfo>
                                        <styled.ClassInfoText>Teacher comment</styled.ClassInfoText>
                                    </styled.ClassInfo>
                                </styled.BookedInfo>
                                {
                                    teacherFeedBack.content &&
                                    <styled.TeacherMessageView>
                                        <styled.TeacherMessageText
                                            numberOfLines={9}
                                            ellipsizeMode='tail'
                                        >{teacherFeedBack.content}</styled.TeacherMessageText>
                                    </styled.TeacherMessageView>
                                }
                            </styled.BookedClassOverview>
                        } */}
                        {/* {
                            isReview &&
                            <styled.BookedClassOverview key="feedback">
                                <styled.BookedInfo hideShadow>
                                    <styled.ClassInfo rowContent={true}>
                                        <styled.ClassInfoText>Your comment</styled.ClassInfoText>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={reviewRating || studentFeedBack.rating}
                                            starSize={15}
                                            containerStyle={styled.ClassRating}
                                            fullStarColor='#FEAF34'
                                            emptyStarColor='#FEAF34'
                                            halfStarEnabled={true}
                                        />
                                    </styled.ClassInfo>
                                </styled.BookedInfo>
                                {
                                    (!!message || !!studentFeedBack.content) &&
                                    <styled.TeacherMessageView>
                                        <styled.TeacherMessageText
                                            numberOfLines={9}
                                            ellipsizeMode='tail'
                                        >{message || studentFeedBack.content}</styled.TeacherMessageText>
                                    </styled.TeacherMessageView>
                                }
                            </styled.BookedClassOverview>
                        } */}
                        {this.renderScanQR(isCheckIn)}
                        {/* {this.renderReviewAction(isReview && !studentFeedBack.content)} */}
                    </styled.ContentViewer>
                    {/* <ReviewModal
                        message={message}
                        rating={reviewRating}
                        isVisible={modalVisible}
                        closeModal={this.handleCloseReviewModal}
                        onSend={this.handleReview}
                    /> */}
                </styled.MainViewer>
            )
        }

        return null;
    }
}

export default ClassDetail;
