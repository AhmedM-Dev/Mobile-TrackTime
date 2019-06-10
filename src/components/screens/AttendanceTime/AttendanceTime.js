import React from 'react';
import {
  Image, StyleSheet, FlatList, TouchableNativeFeedback, ActivityIndicator, StatusBar, Alert
} from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import {
  Container,
  Content,
  Card,
  Text,
  Button,
  View,
  Icon,
  Picker
} from 'native-base';
import { map, split } from 'lodash';
import moment from 'moment';

import AppHeader from '../../ui/AppHeader';
import AttendanceClock from '../../ui/AttendanceClock';

import { correctAttendanceRequest } from '../../../store/actions';
import { getAttendances, checkIn } from './actions';
import { getUsers } from '../employeeManagement/actions';

import timeToAngle from '../../../utils/timeToAngle';

import clock from '../../../assets/img/clockA.png';
import clockB from '../../../assets/img/clockB.png';

const initialState = {
  dateFrom: null,
  dateTo: null,
  list: [],
  offset: 0,
  limit: 10,
  selectedUser: null
}

class AttendanceTime extends React.Component {
  state = initialState;

  componentDidMount() {
    this.props.getAttendances();
    this.props.getUsers();
  }

  handleFilterAttendances = () => {
    this.props.getAttendances({ ...this.state });
  }

  handleLazyLoading = () => {
    console.log("End reached");
  }

  handleAttendanceCorrectRequest = (attendance) => {
    this.props.correctAttendanceRequest({
      requestCategory: 'ATTENDANCE',
      motif: '',
      date: moment(attendance.date).format('YYYY-MM-DD'),
      attendance
    });
  }

