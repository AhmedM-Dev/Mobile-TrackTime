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
import { map, split } from 'lodash';
import { getEvents } from './actions';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

import AppHeader from '../../ui/AppHeader';

class Events extends Component {
  state = {
    list: [],
  }

  componentDidMount() {
    this.props.getEvents();
  }


  render() {

    if (!this.props.eventsList) {
      return <></>
    } else

      return (
        <Container style={{ backgroundColor: this.props.theme.backgroundColor }} >
          <AppHeader title="Events" navigation={this.props.navigation} />

          {
            this.props.eventsList.length > 0 &&
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

              {
                this.props.eventsList && this.props.eventsList.map((item, index) => {
                  return (
                    <Content>
                      <View style={{ fontSize: 30, fontWeight: 'bold' }}>
                        <Card style={{ width: 340, alignSelf: 'center', backgroundColor: this.props.theme.backgroundColor, borderColor: this.props.theme.cardBackground }}>
                          <CardItem style={{ backgroundColor: this.props.theme.backgroundColor }}>

                            <Left>
                              <Thumbnail source={{ uri: item && item.logo }} />
                              <Body>
                                <Text style={{ color: this.props.theme.fontColor }}>{item.title}</Text>
                                <Text style={{ color: this.props.theme.fontColor }} note> From :  {item.dateFrom} </Text>
                                <Text style={{ color: this.props.theme.fontColor }} note> To : {item.dateTo}</Text>
                              </Body>
                            </Left>
                          </CardItem>
                          <CardItem style={{ backgroundColor: this.props.theme.backgroundColor }}>
                            <Body style={{ borderRadius: 20 }}>
                              <Image source={{ uri: item && item.photo }} style={{ height: 200, width: 320, alignSelf: 'center', top: -15, borderRadius: 20 }} />
                              <Text style={{ color: this.props.theme.fontColor }} >
                                {item.details}
                              </Text>
                            </Body>
                          </CardItem>
                        </Card>
                      </View>
                    </Content>
                  )
                })
              }
            </Swiper>


          }

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
    eventsList: state.eventReducer.eventsList,

  }
}

const mapDispatchToProps = dispatch => ({
  getAvatar() { dispatch(getAvatar()) },
  getEvents(filters) { dispatch(getEvents(filters)) },

});

export default connect(mapStateToProps, mapDispatchToProps)(Events);