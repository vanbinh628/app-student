import React, {PureComponent} from 'react';
import {ActivityIndicator} from 'react-native';
import * as styled from '../styles/TopicSelectionStyles';

const ICON_DONE = require('../../../../assets/icons/done.png')

class TopicSelection extends PureComponent {
    constructor(props) {
        super(props);

        props.fetchTopic(1, 20, {
            teacherID: props.teacherId, 
            level: props.level || 'BEGINNER',
            weekday: props.weekday
        });
    }

    render() {
        const {
            topicReducer,
            topicId,
            subjectId,
            onSelect,
            onNext
        } = this.props;

        if (topicReducer.isRequesting) {
            return (
                <styled.LoadingView>
                    <ActivityIndicator size="large" color="#6DCFF6"/>
                </styled.LoadingView>
            )
        } else if (!topicReducer.isRequesting && topicReducer.done) {
            const {
                data: {
                    items: topic
                }
            } = topicReducer;

            return (
                <styled.MainView>
                    <styled.HeaderView>
                        <styled.HeaderText>Chose your topic</styled.HeaderText>
                    </styled.HeaderView>
                    <styled.TopicScrollView>
                        {
                            topic.map((item, index) => {
                                return (
                                    <styled.TopicView 
                                        key={`topic-${index}`}
                                        onPress={() => onSelect(item._id, item.name)}
                                    >
                                        <styled.TopicTextView>
                                            <styled.TopicText>{item.name}</styled.TopicText>
                                        </styled.TopicTextView>
                                        {
                                            item.subjects && item.subjects.map((subject, index) => {
                                                if (!subject.active) {
                                                    return null;
                                                }

                                                return (
                                                    <styled.SubjectView
                                                        key={`subject-${item._id}-${index}`}
                                                        onPress={() => onSelect(item._id, item.name, subject._id, subject.name)}
                                                    >
                                                        <styled.SubjectTextView>
                                                            <styled.SubjectText>{subject.name}</styled.SubjectText>
                                                        </styled.SubjectTextView>
                                                        {
                                                            subjectId === subject._id &&
                                                            <styled.SubjectCheckedView>
                                                                <styled.SubjectChecked source={ICON_DONE}/>
                                                            </styled.SubjectCheckedView>
                                                        }
                                                    </styled.SubjectView>
                                                )
                                            })
                                        }
                                    </styled.TopicView>
                                )
                            })
                        }
                    </styled.TopicScrollView>
                    <styled.NextButton
                        disabled={!topicId}
                        onPress={onNext}
                    >
                        <styled.NextButtonText>Next</styled.NextButtonText>
                    </styled.NextButton>
                </styled.MainView>
            )
        }

        return null;
    }
}

export default TopicSelection;