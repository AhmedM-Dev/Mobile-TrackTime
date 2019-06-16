import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, Content, Picker, Button, Container, Icon } from 'native-base'
import axios from "axios";
import { API_URL } from "../../../../config";
import DatePicker from 'react-native-datepicker';
import ActionButton from 'react-native-circular-action-menu';
import { connect } from 'react-redux';

import { getUsers } from '../Dashboard/actions';
import { createTravelRequest } from '../../../store/actions';

export class createTravel extends Component {
  constructor() {
    super();
    this.state = {
      travelType: '',
      conductor: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      type: '',
      destinationAdress: ''
    }
  };

  resetAll = () => {
    this.setState({
      travelType: '',
      conductor: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      type: '',
      destinationAdress: ''
    })
  }

  handleCreateTravel = () => {
    this.props.createTravelRequest({
      requestCategory: 'TRAVEL',
      travel: {
        ...this.state
      }
    });
  }

  handleTravelTypeChange = (travelType) => {
    this.setState({
      ...this.state,
      travelType: travelType
    });
  }

  handleTypeChange = (type) => {
    this.setState({
      ...this.state,
      type: type
    });
  }

  handleConductorChange = (conductor) => {
    this.setState({
      ...this.state,
      conductor: conductor
    });
  }

  handleDateChange = (type, value) => {
    this.setState({
      ...this.state,
      startDate: type === "startDate" ? value : this.state.startDate,
      endDate: type === "endDate" ? value : this.state.endDate,
    })
  }

  handleDestinationAdressChange = (text) => {
    this.setState({
      ...this.state,
      destinationAdress: text
    });
  }

  componentDidMount() {
    this.props.getUsers({ all: true });
  }

