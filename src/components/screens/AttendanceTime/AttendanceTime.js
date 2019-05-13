import React from 'react';
import {
  StatusBar, Image, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Card,
  Text,
  Button,
  View,
  Picker,
  Footer,
  FooterTab,
  Badge,
  Icon,
  Header,
  Title,
  List
} from 'native-base';
import { map } from 'lodash';

import AttendanceClock from '../../ui/AttendanceClock';

import { getAttendances } from './actions';

import clock from '../../../assets/img/clock.png';
import clockB from '../../../assets/img/clockB.png';
import DatePicker from 'react-native-datepicker';
import dateIcon from '../../../assets/img/date.png';


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

          <Header style={{ backgroundColor: '#021630', flexDirection: 'row' }}>
            <Icon name='md-menu' style={{
              color: 'white', position: 'absolute',
              left: 20, top: 15
            }}
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Title style={{ top: 15 }}>Attendance time</Title>

            <View style={{ position: 'absolute', right: 20 }}>
              <Badge style={{ top: 10, right: -10, zIndex: 1 }}><Text>2</Text></Badge>
              <Icon active name="md-notifications" style={{ color: 'white', top: -10 }} />
            </View>
          </Header>

          <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
            <View style={{ marginRight: 5 }}>

              <DatePicker
                style={{ width: 225, marginBottom: 5, marginTop: 10 }}
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
                    backgroundColor: '#082955',
                    borderColor: '#082955',

                  },
                }}
                onDateChange={date => {
                  this.setState({ date1: date });
                }}
              />
              <DatePicker
                style={{ width: 225, }}
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
                    backgroundColor: '#082955',
                    borderColor: '#082955'
                  },
                }}

                onDateChange={date => {
                  this.setState({ date2: date });
                }}
              />
            </View>

            <Button style={{ width: 110, height: 85, backgroundColor: '#0E6655', marginTop: 10, }}>
              <Icon name="md-done-all" style={{ color: 'white', fontSize: 40, left: 20 }}></Icon>
            </Button>
          </View>

          <Content style={{ padding: 10 }}>
            {
              this.props.attendancesList.map((item, i) => {
                return (
                  <Card key={i} style={{ ...styles.cardStyle, backgroundColor: this.props.theme.cardBackground }}>
                    <View style={{ flex: 5, justifyContent: 'space-between' }}>
                      <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}>{item.date}</Text>
                      {
                        map(item.attendances, (time, i) => <Text key={i} style={{ color: this.props.theme.fontColor, fontSize: 18 }}>*{time}</Text>)
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
    backgroundColor: '#082955',
    borderColor: '#082955',
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
    theme: state.settingsReducer.theme
  }
}

const mapDispatchToProps = dispatch => ({
  getAttendances() { dispatch(getAttendances()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTime);