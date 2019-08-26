import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: 376,
        borderRadius: 5,
        elevation: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 30,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    rateText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#404040',
        marginTop: 10,
    },
    rating: {
        marginTop: 5,
    },
    star: {
        padding: 4,
    },
    reviewMessageContainer: {
        backgroundColor: '#FAFAFA',
        borderColor: '#DADADA',
        borderWidth: 1,
        borderRadius: 5,
        height: 80,
        width: '100%',
        marginTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    reviewMessage: {
        textAlign: 'left',
        height: 40,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        marginTop: 30,
        justifyContent: 'space-between'
    },
    cancel: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DADADA',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
    },
    cancelText: {
        fontWeight: '900',
        fontSize: 16,
        color: '#404040',
    },
    send: {
        backgroundColor: '#6DCFF6',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
    },
    sendText: {
        fontWeight: '900',
        fontSize: 16,
        color: 'white',
    },
})