  render() {
    return (
      <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>
        <StatusBar hidden />
        <Content >
          <View style={{marginTop:50}}>
            <View>
              <DatePicker
                style={{ width: 300, alignSelf: 'center', marginBottom: 10, color: 'white', marginTop: 5 }}
                date={this.state.startDate}
                mode="datetime"
                iconSource={null}
                placeholder="From ... "
                format="DD-MM-YYYY, HH:mm"
                minDate="01-01-2019"
                maxDate="31-12-2019"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginTop: 10,
                    backgroundColor: this.props.theme.pickerBackground,
                    borderColor: this.props.theme.pickerBackground,
                    borderWidth: 1,
                    borderRadius: 20, height:50 , marginBottom:10

                  },
                  placeholderText: {
                    color: 'black',
                    left: -100, position: 'absolute', left: 10
                  },
                  dateText: {
                    color: 'black',
                    left: -67, position: 'absolute', left: 10
                  }
                }}
                onDateChange={(startdate) => { this.handleDateChange("startDate", startdate) }} />

              <DatePicker
                style={{ width: 300, alignSelf: 'center', marginBottom: 10, color: 'white', marginTop: 5 }}
                date={this.state.endDate}
                mode="datetime"
                iconSource={null}
                placeholder="To ... "
                format="DD-MM-YYYY, HH:mm"
                minDate="01-01-2019"
                maxDate="31-12-2019"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginTop: 10,
                    backgroundColor: this.props.theme.pickerBackground,
                    borderColor: this.props.theme.pickerBackground,
                    borderWidth: 1,
                    borderRadius: 20 ,height:50 
                  },
                  placeholderText: {
                    color: 'black',
                    left: -100, position: 'absolute', left: 10
                  },
                  dateText: {
                    color: 'black',
                    left: -67, position: 'absolute', left: 10
                  }
                }}
                onDateChange={(enddate) => { this.handleDateChange("endDate", enddate) }} />
            </View>

            <View style={{
              ...styles.autorisationList,
              backgroundColor: this.props.theme.pickerBackground,
              borderColor: this.props.theme.pickerBackground, marginTop: 10 , marginBottom:10
            }}>
                <Picker
                  selectedValue={this.state.travelType}
                  style={{
                    color: 'black',
                  }}
                  textStyle={{ color: 'black' }}
                  itemTextStyle={{ color: 'black', }}
                    onValueChange={(itemValue, itemIndex) =>
                    this.handleTravelTypeChange(itemValue)
                  }>
                  <Picker.Item label="Type" value={null} />
                  <Picker.Item label="Local" value="Local" />
                  <Picker.Item label="Abroad" value="Abroad" />
                </Picker>
            </View>

            <View style={{
              ...styles.autorisationList,
              backgroundColor: this.props.theme.pickerBackground,
              borderColor: this.props.theme.pickerBackground, marginBottom:10
            }}>
                <Picker
                  selectedValue={this.state.conductor}
                  style={{
                    color: 'black',
                  }}
                  textStyle={{ color: 'black' }}
                  itemTextStyle={{ color: 'black', }}
                                    onValueChange={(itemValue, itemIndex) =>
                    this.handleConductorChange(itemValue)
                  }>

                  {
                    this.props.users && this.props.users.length > 0 && [{ fake: true }, ...this.props.users].map(user => {
                      return (
                        user.fake ? <Picker.Item  label="Conductor" value={null} /> :
                          <Picker.Item label={`${user.firstName} ${user.lastName}`} value={user} />
                      )
                    }
                    )
                  }
                </Picker>
              </View>


              <View style={{
              ...styles.autorisationList,
              backgroundColor: this.props.theme.pickerBackground,
              borderColor: this.props.theme.pickerBackground, marginBottom:10
            }}>
           
                <Picker
                  selectedValue={this.state.type}
                  style={{
                    color: 'black',
                  }}
                  textStyle={{ color: 'black' }}
                  itemTextStyle={{ color: 'black', }}
                          onValueChange={(itemValue, itemIndex) =>
                    this.handleTypeChange(itemValue)
                  }>
                  <Picker.Item label="Type" value={null} />
                  <Picker.Item label="Administration" value="Administration" />
                  <Picker.Item label="Customer" value="Customer" />
                  <Picker.Item label="Business development" value="Business development" />
                  <Picker.Item label="Visa" value="Visa" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
          </View>

            <TextInput
              name="destinationAdres"
              onChangeText={(text) => this.handleDestinationAdressChange(text)} defaultValue={this.state.text}
              style={styles.textareaContainer}
              placeholder="Destination adress"
              placeholderTextColor="black"
              defaultValue={this.state.destinationAdress}
            />

            <ActionButton
              buttonColor="transparent"
              btnOutRange="transparent"
              icon={<Icon name='md-arrow-dropup' style={styles.ButtonIcon} />}
              degrees={180}
              size={40}
              radius={50}
            // outRangeScale={0.5}       
            >

              <ActionButton.Item
                buttonColor='green'
                title="Save"
                onPress={() => this.handleCreateTravel()}>
                <Icon
                  name="md-done-all"
                  style={styles.actionButtonIcon}

                />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor='red'
                title="Reset"
                onPress={() => this.resetAll()}  >
                <Icon
                  name="md-refresh"
                  style={styles.actionButtonIcon} />
              </ActionButton.Item>

            </ActionButton>


            {/* <View style={{ flexDirection: 'row', position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                        <Button light
                            style={{ width: 150, marginRight: 20, width: 140, backgroundColor: '#2C9562' }}
                            onPress={() => this.handleCreateTravel()}                                >
                            <Text style={{ color: 'white', left: 35 }}>Save</Text>
                        </Button>
                        <Button light style={{ width: 150, width: 140, backgroundColor: '#D15433', }}
                            onPress={() => this.resetAll()} >
                            <Text style={{ color: 'white', left: 30 }} >Reset</Text>
                        </Button>
                    </View> */}

          </View>
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  cardStyle: {
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 340,
    backgroundColor: '#ECECEC',
    borderColor: '#ECECEC',
    borderRadius: 50
  },
  list: {
    borderWidth: 1,
    width: 300,
    alignSelf: 'center',
    marginTop: -25,
    borderRadius: 20,
    zIndex: 4,
    backgroundColor: '#1C1C1C'
  },



  textStyle: {
    color: 'white',
    marginTop: 10,
    width: 300,
    paddingLeft: 10,
    top: 10,
    left: 180,
    zIndex: 2000,
    opacity: 0.3
  },
  textareaContainer: {
    borderWidth: 1,
    width: 300,
    height: 50,
    borderColor: '#DADADA',
    backgroundColor: '#DADADA',
    alignSelf: 'center',
    paddingLeft: 10,
    marginBottom: 120,
    borderWidth: 1,
    borderRadius: 20,
    fontSize:16

  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  ButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#4470B2',
  },

  autorisationList: {
    borderWidth: 1,
    width: 300,
    marginBottom: -20,
    alignSelf: 'center',
    zIndex: 5,
    borderRadius: 20
  },

});

const mapStateToProps = state => {
  return {
    sendingRequest: state.requestsReducer.sendingRequest,
    theme: state.settingsReducer.theme,
    user: state.authReducer.user,
    users: state.usersReducer.users,
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers(filter) { dispatch(getUsers(filter)) },
  createTravelRequest(payload) { dispatch(createTravelRequest(payload)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(createTravel);
