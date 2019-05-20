import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',

    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 30,
        backgroundColor: '#020B1C',
    },

    dh: {
        position: 'absolute',
        top: 550,
        color: 'white',
        fontSize: 18,
    },
    inputPos: {
        position: 'absolute',
        top: 230,
    },
    checkPos: {
        alignItems: 'center',
        position: 'absolute',
        top: 480,
        flexDirection: 'row',
    },
    remember: {
        color: 'white',
        opacity: 0.6,
        fontSize: 14,
        left: -10
    },
    logoStyle: {
        top: 100,
    },
});

export default styles;