import {RSAA} from 'redux-api-middleware';
import TeacherActionType from './TeacherActionType';
import {createQuery} from '../../../utils/helper';
import {teacherApi} from '../../../../env'

export const reset = () => ({type: TeacherActionType.TEACHER_LIST_RESET});

export const fetchTeacherList = (page = 1, limit = 20, filters = {}, token) => {
    const query = createQuery({page, limit, ...filters})
    return {
        [RSAA]: {
            endpoint: `${teacherApi}?${query}`,
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'token': token
            },
            types: [
                TeacherActionType.TEACHER_LIST_REQUEST,
                TeacherActionType.TEACHER_LIST_REQUEST_SUCCESS,
                TeacherActionType.TEACHER_LIST_REQUEST_FAILURE
            ]
        }
    }
}