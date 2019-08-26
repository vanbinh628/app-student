import moment from 'moment';

export const createQuery = (filters) => {
    return Object.keys(filters).map((key) => `${key}=${filters[key]}`).join("&");
}

export const getHourFormat = (start, end) => {
    const startDate = moment(start).format('HH:mm');
    const endDate = moment(end).format('HH:mm');

    return `${startDate} - ${endDate}`
}

export const getDateFromString = (dateString, format = "DD/MM/YYYY") => {
    return moment(dateString).format(format);
}