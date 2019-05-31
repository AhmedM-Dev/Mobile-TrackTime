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
    height: 180,
    padding: 5,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width:300,
    marginBottom:50,
    alignSelf:'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  ButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#4470B2',
  },
  
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10
  },
  
});

export default styles;
