import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, TouchableOpacity,
    ScrollView, FlatList, ActivityIndicator, Alert
} from 'react-native';
import {
    basicUser, feedback
} from '../../../../env';
import moment from 'moment';
import StarRating from 'react-native-star-rating';
import { Tooltip } from 'react-native-elements';
import Styled from '../styles/MoreInfoClassStyle';
const BACK_ARROW = require('../../../../assets/icons/back-arrow.png');

import InformationUserBasic from './InformationUserBasic';
class MoreInfoClass extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        console.log('More inforClass constructor');
        this.state = {
            studentList: [],
            feedBackList: [],
            isRequesting: false,

            isLoadingStudents: true,
            isLoadingFeedBacks: true,

            student: {
                'name': '',
                'email': '',
                'dob': '',
                'about': '',
                'avatar': '',
                'level': ''
            },

            showDialogStudent: false,
        }
        const {
            detailClassReducer,
            userBasicReducer
        } = this.props;
        const classID = props.navigation.getParam('classID');


        this.props.fetchDetailClass(classID)

        // while(this.props.detailClassReducer && this.props.detailClassReducer.data && this.props.detailClassReducer.data.studentIDs) {
        console.log('More Infor constructor', classID)
        //     this.getParticipants(this.props.detailClassReducer.data.studentIDs)
        // }
    }


    handleNetworkGetUserBasic = (id, token) => {

        console.log('nhay vao handleNetwork', token);
        return fetch(`${basicUser}/${id}/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {

                // this.setState({
                //     isLoading: false,
                //     _status: responseJson.status,
                // }, function () {

                // });
                return responseJson.data;

            })
            .catch((error) => {
                console.log('handleNetwork co loi roi', error);
                return null;
            });
    }
    handleNetworkGetFeedBackDetail = (id, token) => {
        return fetch(`${feedback}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {

                // this.setState({
                //     isLoading: false,
                //     _status: responseJson.status,
                // }, function () {

                // });
                return responseJson.data;

            })
            .catch((error) => {
                console.log('handleNetwork co loi roi', error);
                return null;
            });
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


        const {
            detailClassReducer,
            token
        } = this.props;
        if (!detailClassReducer.done) {
            return null;
        }
        const {
            studentIDs,
            feedbackIDs
        } = detailClassReducer.data;
        if (typeof studentIDs === 'undefined' || studentIDs.length <= 0) {
            if (this.state.isLoadingStudents) {
                console.log('khong co phan tu gi ca Student')
                this.setState({
                    isLoadingStudents: false
                })
            }
        }
        else {
            if (this.state.studentList.length <= 0) {
                console.log('co nhay vao khong vay????');
                //var listStudent = ['5c912d4c5773be56d2fd701a', '5cdc60a239d3e108afe75ef5']
                var arrayData = [];
                for (let i in studentIDs) {
                    let data = await this.handleNetworkGetUserBasic(studentIDs[i], token);
                    arrayData.push(data)
                }
                console.log('More infor Class arrayData', arrayData)
    
                this.setState({
                    studentList: [...arrayData],
                    isLoadingStudents: false
                })
            }
        }
        
        if (typeof feedbackIDs === 'undefined' || feedbackIDs.length <= 0) {
            if (this.state.isLoadingFeedBacks) {
                console.log('khong co phan tu gi ca feedback')
                this.setState({
                    isLoadingFeedBacks: false
                })
            }
        }
        else{
            if (this.state.feedBackList.length <= 0) {
                console.log('co nhay vao khong vay????');
                //var listStudent = ['5c912d4c5773be56d2fd701a', '5cdc60a239d3e108afe75ef5']
                var arrayDataReview = [];
                for (let i in feedbackIDs) {
                    let data = await this.handleNetworkGetFeedBackDetail(feedbackIDs[i], token);
                    arrayDataReview.push(data)
                }
                console.log('More infor Class arrayData', arrayDataReview)
    
                this.setState({
                    feedBackList: [...arrayDataReview],
                    isLoadingFeedBacks: false
                })
            }
        }

    
       
    }

    //////
    handleOpenDialog = (item) => {
        this.setState({
            student: {
                ...item
            },
            showDialogStudent: true
        });
    }

    handleCloseDialog = () => {
        this.setState({
            showDialogStudent: false
        });
    }



    handleBack = () => {
        this.props.navigation.goBack();
    }

    showInfoParticipant = (item) => {

    }

    keyExtractor = (item, index) => `participant-${index}`;
    keyExtractorReivew = (item, index) => `review-${index}`;
    handleClickParticipantItem = () => {
        Alert.alert('Hello');
    }
    renderParticipantItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.handleOpenDialog(item)}>
                <Image style={[Styled.participantItem, { width: 40, height: 40, }]} source={{ uri: item.avatar }} />
            </TouchableOpacity>
        )
    }

    renderParticipants = (participants, classLimit) => {
        const {
            studentList
        } = this.state
        var countEmpty = classLimit - studentList.length;
        const lengthList = this.state.studentList.length;
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <View style={{ marginTop: 10 }}>
                    {lengthList > 0 &&
                        <FlatList
                            horizontal={true}
                            data={participants}
                            keyExtractor={this.keyExtractor}
                            renderItem={this.renderParticipantItem}
                        />
                    }
                </View>
                <View
                    style={{ width: 40, height: 40 }}>
                    <View style={[Styled.participantItem, { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }]} >
                        <Text style={Styled.textItemParticipant}>{countEmpty}</Text>
                    </View>
                </View>

            </View>
        )
    }


    renderReviewOfParticipants = (reviewer) => {
        return (
            <View style={Styled.reviewConntainer}>
                <Text style={[Styled.locationText, {}]}>Review:</Text>
                <View style={Styled.reviewContentContainer}>
                    <View style={Styled.infoReviewerContainer}>
                        <Image style={Styled.reviewerAvatar} source={{ uri: reviewer.avatar }} />
                        <Text style={Styled.reviewerName}>{reviewer.nickName}</Text>
                    </View>
                    <Text style={Styled.reviewerComment}>{reviewer.comment}</Text>
                </View>
                <View style={Styled.ratingOfReviewerContainer}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={reviewer.rating}
                        starSize={15}
                        containerStyle={Styled.ratingOfReviewer}
                        buttonStyle={{ marginRight: 2, }}
                        fullStarColor='#FEAF34'
                        emptyStarColor='#FEAF34'
                        halfStarEnabled={true}
                    />
                </View>
            </View>
        )
    }

    renderReviews = (reviewers) => {
        const lengthList = this.state.feedBackList.length;
        if (lengthList > 0) {
            return (
                <FlatList
                    data={reviewers}
                    keyExtractor={this.keyExtractorReivew}
                    renderItem={this.renderReviewItem}
                />
            )
        }
        else {
            return;
        };
    }
    renderReviewItem = ({ item }) => {
        console.log('gia tri cua item', item);

        return (
            <View style={Styled.reviewConntainer}>
                <View style={Styled.reviewContentContainer}>
                    <View style={Styled.infoReviewerContainer}>
                        <Image style={Styled.reviewerAvatar} source={{ uri: item.reviewerAvatar }} />
                        <Text style={Styled.reviewerName}>{item.reviewerName}</Text>
                    </View>
                    <Text style={Styled.reviewerComment}>{item.comment}</Text>
                </View>
                <View style={Styled.ratingOfReviewerContainer}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={item.rating}
                        starSize={15}
                        containerStyle={Styled.ratingOfReviewer}
                        buttonStyle={{ marginRight: 2, }}
                        fullStarColor='#FEAF34'
                        emptyStarColor='#FEAF34'
                        halfStarEnabled={true}
                    />
                </View>
            </View>
        );
    }

    renderInfo = () => {

        const {
            detailClassReducer
        } = this.props;

        if (detailClassReducer.isRequesting) {
            return (
                <View style={Styled.loadingView}>
                    <ActivityIndicator size="large" color="#6DCFF6" />
                </View>
            )
        } else if (!detailClassReducer.isRequesting && detailClassReducer.done) {
            const {
                topicName,
                dateStarted,
                dateEnded,
                locationName,
                teacherName,
                locationAddress,
                classLimit,
                teacherImage,
                subjectName,
            } = detailClassReducer.data;

            const date1 = moment(dateStarted).format('dddd');
            const date2 = moment(dateStarted).format('MMM-DD');
            const timeStart = moment(dateStarted).format('HH:mm');
            const timeEnd = moment(dateEnded).format('HH:mm');
            //console.log('thoi gian la the',time);
            return (
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={Styled.infoContainer}>
                        <Text style={Styled.time}>Time</Text>
                        <Text style={Styled.topic}>{topicName}</Text>
                        <Text style={Styled.date}>{date1} | {date2}</Text>
                        <Text style={Styled.duration}>{timeStart} - {timeEnd}</Text>
                        <Text style={Styled.paramsClass}>Maximum Number: {classLimit}       |       Repeat:</Text>
                        <View style={Styled.underline} />
                        <View style={Styled.locationContainer}>
                            <Text style={Styled.locationText}>Location:</Text>
                            <Text style={Styled.mapText}>Map</Text>
                        </View>
                        <Text style={[Styled.date, { marginTop: 12, }]}>{locationName}</Text>
                        <Text style={{ marginTop: 2, }}>{locationAddress}</Text>
                        <Text style={[Styled.locationText, { marginTop: 10, }]}>Class Description:</Text>
                        <Text style={{ marginTop: 7, }}></Text>
                        <Text style={[Styled.locationText, { marginTop: 10, }]}>Lessons</Text>
                        <Text style={{ marginTop: 8, fontWeight: 'bold' }}>{subjectName}</Text>
                        <Text style={[Styled.locationText, { marginTop: 10, }]}>Teacher:</Text>
                        <Text style={{ marginTop: 5, }}>{teacherName}</Text>
                        <View style={Styled.coachContainer}>
                            <Image style={Styled.avatarCoach} source={{ uri: teacherImage }} />
                            {/* <Image style={Styled.avatarCoach} source={{ uri: 'https://i.pinimg.com/originals/af/d0/0b/afd00ba680197d8d0aa7bded6964bc68.jpg'}} /> */}
                            <Text style={Styled.coachDescription}>After graduating with a degree in Hospitality,
                            Calle worked, lived, and traveled in many different countries around the world.
                            During this time, he discovered his passion for teaching as a trainer for
                            aspiring chefs. </Text>
                        </View>


                        <InformationUserBasic
                            student={this.state.student}
                            isVisible={this.state.showDialogStudent}
                            closeModal={this.handleCloseDialog}
                        />


                        <Text style={[Styled.locationText, { marginTop: 20, }]}>Participants:</Text>
                        {
                            this.state.isLoadingStudents ?
                                <View style={Styled.loadingView}>
                                    <ActivityIndicator size="large" color="#6DCFF6" />
                                </View>
                                : this.renderParticipants(this.state.studentList, classLimit)
                        }
                        {/*  */}
                        <Text style={[Styled.locationText, { marginTop: 11, }]}>Review:</Text>
                        {
                            this.state.isLoadingFeedBacks ?
                                <View style={Styled.loadingView}>
                                    <ActivityIndicator size="large" color="#6DCFF6" />
                                </View>
                                : this.renderReviews(this.state.feedBackList)
                        }

                    </View>
                </ScrollView>
            )
        }
    }


    render() {

        const headerBar = (
            <View style={Styled.headerBarContainer}>
                <TouchableOpacity
                    style={Styled.backIconContainer}
                    onPress={() => this.handleBack()}
                >
                    <Image style={Styled.backIcon} source={BACK_ARROW} />
                </TouchableOpacity>
                <Text style={Styled.titleHeader}>More info</Text>
            </View>
        )

        return (
            <View style={Styled.mainContainer}>
                {headerBar}
                {this.renderInfo()}
            </View>
        )
    }
}
export default MoreInfoClass;
