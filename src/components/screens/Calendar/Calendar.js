import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Content, View, Picker, Icon, Text } from 'native-base';
import { Table, Row } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker';
import { getUsers } from '../Dashboard/actions';
import CustumPicker from '../../../components/ui/CustomPicker/CustumPicker'
import { getGroups } from './actions';
import { Button } from 'react-native-elements';

import AppHeader from "../../ui/AppHeader";
class Calendar extends React.Component {
  state = {
    group: '',
    connectedUser: {},
    tableHead: ['Employee', '1', '2', '3', '4', '5', '6', '7'],
    widthArr: [160, 35, 35, 35, 35, 35, 35, 35],
  }
  componentDidMount() {
    this.props.getUsers();
    this.props.getGroups();
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
              <View style={{ width: 110, height: 25, backgroundColor: '#629FC3', alignItems:'center' }}>
                <Text style={styles.title}> Week-end</Text>
              </View>
              <View style={{ width: 110, height: 25, backgroundColor: '#7E2A8B' ,  marginLeft: 5, marginRight: 5, alignItems:'center'  }}>
                <Text style={styles.title}>Holiday</Text>
              </View>
              <View style={{  width: 110, height: 25, backgroundColor: 'transparent', alignItems:'center' }}>
                <Text style={{...styles.title , color:'#629FC3'}}> * Authorization</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{  width: 125, height: 25, backgroundColor: '#BBA43A' , alignItems:'center' }}>
                <Text style={styles.title}>requested leave</Text>
              </View>

              <View style={{  width: 125, height: 25, backgroundColor: 'green', marginLeft: 5, marginRight: 5, alignItems:'center' }}>
                <Text style={styles.title} >validated leave</Text>
              </View>

            <View style={{  width: 80, height: 25, backgroundColor: 'red' , alignItems:'center' }}>
              <Text style={styles.title} >Today</Text>
            </View>
            </View>

          </View>


        </View>

        <Content style={{ paddingLeft: 10, paddingRight: 10 }}>
          <ScrollView horizontal={true} style={{marginBottom:20}}>
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
                        data={[`${user.firstName} ${user.lastName}`, 1, 1, 1, 1, 1, 1, 1]}
                        widthArr={state.widthArr}
                        style={[{ height: 40, backgroundColor: this.props.theme.calendar.c1 }, index % 2 && { backgroundColor: this.props.theme.calendar.c2 }]}
                        textStyle={{...styles.text , color:this.props.theme.fontColor}}
                      />
                    ))
                  }
                </Table>
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
  title:{
   fontSize: 14 , alignSelf:'center', color:'white'
  }

});

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
    users: state.usersReducer.users,
    groups: state.groupsReducer.groups
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers() { dispatch(getUsers()) },
  getGroups() { dispatch(getGroups()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
