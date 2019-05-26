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
import NotificationsBell from "../../ui/NotificationsBell";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import events from '../../../assets/img/eventsLogo.png'
import dockerMeetup from '../../../assets/img/dockerMeetup.jpg'
import { TouchableHighlight } from 'react-native-gesture-handler';

import AppHeader from '../../ui/AppHeader';

class Events extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: this.props.theme.backgroundColor }} >
        <AppHeader title="Events" navigation={this.props.navigation} />
        <Swiper
          style={{ backgroundColor: this.props.theme.backgroundColor, flex: 1 }}
          smoothTransition
          loop
          showsButtons={false}
          dot={<View style={{ backgroundColor: '#CFCDCD', width: 10, height: 10, borderRadius: 7, marginLeft: 4, marginRight: 4 }} />}
          activeDot={<View style={{ backgroundColor: '#74BE9C', width: 10, height: 10, borderRadius: 7, marginLeft: 4, marginRight: 4 }} />}
          paginationStyle={{
            bottom: 30
          }}
          showPaginationBelow={false}>
          <Content>


            <View style={{ fontSize: 30, fontWeight: 'bold' }}>
              <Card style={{ width: 340, alignSelf: 'center', backgroundColor: this.props.theme.backgroundColor, borderColor: this.props.theme.cardBackground }}>
                <CardItem style={{ backgroundColor: this.props.theme.backgroundColor }}>
                  <Left>
                    <Thumbnail source={events} />
                    <Body>
                      <Text style={{ color: this.props.theme.fontColor }}>Tunisia docker meetup</Text>
                      <Text style={{ color: this.props.theme.fontColor }} note>date </Text>
                      <Text style={{ color: this.props.theme.fontColor }} note>time </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem style={{ backgroundColor: this.props.theme.backgroundColor }}>
                  <Body style={{ borderRadius: 20 }}>
                    <Image source={dockerMeetup} style={{ height: 200, width: 320, alignSelf: 'center', top: -15, borderRadius: 20 }} />
                    <Text style={{ color: this.props.theme.fontColor }} >
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
                {/* <CardItem>
                  <Left>
                    <Button transparent textStyle={{ color: '#87838B' }}>
                      <Icon name="md-heart" style={{ color: 'red' }} />
                      <Text>20 reacts</Text>
                    </Button>
                  </Left>
                </CardItem> */}
              </Card>
            </View>
          </Content>



          <View >
            <Text >2</Text>
          </View>
          <View >
            <Text >3</Text>
          </View>

        </Swiper>

      </Container>
    );
  }
}





const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,

  }
}

const mapDispatchToProps = dispatch => ({
  getAvatar() { dispatch(getAvatar()) }

});

export default connect(mapStateToProps, mapDispatchToProps)(Events);