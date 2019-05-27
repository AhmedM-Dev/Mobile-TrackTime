import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  cardStyle: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 340,
    backgroundColor: '#ECECEC',
    borderColor: '#ECECEC',
    borderRadius: 20,
    marginTop: 40
  },

  autorisationList: {
    borderWidth: 1,
    width: 300,
    marginBottom: -20,
    borderColor: '#1C1C1C',
    backgroundColor: '#1C1C1C',
    alignSelf: 'center',
    zIndex: 5,
    borderRadius: 20
  },
  textStyle: {
    color: 'white',
    marginTop: 10,
    width: 300,
    paddingLeft: 10,
    top: 35,
    left: 180,
    zIndex: 2000,
    opacity: 0.3
  },
  textareaContainer: {
    borderWidth: 1,
    width: 300,
    height: 80,
    position: 'relative',
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: '#1C1C1C',
    borderColor: '#1C1C1C',
    alignSelf: 'center',
    color: 'white',
    borderRadius: 20,
    marginBottom: 100
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  ButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#2CA96E',
  }
});

export default styles;