  handleSendCorrectRequest = (attendance) => {
    if ((this.props.user.businessRole === 'CEO' || this.props.user.businessRole === 'Pole Lead') && (this.state.selectedUser === this.props.user)) {
      Alert.alert(
        moment(attendance.date).format('DD-MM-YYYY'),
        'Do you want to send a correction request for this attendance ?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
          { text: 'Submit', onPress: () => this.handleAttendanceCorrectRequest(attendance) }
        ],
        { cancelable: true },
      );
    } else if (this.props.user.businessRole !== 'CEO' && this.props.user.businessRole !== 'Pole Lead') {
      Alert.alert(
        moment(attendance.date).format('DD-MM-YYYY'),
        'Do you want to send a correction request for this attendance ?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
          { text: 'Submit', onPress: () => this.handleAttendanceCorrectRequest(attendance) }
        ],
        { cancelable: true },
      );
    }
  }

  handleChangeUser = (user) => {
    console.log('USER', user);
    this.setState({
      selectedUser: user
    }, () => {
      this.props.getAttendances({
        userId: this.state.selectedUser.userId,
        dateFrom: this.state.dateFrom,
        dateTo: this.state.dateTo
      });
    });
  }

  render() {

    console.log("STATE", this.state);

    if (!this.props.attendancesList) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size={80} color="#0000ff" />
          <StatusBar hidden={true} />
        </View>
      )
    } else

      return (
        <Container style={{ backgroundColor: this.props.theme.backgroundColor, }}>

          <AppHeader title="Attendances" navigation={this.props.navigation} />

          <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 5 }}>
            <View style={{ marginRight: 5 }}>

              <DatePicker
                style={{ width: 280, marginBottom: 5, marginTop: 10 }}
                date={this.state.dateFrom || ''}
                mode="date"
                placeholder="Select start date"
                format="YYYY-MM-DD"
                minDate="2006-01-01"
                maxDate={this.state.dateFrom || new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={null}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 20,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    backgroundColor: this.props.theme.cardBackground,
                    borderColor: this.props.theme.cardBackground,
                    borderRadius: 20,
                  },
                  placeholderText: {
                    color: this.props.theme.fontColor
                  },
                  dateText: {
                    color: this.props.theme.fontColor
                  }
                }}
                onDateChange={date => {
                  this.setState({ dateFrom: date });
                }}
              />

              <DatePicker
                style={{ width: 280, }}
                date={this.state.dateTo || ''}
                mode="date"
                placeholder="Select end date"
                format="YYYY-MM-DD"
                minDate={this.state.dateFrom || "2006-01-01"}
                maxDate={new Date()}
                iconSource={null}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    backgroundColor: this.props.theme.cardBackground,
                    borderColor: this.props.theme.cardBackground,
                    borderRadius: 20,
                  },
                  placeholderText: {
                    color: this.props.theme.fontColor
                  },
                  dateText: {
                    color: this.props.theme.fontColor
                  }
                }}

                onDateChange={date => {
                  this.setState({ dateTo: date });
                }}
              />
            </View>
            <View>
              <Button style={{ width: 110, height: 40, backgroundColor: '#0E995E', marginTop: 10, borderRadius: 20, width: 50 }} onPress={this.handleFilterAttendances}>
                <Icon name="md-done-all" style={{ color: 'white', fontSize: 18, }}></Icon>
              </Button>

              <Button
                style={{
                  width: 110,
                  height: 40,
                  backgroundColor: '#BB605E',
                  marginTop: 5,
                  borderRadius: 20,
                  width: 50,

                }}
                onPress={() => { this.setState(initialState); this.props.getAttendances(); }}
              >
                <Icon name="md-refresh" style={{ color: 'white', fontSize: 18, left: 4 }}></Icon>
              </Button>

            </View>
          </View>

          {
            this.props.user && (this.props.user.businessRole === 'CEO' || this.props.user.businessRole === 'Pole Lead') &&
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Picker
                selectedValue={this.state.selectedUser || this.props.user}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10
                }}
                onValueChange={this.handleChangeUser}>

                {
                  this.props.users && this.props.users.length > 0 && [this.props.user, ...this.props.users].map((user, i) =>
                    <Picker.Item key={i} label={`${user.firstName} ${user.lastName}`} value={user} color="#021630" />)
                }
              </Picker>
            </View>
          }

          {/* Check in button */}
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Button onLongPress={() => { this.props.checkIn(); this.props.getAttendances(); }} style={{ justifyContent: 'center', width: '100%', height: 40, backgroundColor: '#FAAC58', marginTop: 10, marginBottom: 10, borderRadius: 20 }}>
              <Text>CHECK IN</Text>
            </Button>
          </View>

          <Content style={{ padding: 10 }}>
            {
              this.props.attendancesList.map((item, index) => {
                return (
                  <TouchableNativeFeedback key={index} onLongPress={() => this.handleSendCorrectRequest(item)}>
                    <Card style={{ ...styles.cardStyle, backgroundColor: this.props.theme.cardBackground, borderColor: this.props.theme.cardBackground }}>
                      <View style={{ flex: 5, justifyContent: 'space-between' }}>
                        <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}>{`${new Date(item.date).getDate()}-${new Date(item.date).getMonth() + 1}-${new Date(item.date).getFullYear()}`}</Text>
                        {
                          map(item.attendances, (time, i) => <Text key={i} style={{ color: i === 0 && timeToAngle(split(item.attendances[0], ':')) > -15 ? '#EC8181' : this.props.theme.fontColor, fontSize: 18 }}>*{time}</Text>)
                        }
                      </View>
                      <View style={{ flex: 7 }}>
                        <Image source={this.props.theme.preset === 'light' ? clockB : clock} style={styles.clockAlign} ></Image>
                        {item.attendances.length >= 4 && item.attendances.length % 2 === 0 && <AttendanceClock attendances={item.attendances} />}
                      </View>
                    </Card>
                  </TouchableNativeFeedback>
                )
              })
            }
          </Content>
        </Container>
      )
  }
};

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 230,
    padding: 15,
    borderRadius: 10
  },

  clockAlign: {
    width: 194,
    height: 194,
    position: 'absolute',
    top: 0,
    right: 0
  },

  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: '#020B1C',
  }
});

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    attendancesList: state.attendancesReducer.attendancesList,
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
    users: state.usersReducer.users
  }
}

const mapDispatchToProps = dispatch => ({
  getAttendances(filters) { dispatch(getAttendances(filters)) },
  checkIn() { dispatch(checkIn()) },
  correctAttendanceRequest(attendanceId) { dispatch(correctAttendanceRequest(attendanceId)) },
  getUsers() { dispatch(getUsers()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTime);
