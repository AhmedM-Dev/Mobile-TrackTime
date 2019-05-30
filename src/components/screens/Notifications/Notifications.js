import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-native-textarea';

import AppHeader from '../../ui/AppHeader';

import { vueNotification, acceptRequest, rejectRequest } from './actions';

import leaveIcon from '../../../assets/img/leave.png'
import clockIcon from '../../../assets/img/clock.png'
import travelIcon from '../../../assets/img/travel.png'
import eventIcon from '../../../assets/img/event.png'
import infosIcon from '../../../assets/img/details.png'
import delaysIcon from '../../../assets/img/a.png'

import styles from './styles';

const initialState = {
  goTo: {
    to: null,
    data: null
  },
  note: ''
};

class Notifications extends Component {

  state = initialState;

  handleGoTo = (goTo) => {
    if (goTo.category === 'EVENT') {
      this.props.navigation.navigate('Events', { eventId: 'eventtttt' });
    } else {
      this.setState({
        goTo
      });
    }
  }

  getLogo = (category) => {
    switch (category) {
      case 'EVENT': return eventIcon;
      case 'TRAVEL': return travelIcon;
      case 'INFO': return infosIcon;
      case 'LEAVE': return leaveIcon;
      case 'ATTENDANCE': return clockIcon;
      case 'DELAY' || 'ABSENCE': return delaysIcon;
    }
  }

  handleNoteChange = (text) => {
    this.setState({
      note: text
    });
  }

  handleAccept = () => {
    if (this.state.goTo.category === 'LEAVE') {
      const res = this.props.acceptRequest({
        requestId: this.state.goTo.to && this.state.goTo.to.request && this.state.goTo.to.request.requestId,
        note: this.state.note
      });

      this.setState(initialState);
    }
  }

  handleReject = () => {
    if (this.state.goTo.category === 'LEAVE') {
      this.props.rejectRequest({
        requestId: this.state.goTo.to && this.state.goTo.to.request && this.state.goTo.to.request.requestId,
        note: this.state.note
      });

      this.setState(initialState);
    }
  }

  render() {
    const { goTo } = this.state;

    if (goTo.to && (goTo.category === 'TRAVEL' || goTo.category === 'LEAVE' || goTo.category === 'ATTENDANCE')) {
      return (
        <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>
          <Content>


            <Icon
              name="md-arrow-dropleft"
              onPress={() => this.handleGoTo(initialState)}
              style={{ color: this.props.theme.fontColor, margin: 20 }}> </Icon>

            {
              goTo.category === 'LEAVE' &&
              <>
                <View style={{ backgroundColor: this.props.theme.cardBackground, width: 340, width: 340, alignSelf: 'center', borderRadius: 20, padding: 20 }}>
                  <Text style={{ color: this.props.theme.fontColor }}>Title : {goTo.to.title}</Text>
                  <Text style={{ color: this.props.theme.fontColor }}>Employee : {goTo.to.request.fromUserName}</Text>
                  <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} >Category : {goTo.to.category}</Text>
                  <Text style={{ color: this.props.theme.fontColor }} >From : </Text>
                  <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} >To : </Text>
                  <Text style={{ color: this.props.theme.fontColor }} >Motif : {goTo.to.request.motif}</Text>
                </View>

                {goTo.to.request.status === "pending" && <View style={{ marginTop: 10 }}>
                  <Textarea
                    containerStyle={{ ...styles.textareaContainer, backgroundColor: this.props.theme.pickerBackground }}
                    style={{ ...styles.textarea, color: this.props.theme.fontColor }}
                    onChangeText={(text) => this.handleNoteChange(text)}
                    defaultValue={this.state.note}
                    placeholder={'Note'}
                    placeholderTextColor={this.props.theme.fontColor}
                    underlineColorAndroid={'transparent'}
                  />
                </View>}
              </>
            }

            {goTo.category === 'TRAVEL' && <View style={{ backgroundColor: this.props.theme.cardBackground, width: 340, width: 340, alignSelf: 'center', borderRadius: 20, padding: 20 }}>
              <Text style={{ color: this.props.theme.fontColor }}>Employee : {}</Text>
              <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > Category : </Text>
              <Text style={{ color: this.props.theme.fontColor }} >From : </Text>
              <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > To : </Text>
              <Text style={{ color: this.props.theme.fontColor }} >Motif : </Text>
            </View>}

            {goTo.category === 'ATTENDANCE' && <View style={{ backgroundColor: this.props.theme.cardBackground, width: 340, width: 340, alignSelf: 'center', borderRadius: 20, padding: 20 }}>
              <Text style={{ color: this.props.theme.fontColor }} > Employee : {}</Text>
              <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > Category : </Text>
              <Text style={{ color: this.props.theme.fontColor }} > From : </Text>
              <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > To : </Text>
              <Text style={{ color: this.props.theme.fontColor }} > Motif : </Text>
            </View>}

            {
              goTo.to && goTo.to.request && goTo.to.request.status === 'pending' &&
              <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 20 }}>
                <Button onPress={this.handleAccept} style={{ backgroundColor: 'green', marginRight: 20 }} ><Text>Accept</Text></Button>
                <Button onPress={this.handleReject} style={{ backgroundColor: 'red' }} ><Text>Reject</Text></Button>
              </View>
            }
          </Content>
        </Container>
      )
    } else
      return (
        <Container style={{ backgroundColor: this.props.theme.backgroundColor }} >
          <AppHeader title="Notifications" navigation={this.props.navigation} />
          <Content>
            <List style={{ backgroundColor: this.props.theme.backgroundColor, }} >
              {
                this.props.notifications.length > 0 && this.props.notifications.map((notif, id) => {
                  return (
                    <ListItem thumbnail key={id}>
                      <Left>
                        <Thumbnail square source={this.getLogo(notif.category)} />
                      </Left>
                      <Body>
                        <Text style={{ color: this.props.theme.fontColor, fontSize: 11 }}>{notif.title && notif.title.substring(0, 26)}...</Text>
                        <Text note numberOfLines={1} style={{ color: this.props.theme.fontColor, fontSize: 10 }}>{notif.content && notif.content.substring(0, 35)}...</Text>
                      </Body>
                      <Right>
                        <Button transparent onPress={() => this.handleGoTo({ to: notif, category: notif.category, eventId: notif.category === 'EVENT' })}>
                          <Text>View</Text>
                        </Button>
                      </Right>
                    </ListItem>
                  )
                })
              }
            </List>
          </Content>
        </Container>
      );
  }
}

Notifications.propTypes = {
  theme: PropTypes.object
};

const mapStateToProps = state => {
  return {
    notifications: state.notificationsReducer.notifications,
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
  }
}

const mapDispatchToProps = dispatch => ({
  vueNotification(notifId) { dispatch(vueNotification(notifId)) },
  acceptRequest(request) { dispatch(acceptRequest(request)) },
  rejectRequest(request) { dispatch(rejectRequest(request)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
