import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E5E5E5',
    },
    loadingView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
        headerContainer: {
        flexDirection: 'row',
        height: 100,
        // backgroundColor:'#5CB9FC',
        justifyContent: 'center',
        //boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
    },
    linearGradient:{
        position: 'absolute', 
        top: 0, 
        width: '100%', 
        height: '100%'
    },
    backIconContainer: {
        position: 'absolute',
        bottom: 18,
        left: 15
    },
    backIcon: {
        tintColor: '#FFFF',
    },
    TextHeader: {
            marginTop:60,
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: '900',
            fontSize: 16,
            lineHeight: 19,
            textAlign: 'justify',
            color: '#FFFFFF',
    },

    searchContainer: {
        flexDirection: 'row',
        height: 28,
        backgroundColor: 'white',
        margin: 10,
        marginBottom: 8,
        borderRadius: 30,
        elevation: 4,
        alignItems: 'center',
    },
    inputSearch: {
        flex: 1,
        height: 30,
        alignItems: 'center',
        fontSize: 16,
        marginRight: 16,
        marginLeft: 5,
        padding: 5,
    },
    list: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    item: {
        flexDirection: 'row',
        elevation: 1,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#FCFCFC',
        borderRadius: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: '900',
        color: '#343E49',
        width: '82%'
        
    },
    contentContainer: {
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'space-between',
        width:'82%',
    },
    description: {
        fontSize: 14,
        color: '#7A7A7A',
        flex: 1,
    },
    tag: {
        color: '#6DCFF6',
        fontSize: 14,
        lineHeight: 14,
    }
})
