import React from 'react';
import {
  StatusBar, Image, StyleSheet
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
  Header,
  Title
} from 'native-base';
import { map, split } from 'lodash';

import AttendanceClock from '../../ui/AttendanceClock';
import NotificationsBell from "../../ui/NotificationsBell";

import { getAttendances } from './actions';

import clock from '../../../assets/img/clock.png';
import clockB from '../../../assets/img/clockB.png';

import timeToAngle from '../../../utils/timeToAngle';

const languages = ['English', 'Frensh'];

import SimplePicker from 'react-native-simple-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';
class AttendanceTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: '15-05-2018' };
  }

  componentDidMount() {
    this.props.getAttendances();
  }

  render() {

    if (!this.props.attendancesList || this.props.attendancesList < 1) {
      return <></>
    } else

      return (
        <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>

          <StatusBar hidden />
          <Header style={{ backgroundColor: this.props.theme.backgroundColor, flexDirection: 'row', }}>
            <Icon name='md-menu' style={{
              color: this.props.theme.fontColor, position: 'absolute',
              left: 20, top: 15
            }}
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Title style={{ top: 15, color: this.props.theme.fontColor, marginRight: 90, marginLeft: 15 }}>Dashboard</Title>
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
                borderColor: this.props.theme.fontColor,
                zIndex: 20
              }}></Image>
            </TouchableHighlight>
            <NotificationsBell />
          </Header>
          <View style={{ flexDirection: 'row', alignSelf: 'center' , marginBottom:5 }}>
            <View style={{ marginRight: 5  }}>

              <DatePicker
                style={{ width: 280, marginBottom: 5, marginTop: 10  }}
                date={this.state.date1}
                mode="date"
                placeholder="Select start date"
                format="DD-MM-YYYY"
                minDate="01-01-2004"
                maxDate="31-12-2019"
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
                  this.setState({ date1: date });
                }}
              />
              <DatePicker
                style={{ width: 280,}}
                date={this.state.date2}
                mode="date"
                placeholder="Select end date"
                format="DD-MM-YYYY"
                minDate="01-01-2004"
                maxDate="31-12-2019"
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
                  this.setState({ date2: date });
                }}
              />
            </View>
            <View>
              <Button style={{ width: 110, height: 40, backgroundColor: '#0E6655', marginTop: 10, borderRadius: 20, width: 50 }}>
                <Icon name="md-done-all" style={{ color: 'white', fontSize: 18, }}></Icon>
              </Button>

              <Button
                style={{
                  width: 110,
                  height: 40,
                  backgroundColor: '#0E6655',
                  marginTop: 5,
                  borderRadius: 20,
                  width: 50,
                  
                }}
                onPress={() => this.props.navigation.navigate('New request')}>
                <Icon name="md-add" style={{ color: 'white', fontSize: 18, left:4 }}></Icon>
              </Button>

            </View>
          </View>

          <Content style={{ padding: 10 }}>

          
            {
              this.props.attendancesList.map((item, i) => {
                return (
                  <Card key={i} style={{ ...styles.cardStyle, backgroundColor: this.props.theme.cardBackground , borderColor:this.props.theme.cardBackground }}>
                    <View style={{ flex: 5, justifyContent: 'space-between' }}>
                      <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}>{item.date}</Text>
                      {
                        map(item.attendances, (time, i) => <Text key={i} style={{ color: i === 0 && timeToAngle(split(item.attendances[0], ':')) > -15 ? 'red' : this.props.theme.fontColor, fontSize: 18 }}>*{time}</Text>)
                      }
                    </View>
                    <View style={{ flex: 7 }}>
                      <Image source={this.props.theme.preset === 'light' ? clockB : clock} style={styles.clockAlign} ></Image>
                      <AttendanceClock attendances={item.attendances} />
                    </View>
                  </Card>
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

});

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    attendancesList: state.attendancesReducer.attendancesList,
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
    
  }
}

const mapDispatchToProps = dispatch => ({
  getAttendances() { dispatch(getAttendances()) },
  getAvatar() { dispatch(getAvatar()) }

});

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTime);