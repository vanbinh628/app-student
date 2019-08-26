import React, { Component } from 'react';
import { StatusBar, Alert, ActivityIndicator } from 'react-native';
import StarRating from 'react-native-star-rating';
import * as styled from '../styles/ClassDetailStyles';
import HorizontalCalender from '../../common/calender/HorizontalCalender';
import { getHourFormat, getDateFromString } from '../../../utils/helper';
import LoadingModal from '../../common/LoadingModal';
import ReviewModal from './ReviewModal';

const BACK_ARROW = require('../../../../assets/icons/back-arrow.png');
const DONE = require("../../../../assets/icons/checkin-done.png")

class ClassReview extends Component {
    constructor(props) {
        super(props);

        const bookingID = props.navigation.getParam("bookingID");
        const classID = props.navigation.getParam("classID");
        const studentID = props.navigation.getParam("studentID");

        this.state = {
            isShouldRender: true,
            isStudentComment: false,
            isShowReviewModal: false,
            isSendSuccess:false,

            modalVisible: false,
            message: '',
            isBookingSuccess: false,

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
            },
            filtersFeedBack: {
                feedbackType: 1,
                targetID: classID,
                reviewerID: studentID,
                limit: 1,
            }
        }

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

        navigation.navigate("Scanner", {
            bookingID
        });
    }

    handleOpenReviewModal = () => {
        this.setState({
            isShowReviewModal: true
        });
    }

    handleCloseReviewModal = () => {
        console.log('is click cancel');
        this.setState({
            isShowReviewModal: false
        });
    }
    handleCloseAll = () => {
        console.log('is click Review Modal');
        this.setState({
            isShowReviewModal: false,
            isShouldRender: false,
            isStudentComment: true
        });
        this.props.fetchReviewDetail(this.state.filtersFeedBack);


    }
    isInputFeedBackTeacher=(feedBackTeacher)=>{
        if(feedBackTeacher.rating == 0)
            return false;
        return true;
    }
    isInputFeedBackClass=(feedBackClass)=>{
        if(feedBackClass.comment.trim() == "")
            return false;
        if(feedBackClass.comment.rating == 0)
            return false;
        return true;
    }
    handleSendReviewModal = async (feedBackClass, feedBackTeacher) => {
        console.log('Class Render is click send Class', feedBackClass);
        console.log('Class Render is click send Teacher', feedBackTeacher);

        if(this.isInputFeedBackClass(feedBackClass) == false){
            Alert.alert('Notification', 'Your overall experience missing rating or missing comment', [{
                text: 'OK',
            }]);
            return;
        }
        if(this.isInputFeedBackTeacher(feedBackTeacher) == false){
            Alert.alert('Notification', 'Coach missing rating or missing comment', [{
                text: 'OK',
            }]);
            return;
        }
        //da nhan gui setstate issuccess
        await this.props.createFeedBack(feedBackTeacher);
        await this.props.createFeedBack(feedBackClass);
        this.setState({
            isSendSuccess:true,  
          })
    }


    handleCloseModal = () => {
        this.props.resetBooking();
    }

    handleReviewPress = () => {
        const {
            classID,
            class: classData
        } = this.props.classReducer.data;
        console.log('Class Review dsdsdsdsd class', classID);
        if (classData) {
            const {
                teacherID,
            } = classData[0];

            console.log('Class Review dsdsdsdsd teacher', teacherID);


            this.setState({
                feedBackClass: {
                    ...this.state.feedBackClass,
                    targetID: classID,
                },
                feedBackTeacher: {
                    ...this.state.feedBackTeacher,
                    targetID: teacherID,
                }
            }
            )
        }

        //this.setState({isShouldRender: false});
        //this.setState({isStudentComment: true});
        this.setState({ isShowReviewModal: true });
        // 
        // 
    }


    handleReview = (message, rating) => {
        const bookingID = this.props.navigation.getParam("bookingID", "");
        this.setState({ modalVisible: false, message, rating });
        this.props.reviewClass({
            classID: bookingID,
            feedback: message,
            rating
        })
    }

    renderReview = (shouldRender) => {
        console.log('Render ra review', this.state.isShouldRender);
        //thu coi co can render hay khong
        if (!shouldRender) {
            return null;
        }
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



    renderShowAlert = (shouldRender,isSendSuccess) => {
        if (!shouldRender || !isSendSuccess) {
            return null;
        }

        var {
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

        if (bookingReducer.done && isSendSuccess) {
            //this.setState({isShouldRender: false});
        
                // Alert.alert('', 'Successful', [{
                //     text: 'OK',
                //     onPress: this.handleCloseAll
                // }]);
            this.handleCloseAll();
        }

        if (bookingReducer.hasError) {
                if(isSendSuccess){
                    this.setState({
                        isSendSuccess:false
                    })
                }
        
                Alert.alert('', bookingReducer.message || bookingReducer.data, [{
                    text: 'OK',
                }]);
        }
    }

    render() {
        const {
            navigation,
            classReducer,
            reviewReducer
        } = this.props;


        if (classReducer.isRequesting || reviewReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6" />
                </styled.LoadingView>
            )
        }
        console.log('Show Review Len Nao', reviewReducer);
        const isCheckIn = navigation.getParam("isCheckIn", false);
        const isReview = navigation.getParam("isReview", false);

        const {
            items: FeedbackData
        } = reviewReducer.data;
        var _rating = 0;
        var _comment = "";

        if (FeedbackData) {
            const {
                rating,
                comment
            } = FeedbackData[0];
            _rating = rating;
            _comment = comment;
        }

        const {
            _id,
            message,
            classID,
            class: classData,
            topic
        } = classReducer.data;
        console.log('Review booking bookingID', _id);

        if (classData) {
            const {
                dateStarted,
                dateEnded,
                locationName,
                locationAddress,
                teacherImage,
                teacherID,
                // message: studentMessage,
                teacherName,
                topicName,
                subjectName,
                // feedback,
                // rating
            } = classData[0];




            return (



                <styled.MainViewer>
                    <StatusBar
                        backgroundColor="transparent"
                        translucent={true}
                    />


                    <styled.CoverViewer>
                        <styled.CoverImage source={{ uri: topic.imageUrl }} resizeMode="cover" />
                        <styled.CoverGradient
                            colors={['#C4C4C4', '#000']}
                        />
                        <styled.HeaderView>
                            <styled.BackButton
                                onPress={this.handleBack}
                            >
                                <styled.BackButtonIcon source={BACK_ARROW} />
                            </styled.BackButton>
                            <styled.TeacherInfoView>
                                <styled.TeacherName>
                                    {topicName}
                                </styled.TeacherName>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={topic.rating}
                                    starSize={15}
                                    containerStyle={styled.TeacherRating}
                                    fullStarColor='#FEAF34'
                                    emptyStarColor='#FFF'
                                    halfStarEnabled={true}
                                />
                            </styled.TeacherInfoView>
                        </styled.HeaderView>
                    </styled.CoverViewer>
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
                    <styled.ContentViewer>
                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassTimePlace>{`${getHourFormat(dateStarted, dateEnded)}  |  ${locationName}`}</styled.ClassTimePlace>
                                    <styled.ClassAddress>{locationAddress}</styled.ClassAddress>
                                </styled.ClassInfo>
                                <styled.MapText>Map</styled.MapText>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Coach</styled.ClassInfoText>
                                    <styled.ClassSubInfoText>{teacherName}</styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Class Descriptions</styled.ClassInfoText>
                                    <styled.ClassSubInfoText></styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        <styled.BookedClassOverview>
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Lesson</styled.ClassInfoText>
                                    <styled.ClassSubInfoText>{subjectName}</styled.ClassSubInfoText>
                                </styled.ClassInfo>
                            </styled.BookedInfo>
                        </styled.BookedClassOverview>

                        {
                            this.state.isStudentComment &&
                            <styled.BookedClassOverview>
                                <styled.BookedInfo hideShadow>
                                    <styled.ClassInfo>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={_rating}
                                            starSize={15}
                                            containerStyle={styled.ClassRating}
                                            fullStarColor='#6DCFF6'
                                            emptyStarColor='#FFF'
                                            halfStarEnabled={true}
                                        />
                                        <styled.ClassSubInfoText>{_comment}</styled.ClassSubInfoText>
                                    </styled.ClassInfo>
                                </styled.BookedInfo>
                            </styled.BookedClassOverview>
                        }

                        <styled.BookedClassOverview key="message">
                            <styled.BookedInfo hideShadow>
                                <styled.ClassInfo>
                                    <styled.ClassInfoText>Message to teacher</styled.ClassInfoText>
                                </styled.ClassInfo>

                                <styled.AddMessageButton
                                    onPress={this.handleOpenTeacherMessage}
                                >
                                    {/* <styled.AddMessageButtonText>{`${!!message ? '' : 'Add'}`}</styled.AddMessageButtonText> */}
                                </styled.AddMessageButton>

                            </styled.BookedInfo>
                            {
                                !!message &&
                                <styled.TeacherMessageView>
                                    <styled.TeacherMessageText
                                        numberOfLines={9}
                                        ellipsizeMode='tail'
                                    >{message}</styled.TeacherMessageText>
                                </styled.TeacherMessageView>
                            }
                        </styled.BookedClassOverview>
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
                        {this.renderReview(this.state.isShouldRender)}
                        {this.renderShowAlert(this.state.isShowReviewModal,this.state.isSendSuccess)}
                        {/* Review Modal */}
                        {
                            this.state.isShouldRender &&
                            <ReviewModal
                                feedBackClass={this.state.feedBackClass}
                                feedBackTeacher={this.state.feedBackTeacher}
                                isVisible={this.state.isShowReviewModal}
                                closeModal={this.handleCloseReviewModal}
                                onCancel={this.handleCloseReviewModal}
                                onSend={this.handleSendReviewModal}
                            />
                        }
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

export default ClassReview;
