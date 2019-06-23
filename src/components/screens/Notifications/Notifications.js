import React, { Component } from 'react';
import { ToastAndroid, Dimensions, TouchableHighlight , Image} from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, View } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-native-textarea';
import { orderBy, pullAt } from 'lodash';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

import AppHeader from '../../ui/AppHeader';
import AwesomeAlert from 'react-native-awesome-alerts';
import StyledInput from '../../ui/Input/';

import { vueNotification, acceptRequest, rejectRequest } from './actions';

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

    console.log('goTo', goTo);

    if (goTo.category === 'EVENT') {
      this.props.vueNotification(goTo.to);
      this.props.navigation.navigate('Events', { eventId: 'eventtttt' });
    } else if (goTo.category === 'ATTENDANCE') {
      this.setState({
        goTo,
        attendances: goTo.to.request.attendance.attendances
      }, () => {
        this.props.vueNotification(this.state.goTo.to);
      });
    }


    else {
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
    } else if (this.state.goTo.category === 'ATTENDANCE') {
      this.props.acceptRequest({
        request: {
          ...this.state.goTo.to.request,
          attendance: {
            ...this.state.goTo.to.request.attendance,
            attendances: this.state.attendances
          }
        },
        note: this.state.note,
        notifId: this.state.goTo.to.notifId
      });

      this.setState(initialState);
    } else if (this.state.goTo.category === 'TRAVEL') {
      this.props.acceptRequest({
        request: this.state.goTo.to.request,
        note: this.state.note,
        notifId: this.state.goTo.to.notifId
      });

      this.setState(initialState);
    }
  }

  handleReject = () => {
    if (this.state.goTo.category === 'LEAVE' || this.state.goTo.category === 'AUTHORIZATION' || this.state.goTo.category === 'ATTENDANCE' || this.state.goTo.category === 'TRAVEL') {
      this.props.rejectRequest({
        request: this.state.goTo.to && this.state.goTo.to.request,
        note: this.state.note,
        notifId: this.state.goTo.to.notifId
      });

      this.setState(initialState);
    }
  }

  handleDeleteAttendance = (index) => {
    this.setState({
      attendances: this.state.attendances.filter((item, i) => i !== index)
    });
  }

  handleAddAttendance = () => {
    this.setState({
      attendances: this.state.attendances && this.state.attendances.length > 0 ? [...this.state.attendances, moment().format('HH:mm:ss')] : [moment().format('HH:mm:ss')]
    });
  }

  handleChangeAttendance = (newDate, index) => {
    let att = this.state.attendances;

    att[index] = newDate;

    this.setState({
      attendances: att
    });
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
              style={{ color: '#DA7373', margin: 20, fontSize: 16 }}> </Icon>
            {
              goTo.category === 'LEAVE' &&
              <>
                <View style={{ backgroundColor: this.props.theme.cardBackground, width: 300, alignSelf: 'center', borderRadius: 20, padding: 20, marginTop: 5 }}>
                  <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold', marginBottom: 10 }}>{goTo.to.title}</Text>
                  <Text style={{ color: this.props.theme.fontColor }} >From {goTo.to.request.dateFrom} {goTo.to.request.sessionFrom === 1 ? 'morning' : 'afternoon'}</Text>
                  <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} >To {goTo.to.request.dateTo} {goTo.to.request.sessionTo === 1 ? 'morning' : 'afternoon'}</Text>
                  <Text style={{ color: this.props.theme.fontColor }} >Motif : {goTo.to.request.motif}</Text>
                  <Text style={{ color: this.props.theme.fontColor }} >Remaining leave credit : {goTo.to.request.userCredit} days</Text>
                </View>
              </>
            }

            {
              goTo.category === 'AUTHORIZATION' &&
              <>
                <View style={{ backgroundColor: this.props.theme.cardBackground, width: 300, alignSelf: 'center', borderRadius: 20, padding: 20, marginTop: 20 }}>
                  <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}> {goTo.to.title}</Text>
                  <Text></Text>
                  <Text style={{ color: this.props.theme.fontColor }}>Employee : {goTo.to.request.fromUserName}</Text>
                  <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} >Category : {goTo.to.request.leaveCategory}</Text>
                  <Text style={{ color: this.props.theme.fontColor }} >From : {goTo.to.request.dateFrom} {goTo.to.request.sessionFrom === 1 ? 'morning' : 'afternoon'}</Text>
                  <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} >To : {goTo.to.request.dateTo} {goTo.to.request.sessionTo === 1 ? 'morning' : 'afternoon'}</Text>
                  <Text style={{ color: this.props.theme.fontColor }} >Motif : {goTo.to.request.motif}</Text>
                </View>
              </>
            }

            {
              goTo.category === 'TRAVEL' &&
              <View style={{ backgroundColor: this.props.theme.cardBackground, width: 300, alignSelf: 'center', borderRadius: 20, padding: 20, marginTop: 20 }}>
                <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}>{goTo.to.title}</Text>
                <Text></Text>
                <Text style={{ color: this.props.theme.fontColor }}><Text style={{ fontWeight: 'bold' }}>Employee:</Text> {goTo.to.request.fromUserName}</Text>
                <Text style={{ color: this.props.theme.fontColor }}><Text style={{ fontWeight: 'bold' }}>From:</Text> {`in ${goTo.to.request.travel.startDate} at ${goTo.to.request.travel.startTime}`}</Text>
                <Text style={{ color: this.props.theme.fontColor }}><Text style={{ fontWeight: 'bold' }}>To:</Text> {`in ${goTo.to.request.travel.endDate} at ${goTo.to.request.travel.endTime}`}</Text>
                <Text style={{ color: this.props.theme.fontColor }}><Text style={{ fontWeight: 'bold' }}>Conductor:</Text> {`${goTo.to.request.travel.conductor.firstName} ${goTo.to.request.travel.conductor.lastName}`}</Text>
                <Text style={{ color: this.props.theme.fontColor }}><Text style={{ fontWeight: 'bold' }}>Destination Address:</Text> {goTo.to.request.travel.destinationAdress}</Text>
                <Text style={{ color: this.props.theme.fontColor }}><Text style={{ fontWeight: 'bold' }}>Travel Type:</Text> {goTo.to.request.travel.travelType}</Text>
                <Text style={{ color: this.props.theme.fontColor }}><Text style={{ fontWeight: 'bold' }}>Type:</Text> {goTo.to.request.travel.type}</Text>
              </View>
            }

            {
              goTo.category === 'ATTENDANCE' &&
              <View style={{ backgroundColor: this.props.theme.cardBackground, width: 300, alignSelf: 'center', borderRadius: 20, padding: 20 ,top:-10, marginBottom:5 ,}}>
                <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}>{goTo.to.title}</Text>
                <Text></Text>
                <Text style={{ color: this.props.theme.fontColor }}>Employee : {goTo.to.request.fromUserName}</Text>
                <Text style={{ color: this.props.theme.fontColor }}>Date : {moment(goTo.to.request.attendance.date).format('YYYY-MM-DD')}</Text>
                <Text style={{ color: this.props.theme.fontColor  }}>Motif : <Text>i had a duplicate attendance at 13:00 , can you correct this for me please ?{goTo.to.request.motif}</Text></Text>
              </View>
            }

            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
              {
                goTo.category === 'ATTENDANCE' && goTo.to.request.status === 'pending' && this.state.attendances.map((item, i) => {
                  return (
                    <View key={i} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <DatePicker
                        style={{ width: 260, alignSelf: 'center', color:  'black', height: 50 }}
                        date={item}
                        mode="time"
                        iconSource={null}
                        format="HH:mm:ss"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 2,
                            marginLeft: 0,
                          },
                          dateInput: {
                            marginTop: 10,
                            backgroundColor: this.props.theme.cardBackground,
                            borderColor: this.props.theme.cardBackground,
                            borderRadius: 10

                          },
                          placeholderText: {
                            color: 'black', position: 'absolute', left: 20
                          },
                          dateText: {
                            color: 'black', position: 'absolute', left: 20
                          }
                        }}
                        onDateChange={(changedDate) => this.handleChangeAttendance(changedDate, i)}
                      />
                      <TouchableHighlight style={{
                        borderRadius: 100,
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }} onPress={() => this.handleDeleteAttendance(i)}>
                        <Text style={{ color: '#CD4F4F' }}>X</Text>
                      </TouchableHighlight>

                    </View>
                  )
                })
              }
              {goTo.category === 'ATTENDANCE' && goTo.to.request.status === 'pending' && <Button onPress={this.handleAddAttendance} style={{ justifyContent: 'center', width: 300, height: 40, backgroundColor: '#448DB7', marginTop: 10, marginBottom: 10, borderRadius: 10 }}>
                <Text>Add Attendance</Text>
              </Button>}
            </View>

            {
              goTo.to.request && goTo.to.request.status === "pending" &&
              <View style={{ marginTop: 20, marginBottom: 20 }}>
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
            contentContainerStyle={{
              backgroundColor: this.props.theme.cardBackground
            }}
            titleStyle={{
              color: this.props.theme.fontColor,
              fontWeight: 'bold',
            }}
            messageStyle={{
              color: this.props.theme.fontColor

            }}
            cancelButtonColor='#4470B2'
            cancelButtonTextStyle={{ color: 'white' }}
            onCancelPressed={() => {
              this.handleGoTo(initialState);
            }}
          />
        </Container>
      )
    } else
      return (
        <Container style={{ backgroundColor: 'this.props.theme.backgroundColor' }} >
          <AppHeader title="Notifications" navigation={this.props.navigation} />
          <Content>
            <List style={{ backgroundColor: 'white', width: '100%', }} >
              {
                this.props.notifications.length > 0 ? this.props.notifications.map((notif, id) => {
                  return (
                    <ListItem style={{ backgroundColor: 'white' && notif.vues && notif.vues.includes(this.props.user.userId) ? null : this.props.theme.notif, marginLeft: 0, paddingLeft: 15, borderBottomWidth: 0.5 }} thumbnail key={id}>
                      <Left>
                        <Thumbnail square source={this.getLogo(notif.category)} style={{ marginLeft: 10 }} />
                      </Left>
                      <Body style={{ borderBottomWidth: 0 }}>
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
                }) : <Text>No notification available.</Text>
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
