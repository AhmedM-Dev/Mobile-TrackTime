import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform , ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Icon, Content, View,  } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import StyledInput from '../../ui/Input/addEventInput';

import DatePicker from 'react-native-datepicker';

class Add extends Component {
  constructor() {
    super();
    this.state = {
      periodName :'',
      dateFrom: null,
      dateTo: null,
      maxWorkingHours: '' ,
      allawedDelay : '', 
      maxDelayTime : ''
    }
  };

  handleDateChange = (type, value) => {
    this.setState({
      ...this.state,
      dateFrom: type === "dateFrom" ? value : this.state.dateFrom,
      dateTo: type === "dateTo" ? value : this.state.dateTo,
    })
  }
  
  handleMaxWorkingHoursChange = (maxWorkingHours) => {
    this.setState({
      maxWorkingHours
    });
  }

  handlePeriodNameChange = (periodName) => {
    this.setState({
      periodName
    });
  }

  handleallawedDelayChange = (allawedDelay) => {
    this.setState({
      allawedDelay
    });
  }

  handleMaxDelayTimeChange = (maxDelayTime) => {
    this.setState({
      maxDelayTime
    });
  }

  handleMaxDelayTimeChange = (maxDelayTime) => {
    this.setState({
      maxDelayTime
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <Content>
      <Icon
          name="md-arrow-round-back"
          style={{
            color: '#DA7373',
            margin:30,
            fontSize: 18,
            left:20
          }}
          onPress={() => this.props.navigation.navigate('Administration')} />

            <View style={{marginBottom:80}}>


            <StyledInput text={'Period name'} textColor={'white'} onChange={this.handlePeriodNameChange} />

            
            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 5, color: 'white', marginTop: 5 }}
              date={this.state.dateFrom}
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
                  backgroundColor: '#072152',
                  borderColor: 'gray',
                  borderRadius: 20

                },
                placeholderText: {
                  color: 'white', position:'absolute', left:55
                },
                dateText: {
                  color: 'white',position:'absolute', left:55
                }
              }}
              onDateChange={(dateF) => { this.handleDateChange("dateFrom", dateF) }} />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 30 }}
              date={this.state.dateTo}
              placeholder="To ... "
              mode="datetime"
              format="DD-MM-YYYY, HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              iconSource={null}

              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  borderRadius: 20

                },
                dateInput: {
                  marginTop: 10,
                  backgroundColor: '#072152',
                  borderColor: 'gray',
                  borderRadius: 20

                },
                placeholderText: {
                  color: 'white',position:'absolute', left:55
                },
                dateText: {
                  color: 'white',position:'absolute', left:55
                }
              }}
              onDateChange={(dateT) => { this.handleDateChange("dateTo", dateT) }}
            />

<StyledInput text={'Max working hours'} textColor={'white'} onChange={this.handleMaxWorkingHoursChange} />
<StyledInput text={'Allawed delay'} textColor={'white'} onChange={this.handleallawedDelayChange} />
<StyledInput text={'Max delay time '} textColor={'white'} onChange={this.handleMaxDelayTimeChange} />

            </View>



        

          <ActionButton
            buttonColor="#9C9C9C"
            btnOutRange="#C8593C"
            icon={<Icon name='md-arrow-dropup' style={styles.actionButtonIcon} />}
            degrees={180}
            size={40}
            radius={50}
            outRangeScale={0.5}
          >

            <ActionButton.Item
              buttonColor='#A9A91C'
              title="Reset"
              onPress={() => alert('refresh')} >
              <Icon
                name="md-refresh"
                style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#006B4C'
              title="Save"
              // onPress={this.handleDeleteUser}
              >
              <Icon
                name="md-done-all"
                style={styles.actionButtonIcon}

              />
            </ActionButton.Item>
          </ActionButton>
        </Content>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1D0D0',
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',

  },

});

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = dispatch => ({
 
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);