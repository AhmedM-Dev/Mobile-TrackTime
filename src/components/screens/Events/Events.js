import React, { Component } from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  View,
  Text,
  Icon,
  Title,
  Content,
  Badge, Card, CardItem, Thumbnail, Button, Left, Body
} from 'native-base';

import Swiper from 'react-native-swiper';
import SimplePicker from 'react-native-simple-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';
const languages = ['English', 'Frensh'];

import events from '../../../assets/img/eventsLogo.png'
import dockerMeetup from '../../../assets/img/dockerMeetup.jpg'
import { CardList } from 'react-native-card-list';

export default class NewRequest extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: 'white' }} >
        <StatusBar hidden />

        <Header style={{ backgroundColor: 'white', flexDirection: 'row', }}>
          <Icon name='md-menu' style={{
            color: 'black', position: 'absolute',
            left: 20, top: 15
          }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Title style={{ top: 15, color: 'black', marginRight: 70, marginLeft: 5 }}>Events</Title>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Settings')} style={{
            borderRadius: 100,
            height: 30,
            width: 30,
            marginRight: 15,
            top: 15,
          }}>
            <Image source={{ uri: this.props.avatar && this.props.avatar.photo }} style={{
              borderRadius: 100,
              height: 30,
              width: 30,
              borderWidth: 1,
              borderColor: 'black',
              zIndex: 20
            }}></Image>
          </TouchableHighlight>

          <Icon name="md-globe"
            style={{
              top: 13,
              color: 'black',
              fontSize: 34,
              marginRight: 15,
            }}
            onPress={() => {
              this.refs.picker.show();
            }} />
          <SimplePicker
            ref={'picker'}
            options={languages}
            labels={languages}
            itemStyle={{
              fontSize: 25,
              color: 'red',
              textAlign: 'left',
              fontWeight: 'bold',
            }}
            onSubmit={(languages) => {
              this.setState({
                languageSelected: languages,
              });
            }}
          />
          {/* <NotificationsBell userId={this.state.connectedUser && this.state.connectedUser.userId} /> */}
        </Header>
        <Swiper
          style={styles.wrapper}
          smoothTransition
          loop
          showPaginationBelow={true}
        >
          <Content>
            <View style={styles.slide}>
              <Card style={{ width: 340, alignSelf: 'center' }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={events} />
                    <Body>
                      <Text>Tunisia docker meetup</Text>
                      <Text note>date </Text>
                      <Text note>time </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Image source={dockerMeetup} style={{ height: 200, width: 320, alignSelf: 'center', top: -20 }} />
                    <Text>
                      #Docker : Every year the Docker community everywhere celebrates the Docker birthday. This year we are #organizing the first Docker Meetup in Tunisia.
                    {'\n'}{'\n'}
                      Join us celebrating the 6th Docker Birthday :D
                      Subscribe Now ! => https://bit.ly/2IZdJqD
    {'\n'}{'\n'}
                      The goal of this event is to share knowledge and testimonials and customer stories about Docker and its ecosystem, presented by Regional experts and IT professionals.
    {'\n'}{'\n'}
                      #Proxym #ARSII
                </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent textStyle={{ color: '#87838B' }}>
                      <Icon name="md-heart" style={{ color: 'red' }} />
                      <Text>20 reacts</Text>
                    </Button>
                  </Left>
                </CardItem>
              </Card>
            </View></Content>
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
    backgroundColor: 'white',
    flex: 1,

  },
  slide: {
    flex: 1,
    backgroundColor: 'white',
  },

  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },


})
