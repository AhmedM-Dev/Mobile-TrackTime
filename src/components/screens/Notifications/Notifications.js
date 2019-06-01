import React, { Component } from 'react';
import { ToastAndroid, Dimensions } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-native-textarea';
import { orderBy } from 'lodash';

import AppHeader from '../../ui/AppHeader';

import { vueNotification, acceptRequest, rejectRequest } from './actions';
import AwesomeAlert from 'react-native-awesome-alerts';

import leaveIcon from '../../../assets/img/leave.png'
import clockIcon from '../../../assets/img/clock.png'
import travelIcon from '../../../assets/img/travel.png'
import eventIcon from '../../../assets/img/event.png'
import infosIcon from '../../../assets/img/details.png'
import delaysIcon from '../../../assets/img/a.png'

var width = Dimensions.get('window').width;


import styles from './styles';

const initialState = {
  goTo: {
    to: null,
    data: null,
    category: null
  },
  note: '',
  showAlert: false,

};

showAlert = () => {
  this.setState({
    showAlert: true
  });
};



class Notifications extends Component {

  state = initialState;

  handleGoTo = (goTo) => {
    if (goTo.category === 'EVENT') {
      this.props.vueNotification(this.state.goTo.to);
      this.props.navigation.navigate('Events', { eventId: 'eventtttt' });
    } else {
      this.setState({
        goTo
      }, () => {
        this.props.vueNotification(this.state.goTo.to);
      });
    }
  }

  getLogo = (category) => {
    switch (category) {
      case 'EVENT': return eventIcon;
      case 'TRAVEL': return travelIcon;
      case 'INFO': return infosIcon;
      case 'LEAVE': return leaveIcon;
      case 'AUTHORIZATION': return leaveIcon;
      case 'ATTENDANCE': return clockIcon;
      case 'DELAY': return delaysIcon;
      case 'ABSENCE': return delaysIcon;
    }
  }

  handleNoteChange = (text) => {
    this.setState({
      note: text
    });
  }

  handleAccept = () => {
    if (this.state.goTo.category === 'LEAVE' || this.state.goTo.category === 'AUTHORIZATION') {
      this.props.acceptRequest({
        request: this.state.goTo.to && this.state.goTo.to.request,
        note: this.state.note,
        notifId: this.state.goTo.to.notifId
      });

      this.setState(initialState);
    }
  }

  handleReject = () => {
    if (this.state.goTo.category === 'LEAVE' || this.state.goTo.category === 'AUTHORIZATION') {
      this.props.rejectRequest({
        request: this.state.goTo.to && this.state.goTo.to.request,
        note: this.state.note,
        notifId: this.state.goTo.to.notifId
      });

      this.setState(initialState);
    }
  }

  render() {
    const { goTo } = this.state;

    if (goTo.to && (goTo.category === 'TRAVEL' || goTo.category === 'LEAVE' || goTo.category === 'ATTENDANCE' || goTo.category === 'AUTHORIZATION')) {
      return (
        <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>
          <Content>
            <Icon
              name="md-arrow-round-back"
              onPress={() => this.handleGoTo(initialState)}
              style={{ color: this.props.theme.fontColor, margin: 20 , fontSize:16  }}> </Icon>
            {
              goTo.category === 'LEAVE' &&
              <>
                <View style={{ backgroundColor: this.props.theme.cardBackground, width: 300, alignSelf: 'center', borderRadius: 20, padding: 20 , marginTop:20 }}>
                  <Text style={{ color: this.props.theme.fontColor ,fontWeight:'bold' , marginBottom:10}}>{goTo.to.title}  </Text> 
                  <Text style={{ color: this.props.theme.fontColor }} >From {goTo.to.request.dateFrom} {goTo.to.request.sessionFrom === 1 ? 'morning' : 'afternoon'}</Text>
                  <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} >To {goTo.to.request.dateTo} {goTo.to.request.sessionTo === 1 ? 'morning' : 'afternoon'}</Text>
                  <Text style={{ color: this.props.theme.fontColor }} >Motif : {goTo.to.request.motif}</Text>
                </View>
              </>
            }

            {
              goTo.category === 'AUTHORIZATION' &&
              <>
                <View style={{ backgroundColor: this.props.theme.cardBackground, width:  300, alignSelf: 'center', borderRadius: 20, padding: 20 , marginTop:20}}>
                  <Text style={{ color: this.props.theme.fontColor , fontWeight:'bold'}}> {goTo.to.title}</Text>
                  <Text style={{ color: this.props.theme.fontColor }}>Employee : {goTo.to.request.fromUserName}</Text>
                  <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} >Category : {goTo.to.request.leaveCategory}</Text>
                  <Text style={{ color: this.props.theme.fontColor }} >From : {goTo.to.request.dateFrom} {goTo.to.request.sessionFrom === 1 ? 'morning' : 'afternoon'}</Text>
                  <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} >To : {goTo.to.request.dateTo} {goTo.to.request.sessionTo === 1 ? 'morning' : 'afternoon'}</Text>
                  <Text style={{ color: this.props.theme.fontColor }} >Motif : {goTo.to.request.motif}</Text>
                </View>
              </>
            }

