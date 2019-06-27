import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Content, View, Picker, Icon, Text } from 'native-base';
import { Table, Row } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker';
import { getUsers } from '../Dashboard/actions';
import CustumPicker from '../../../components/ui/CustomPicker/CustumPicker'
import { Button } from 'react-native-elements';

import { find, random } from 'lodash';

import { getAllStats } from '../Dashboard/actions';

import AppHeader from "../../ui/AppHeader";
class Bulletin extends React.Component {
  state = {
    group: '',
    connectedUser: {},
    tableHead: ['Employee', 'Avg Work Hours', 'Total Days Worked', 'Total Hours Worked', 'Total Delays', 'Note'],
    widthArr: [160, 125, 125, 125, 125, 125],
  }
  componentDidMount() {
    this.props.getUsers();
    this.props.getAllStats();
  }


  handleGroupChange = (group) => {
    this.setState({
      ...this.state,
      group: group
    });
  }

  userData = (selectedUserId) => {
    const stats = find(this.props.allStats, ['userId', selectedUserId]);
    return stats ? [(stats.averageWorkingHours) && (stats.averageWorkingHours).toFixed(2), stats.totalDays && stats.totalDays.toFixed(2), stats.totalHours && stats.totalHours.toFixed(2), stats.totalDelays && stats.totalDelays.toFixed(2), random(7.3, 18.3).toFixed(2)] : [];
  }

  render() {
    const state = this.state;

    return (
      <View>
        <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
          <View>
            <Table borderStyle={{ borderColor: 'transparent' }}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={{ height: 50, backgroundColor: this.props.theme.calendar.headerColor }} textStyle={{ ...styles.text, color: 'white' }} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderColor: 'transparent' }}>
                {
                  this.props.users && this.props.users.length > 0 && this.props.users.map((user, index) => (
                    <Row
                      key={index}
                      data={[`${user.firstName} ${user.lastName}`, ...this.userData(user.userId)]}
                      widthArr={state.widthArr}
                      style={[{ height: 40, backgroundColor: this.props.theme.calendar.c1 }, index % 2 && { backgroundColor: this.props.theme.calendar.c2 }]}
                      textStyle={{ ...styles.text, color: this.props.theme.fontColor }}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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
    allStats: state.dashboardReducer.statsReducer.allStats,
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers() { dispatch(getUsers()) },
  getAllStats() { dispatch(getAllStats()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Bulletin);
