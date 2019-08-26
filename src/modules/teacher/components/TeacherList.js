import React, {Component} from 'react';
import {Dimensions, StatusBar, ActivityIndicator} from 'react-native';
import StarRating from 'react-native-star-rating';
import * as styled from '../styles/TeacherListStyles';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class TeacherList extends Component {
    constructor(props){
        super(props);
        this.state={
            index: 0,
        }

        props.fetchTeacherList(1, 20);
    }

    handlePress = () => {
        const {
            teacherListReducer: {
                data: {
                    items: teachers
                }
            },
            navigation
        } = this.props;

        navigation.navigate('Schedule', {
            teacher: {...teachers[this.state.index]}
        });
    }

    handleEndReached = () => {
        const {
            teacherListReducer: {
                data: {
                    total,
                    page,
                    limit
                }
            },
            fetchTeacherList
        } = this.props;

        if (page * limit < total) {
            fetchTeacherList(+page + 1, limit);
        }
    }

    renderItem = ({item}) => {
        console.log("avatar", item.avatar);
        return (
            <styled.TeacherPictureView
                onPress={this.handlePress}
            >
                <styled.TeacherPicture
                    source={{uri: item.avatar}} resizeMode="cover"
                />
            </styled.TeacherPictureView>
        );
    }

    renderBlank

    render() {
        const {index} = this.state;
        const {
            teacherListReducer
        } = this.props;

        if (teacherListReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6"/>
                </styled.LoadingView>
            )
        } else if (!teacherListReducer.isRequesting && teacherListReducer.hasError) {
            return null;
        } else if (!teacherListReducer.isRequesting && teacherListReducer.done) {
            const {limit, page, items: teachers} = teacherListReducer.data;
            const currentTeacher = teachers[index];
            return (
                <styled.MainViewer>
                    <StatusBar
                        backgroundColor="transparent"
                        translucent={true}
                    />
                    <styled.BackgroundImage source={{uri: currentTeacher.avatar}} resizeMode="cover" blurRadius={1}/>
                    <styled.BackgroundGradient
                        colors={['#C4C4C4', '#000']}
                    />
                    <styled.TeacherListWrapper>
                        <styled.TeacherList
                            data={teachers}
                            renderItem={this.renderItem}
                            sliderWidth={viewportWidth}
                            itemWidth={viewportWidth-100}
                            onSnapToItem={(index)=>this.setState({index})}
                            onEndReached={this.handleEndReached}
                            onEndReachedThreshold={0.8}
                        />
                    </styled.TeacherListWrapper>
                    <styled.TeacherDescriptionView>
                        <styled.TeacherName>
                            {currentTeacher.name}
                        </styled.TeacherName>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={currentTeacher.rating}
                            starSize={15}
                            containerStyle={styled.TeacherRating}
                            fullStarColor='#FEAF34'
                            emptyStarColor='#FEAF34'
                            halfStarEnabled={true}
                        />
                        <styled.TeacherInfoWrapper>
                          <styled.TeacherDescription

                          >
                              {currentTeacher.about}
                          </styled.TeacherDescription>
                        </styled.TeacherInfoWrapper>

                    </styled.TeacherDescriptionView>

                </styled.MainViewer>
            )
        }

        return null;
    }
}

export default TeacherList;
