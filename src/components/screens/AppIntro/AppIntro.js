import React from 'react';
import{Icon} from 'native-base'
import { StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import a from '../../../assets/img/a.png'
import e from '../../../assets/img/e.png'
import k from '../../../assets/img/k.jpg'
const slides = [
    {
      key: 'somethun',
      title: 'Welcome to \n TrackTime',
      titleStyle:{color:'black'},
      textStyle:{color:'black'},
      backgroundColor: 'white',
    },
    {
      key: 'somethun-dos',
      title: 'Title 2',
      titleStyle:{color:'black'},
      textStyle:{color:'black'},
      text: 'Other cool stuff',
      // image: e,
      backgroundColor: 'white',
    },
    {
      key: 'somethun1',
      title: 'Rocket guy',
      titleStyle:{color:'black'},
      textStyle:{color:'black'},
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      // image: k,
      backgroundColor: 'white',
    }
  ];
const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#CACACA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  }
});

// slides = [...]

export default class AppIntro extends React.Component {
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          style={{ backgroundColor: 'transparent' , color:'white'  }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          style={{ backgroundColor: 'transparent' , color:'white' }}
          onPress onPress={() => this.props.navigation.navigate('Dashboard')} 
        />
      </View>
    );
  }

  render() {
    return (
      <AppIntroSlider
      dotStyle={
          {
              backgroundColor:'#CACACA'
          }
      }

      activeDotStyle={{
          backgroundColor:'green'
      }}
        slides={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    );
  }
}