import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PermissionsAndroid, StyleSheet, StatusBar, ActivityIndicator, Switch, Image ,ScrollView} from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Left, Body, Right, View, Picker, Footer, FooterTab, Badge, Icon, Header, Title } from 'native-base';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker';
import { getUsers} from '../Dashboard/actions';
import { TouchableHighlight } from 'react-native-gesture-handler';
import NotificationsBell from "../../ui/NotificationsBell";
import CustumPicker from '../../../components/ui/CustomPicker/CustumPicker'
import {getGroups} from './actions';
class Calendar extends React.Component {
    state = {
      group:'',
      connectedUser: {},
      tableHead: ['Name', '1', '2', '3', '4', '5', '6', '7'],
      widthArr: [200, 40, 40, 40, 40, 40, 40, 40],
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
          <StatusBar hidden />

          <Header style={{ backgroundColor: this.props.theme.backgroundColor, flexDirection: 'row', }}>
            <Icon name='md-menu' style={{
              color: this.props.theme.fontColor, position: 'absolute',
              left: 20, top: 15
            }}
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Title style={{ top: 15, color: this.props.theme.fontColor, marginRight: 90, marginLeft: 15 }}>Calendar</Title>
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
                borderColor: this.props.theme.fontColor
              }}></Image>
            </TouchableHighlight>
            <NotificationsBell />
          </Header>

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
               <CustumPicker style={{borderRadius:20 ,width: 280}}>
              <Picker
                selectedValue={this.state.group || ''}
                width={300}
                style={{
                  height: 40,color: this.props.theme.fontColor,
                }}
                name="group"
                onValueChange={this.handleGroupChange}>
                {this.props.groups && this.props.groups.length > 0 && this.props.groups.map(group => <Picker.Item label={`${group.name}`} value={group.name} />)}
              </Picker>
            </CustumPicker>
            </View>
            <View>
              <Button style={{ width: 110, height: 40, backgroundColor: '#0E6655', marginTop: 10, borderRadius: 20, width: 50 }} onPress={this.handleFilterAttendances}>
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
                <Icon name="md-add" style={{ color: 'white', fontSize: 18, left: 4 }}></Icon>
              </Button>

            </View>
          </View>

          <Content style={{padding:20}}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                  {
                    this.props.users && this.props.users.length > 0 && this.props.users.map((user, index) => (
                      <Row
                        key={index}
                        data={[`${user.firstName} ${user.lastName}`, 1, 1, 1, 1 ,1, 1, 1]}
                        widthArr={state.widthArr}
                        style={[styles.row, index%2 && {backgroundColor: 'white'}]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
              </Content>
        </Container>
              )
            }
          }
const styles = StyleSheet.create({

    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
  
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