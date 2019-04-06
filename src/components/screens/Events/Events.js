import React, { Component } from 'react';
import { Image, StatusBar, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  View,
  Text,
  Icon,
  Title,
  Content,
  Badge
} from 'native-base';

import Swiper from 'react-native-swiper';


import eventsLogo from '../../../assets/img/eventsLogo.png'
import afterWork from '../../../assets/img/afterWork.png'
export default class NewRequest extends Component {
  render() {


    return (
      <Container style={{ backgroundColor: '#DDE3F3' }} >
        <StatusBar hidden />
        <Header style={{ backgroundColor: '#052D8F', flexDirection: 'row' }}>
          <Icon name='md-menu' style={{
            color: 'white', position: 'absolute',
            left: 20, top: 15
          }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Title style={{ top: 15 }}>Events</Title>

          <View style={{ position: 'absolute', right: 20 }}>
            <Badge style={{ top: 10, right: -10, zIndex: 1 }}><Text>2</Text></Badge>
            <Icon active name="md-notifications" style={{ color: 'white', top: -10 }} />
          </View>
        </Header>
          <Swiper
            style={styles.wrapper}
            smoothTransition
            loop
            showPaginationBelow={true}
          >
            <View style={styles.slide}>
              <Text style={styles.text}>1</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>2</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>3</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>4</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>5</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>6</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>7</Text>
            </View>
          </Swiper>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#009688',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFCFD',
  },
  poster:{
  position:'absolute',
  top:20,
  alignSelf:'center',
  width:340
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },

})
