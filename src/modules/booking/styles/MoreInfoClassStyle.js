import { StyleSheet, Platform, StatusBar } from 'react-native'

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        ...Platform.select({
            ios: {
                marginTop: 36
            },
            android: {
                marginTop: 25 - StatusBar.currentHeight
            }
        }),
        paddingLeft: 16,
        paddingRight: 16,

    },
    headerBarContainer: {
        ...Platform.select({
            ios: {
                height: 75,
            },
            android: {
                height: 75,
            }
        }),
        width: '100%',
        flexDirection: 'row',
        // alignItems: 'center',
         justifyContent: 'center',
         paddingTop: 42
    },
    titleHeader: {
        color: '#797B7D',
        fontSize: 16,
        textAlign: 'center'
    },
    backIconContainer: {
        position: 'absolute',
        bottom: 13,
        left: 0
    },
    backIcon: {
        tintColor: '#7A7A7A',
    },
    infoContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingBottom: 20,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 15,
    },
    time: {
        color: '#C4C4C4',
        fontSize: 14,
    },
    topic: {
        color: '#343E49',
        fontSize: 16,
        marginTop: 10,
        fontWeight: '900'
    },
    date: {
        color: '#343E49',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 7,
    },
    duration: {
        color: '#343E49',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
    },
    paramsClass: {
        marginTop: 7,
    },
    underline: {
        width: '100%',
        height: 1,
        backgroundColor: '#CECACA',
        marginTop: 13,
    },
    locationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 11,
    },
    locationText: {
        color: '#C4C4C4',
        fontSize: 14,
    },
    mapText: {
        color: '#6DCFF6',
        fontWeight: 'bold',
        fontSize: 14,
    },
    coachContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
    },
    avatarCoach: {
        width: 100,
        height: 128,
        borderRadius: 4,
        backgroundColor: '#C4C4C4',
    },
    coachDescription: {
        fontSize: 14,
        marginLeft: 20,
        width: '68%',
        marginRight: 10,
    },
    participantItem: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#C4C4C4',
        backgroundColor: '#C4C4C4',
    },
    reviewConntainer: {
        width: '100%',
        marginTop: 0,
    },
    reviewerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#C4C4C4',
    },
    reviewContentContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 12,
    },
    reviewerName: {
        marginTop: 8,
        fontSize: 14,
        color: '#7A7A7A',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    infoReviewerContainer: {
        width:'30%',
        paddingLeft: 4,
        paddingRight: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reviewerComment: {
        paddingTop: 12,
        paddingRight: 10,
        width: '75%',
    },
    ratingOfReviewer: {
        width: 80,
    },
    ratingOfReviewerContainer: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 12,
    },
    textItemParticipant: {
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 18,
        textAlign: 'justify',
        color:'#FFFFFF',
    }
})