            {goTo.category === 'TRAVEL' && <View style={{ backgroundColor: this.props.theme.cardBackground, width:  300, alignSelf: 'center', borderRadius: 20, padding: 20 , marginTop:20}}>
              <Text style={{ color: this.props.theme.fontColor }}>Employee : {}</Text>
              <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > Category : </Text>
              <Text style={{ color: this.props.theme.fontColor }} >From : </Text>
              <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > To : </Text>
              <Text style={{ color: this.props.theme.fontColor }} >Motif : </Text>
            </View>}

            {goTo.category === 'ATTENDANCE' && <View style={{ backgroundColor: this.props.theme.cardBackground, width:  3000, alignSelf: 'center', borderRadius: 20, padding: 20 , marginTop:20}}>
              <Text style={{ color: this.props.theme.fontColor }} > Employee : {}</Text>
              <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > Category : </Text>
              <Text style={{ color: this.props.theme.fontColor }} > From : </Text>
              <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > To : </Text>
              <Text style={{ color: this.props.theme.fontColor }} > Motif : </Text>
            </View>}

            {
              goTo.to.request && goTo.to.request.status === "pending" &&
              <View style={{ marginTop: 20 , marginBottom:20 }}>
                <Textarea
                  containerStyle={{ ...styles.textareaContainer, backgroundColor: this.props.theme.cardBackground }}
                  style={{ ...styles.textarea, color: this.props.theme.fontColor }}
                  onChangeText={(text) => this.handleNoteChange(text)}
                  defaultValue={this.state.note}
                  placeholder={'Note'}
                  placeholderTextColor={this.props.theme.fontColor}
                  underlineColorAndroid={'transparent'}
                />


              </View>
            }

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
    } else if (goTo.to && (goTo.category === 'INFO' || goTo.category === 'DELAY' || goTo.category === 'ABSENCE')) {
      return (
        <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={goTo.to.title}
            message={goTo.to.content}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={false}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            cancelText="Ok"
            alertContainerStyle={{
              backgroundColor: this.props.theme.backgroundColor
            }}
            contentContainerStyle	={{
              backgroundColor:this.props.theme.cardBackground
            }}
            titleStyle={{
              color:this.props.theme.fontColor,
              fontWeight:'bold',
            }}
            messageStyle={{
              color:this.props.theme.fontColor

            }}
            cancelButtonColor='#4470B2'
            cancelButtonTextStyle	={{color:'white'}}
            onCancelPressed={() => {
              this.handleGoTo(initialState);
            }}
          />
        </Container>
      )
    } else
      return (
        <Container style={{ backgroundColor: this.props.theme.backgroundColor }} >
          <AppHeader title="Notifications" navigation={this.props.navigation} />
          <Content>
            <List style={{ backgroundColor: this.props.theme.notif, width: '100%' ,}} >
              {
                this.props.notifications.length > 0 && this.props.notifications.map((notif, id) => {
                  return (
                    <ListItem style={notif && notif.vues && notif.vues.includes(this.props.user.userId) ? { backgroundColor: this.props.theme.backgroundColor } : null } thumbnail key={id}>
                      <Left>
                        <Thumbnail square source={this.getLogo(notif.category)}  style={{marginLeft:10}}/>
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
    notifications: orderBy(state.notificationsReducer.notifications, 'createdAtTimestamp', 'desc'),
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
    user: state.authReducer.user
  }
}

const mapDispatchToProps = dispatch => ({
  vueNotification(notifId) { dispatch(vueNotification(notifId)) },
  acceptRequest(request) { dispatch(acceptRequest(request)) },
  rejectRequest(request) { dispatch(rejectRequest(request)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
