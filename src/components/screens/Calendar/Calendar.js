import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Content, View, Picker, Icon, Text } from 'native-base';
import { Table, Row, Cell, TableWrapper } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker';
import { getUsers } from '../Dashboard/actions';
import CustumPicker from '../../../components/ui/CustomPicker/CustumPicker'
import { getGroups, getCalendarData } from './actions';
import { Button } from 'react-native-elements';
import moment from 'moment';

import AppHeader from "../../ui/AppHeader";

const dayOfWeek = (days, format) => {
  return moment(moment().week(), 'WW').add(days, 'days').format(format)
}

const cellColor = cell => {
  switch (cell) {
    case 'W':
      return '#629FC3';
    case 'H':
      return 'yellow';
    case 'N':
      return '#e9f0f4';
    case 'L':
      return '#43d516';
    case 'T':
      return 'purple';
    case 'A':
      return '#e9f0f4';

    default:
      return '#e9f0f4';
  }
}

class Calendar extends React.Component {
  state = {
    group: '',
    connectedUser: {},
    tableHead: [
      'Employee',
      dayOfWeek(0, 'DD'),
      dayOfWeek(1, 'DD'),
      dayOfWeek(2, 'DD'),
      dayOfWeek(3, 'DD'),
      dayOfWeek(4, 'DD'),
      dayOfWeek(5, 'DD'),
      dayOfWeek(6, 'DD'),
    ],
    widthArr: [160, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
    date: moment(),
    firstDayCurrentWeek: moment(moment().isoWeek(), 'WW').format('DD-MM-YYYY'),
    currentMonth: moment().month()
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getGroups();
    this.props.getCalendarData(moment().format());

    console.log('week', moment("11-26-2016", "MMDDYYYY").isoWeek());
    console.log(moment(moment().isoWeek(), 'WW').add(2, 'days').format('DD-MM-YYYY'));
  }


  handleGroupChange = (group) => {
    this.setState({
      ...this.state,
      group: group
    });
  }

  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
    return (
      <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>

        <AppHeader title="Calendar" navigation={this.props.navigation} />

        <View style={{ marginTop: 10, marginBottom: 10 }}>

          <CustumPicker>
            <Picker
              selectedValue={this.state.group || ''}
              width={300}
              style={{
                height: 40, color: this.props.theme.fontColor,
              }}
              name="group"
              onValueChange={this.handleGroupChange}>
              {this.props.groups && this.props.groups.length > 0 && this.props.groups.map(group => <Picker.Item label={`${group.name}`} value={group.name} />)}
            </Picker>
          </CustumPicker>

          <View style={{ flexDirection: 'row', marginTop: 10, width: 340, alignItems: 'center', alignSelf: 'center' }}>
            <Button

              icon={
                <Icon
                  name="md-arrow-round-back"
                  style={{ color: this.props.theme.fontColor, marginRight: 10, fontSize: 18 }}
                />
              }

              buttonStyle={{
                backgroundColor: this.props.theme.cardBackground,
                borderRadius: 0,
                width: 165,
                marginRight: 10
              }}
              titleStyle={{
                color: this.props.theme.fontColor,
                top: -1,
              }}
              title="Previous week"
            // onPress={() => _signOutAsync()}
            />

            <Button

              icon={
                <Icon
                  name="md-arrow-round-forward"
                  style={{ color: this.props.theme.fontColor, fontSize: 18, left: 80 }}
                />
              }
              buttonStyle={{
                backgroundColor: this.props.theme.cardBackground,
                borderRadius: 0,
                width: 165,
              }}
              titleStyle={{
                color: this.props.theme.fontColor,
                top: -1,
                left: -20,
              }}
              title="Next week"
            // onPress={() => _signOutAsync()}
            />

          </View>
        </View>
        <View>

          <View style={{ marginBottom: 10, width: 340, alignSelf: 'center' }}>

            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <View style={{ width: 110, height: 25, backgroundColor: '#629FC3', alignItems: 'center' }}>
                <Text style={styles.title}> Week-end</Text>
              </View>
              <View style={{ width: 110, height: 25, backgroundColor: '#7E2A8B', marginLeft: 5, marginRight: 5, alignItems: 'center' }}>
                <Text style={styles.title}>Holiday</Text>
              </View>
              <View style={{ width: 110, height: 25, backgroundColor: 'transparent', alignItems: 'center' }}>
                <Text style={{ ...styles.title, color: '#629FC3' }}> * Authorization</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 125, height: 25, backgroundColor: '#BBA43A', alignItems: 'center' }}>
                <Text style={styles.title}>requested leave</Text>
              </View>

              <View style={{ width: 125, height: 25, backgroundColor: 'green', marginLeft: 5, marginRight: 5, alignItems: 'center' }}>
                <Text style={styles.title} >validated leave</Text>
              </View>

              <View style={{ width: 80, height: 25, backgroundColor: 'red', alignItems: 'center' }}>
                <Text style={styles.title} >Today</Text>
              </View>
            </View>

          </View>


        </View>

        <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
          <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
            <View>
              <Table borderStyle={{ borderColor: 'transparent' }}>
                <Row data={state.tableHead} widthArr={state.widthArr} style={{ height: 50, backgroundColor: this.props.theme.calendar.headerColor }} textStyle={{ ...styles.text, color: 'white' }} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                {this.props.data && this.props.data.length && <Table borderStyle={{ borderColor: 'transparent' }}>
                  {/* {
                    this.props.users && this.props.users.length > 0 && this.props.users.map((user, index) => (
                      <Row
                        key={index}
                        data={[`${user.firstName} ${user.lastName}`, 1, 1, 1, 1, 1, 1, 1]}
                        widthArr={state.widthArr}
                        style={[{ height: 40, backgroundColor: this.props.theme.calendar.c1 }, index % 2 && { backgroundColor: this.props.theme.calendar.c2 }]}
                        textStyle={{...styles.text , color:this.props.theme.fontColor}}
                      />
                    ))
                  } */}

                  {
                    this.props.data.map((item, index) => (
                      <TableWrapper key={index} style={{ flexDirection: 'row', backgroundColor: '#FFF1C1' }}>
                        {
                          item && item.length > 0 && item.map((cell, i) =>
                            i === 0 ? <Cell data={cell} style={{ paddingLeft: 15, backgroundColor: '#e9f0f4', width: 160, height: 40 }} textStyle={{ color: 'black' }} />
                              :
                              <Cell data={cell === 'A' ? '*' : ''} style={{ backgroundColor: cellColor(cell), width: 35, height: 40, borderColor: cell === 'W' ? 'white' : '#d0e1e3' }} textStyle={{ color: 'blue', textAlign: 'center' }} />
                          )
                        }
                      </TableWrapper>
                    ))
                  }
                </Table>}
              </ScrollView>
            </View>
          </ScrollView>
        </Content>
      </Container >
    )
  }
}
const styles = StyleSheet.create({

  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },

  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 14, alignSelf: 'center', color: 'white'
  }

});

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
    users: state.usersReducer.users,
    groups: state.groupsReducer.groups,
    data: state.calendarReducer.data
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers() { dispatch(getUsers()) },
  getGroups() { dispatch(getGroups()) },
  getCalendarData(params) { dispatch(getCalendarData(params)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
