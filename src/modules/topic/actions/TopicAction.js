import {RSAA} from 'redux-api-middleware';
import TopicActionType from './TopicActionType';
import {createQuery} from '../../../utils/helper';
import {topicApi, scheduleApi} from '../../../../env';

export const reset = () => ({type: TopicActionType.TOPIC_LIST_RESET});

export const fetchTopicList = (page = 1, limit = 20,filters = {}, token) => {
    //console.log('topic token',token);
    const query = createQuery({page, limit, ...filters})
    //endpoint: `${topicApi}?name=${name}`,
    return {
        [RSAA]: {
            endpoint: `${topicApi}?${query}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                TopicActionType.TOPIC_LIST_REQUEST,
                TopicActionType.TOPIC_LIST_REQUEST_SUCCESS,
                TopicActionType.TOPIC_LIST_REQUEST_FAILURE
            ]
        }
    }
    
}