import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { Icon, Content, View, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import StyledInput from '../../ui/Input/addEventInput';

import DatePicker from 'react-native-datepicker';

class Add extends Component {
  constructor() {
    super();
    this.state = {
      selectedPeriod: '',
    }
  };

  handleSelectPeriod = (period) => {
    this.setState({
      selectedPeriod: period,
    });
  }

  handleDateFromChange = (dateFrom) => {
    this.setState({
      selectedPeriod: {
        ...this.state.selectedPeriod,
        dateFrom
      }
    });
  }

  handleDateToChange = (dateTo) => {
    this.setState({
      selectedPeriod: {
        ...this.state.selectedPeriod,
        dateTo
      }
    });
  }
  handleMaxWorkingHoursChange = (maxWorkingHours) => {
    this.setState({
      selectedPeriod: {
        ...this.state.selectedPeriod,
        maxWorkingHours
      }
    });
  }

  handlePeriodNameChange = (periodName) => {
    this.setState({
      selectedPeriod: {
        ...this.state.selectedPeriod,
        periodName
      }
    });
  }

  handleallawedDelayChange = (allawedDelay) => {
    his.setState({
      selectedPeriod: {
        ...this.state.selectedPeriod,
        allawedDelay
      }
    });
  }

  handlePeriodNameChange = (periodName) => {
    his.setState({
      selectedPeriod: {
        ...this.state.selectedPeriod,
        periodName
      }
    });
  }

  handleMaxDelayTimeChange = (maxDelayTime) => {
    his.setState({
      selectedPeriod: {
        ...this.state.selectedPeriod,
        maxDelayTime
      }
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
              margin: 30,
              fontSize: 18,
              left: 20
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />

          <View style={{ marginBottom: 80 }}>


            <View style={{
              backgroundColor: '#9C9C9C',
              marginBottom: 20,
              flexDirection: 'row',
              borderColor: '#9C9C9C',
              borderWidth: 1,
              borderRadius: 20,
              alignSelf: 'center',
              height: 45, width: 300,

              paddingLeft: 10
            }}>
              <Picker
                 selectedValue={this.state.selectedPeriod || ''}
                   style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  color: 'white',

                }}
                name="periodName"
              onValueChange={this.handleSelectPeriod}
              >
                {/* {this.props.groups && this.props.groups.length > 0 && this.props.groups.map(group => <Picker.Item label={`${group.name}`} value={group} color="#021630" />)} */}
              </Picker>
            </View>
            <StyledInput text={this.state.selectedPeriod && this.state.selectedPeriod.periodName} textColor={'white'} onChange={this.handlePeriodNameChange} value={this.state.selectedPeriod && this.state.selectedPeriod.periodName} />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 5, color: 'white', marginTop: 5 }}
              date={this.state.selectedPeriod && this.state.selectedPeriod.dateFrom}
              placeholder={this.state.selectedPeriod && this.state.selectedPeriod.dateFrom}            
                mode="datetime"
              iconSource={null}
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
                  color: 'white', position: 'absolute', left: 35
                },
                dateText: {
                  color: 'white', position: 'absolute', left: 35
                }
              }}
              onDateChange= { this.handleDateFromChange } />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 30 }}
              date={this.state.selectedPeriod && this.state.selectedPeriod.dateTo}
              placeholder={this.state.selectedPeriod && this.state.selectedPeriod.dateTo}
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
                  color: 'white', position: 'absolute', left: 35
                },
                dateText: {
                  color: 'white', position: 'absolute', left: 35
                }
              }}
              onDateChange= { this.handleDateToChange } />
            

            <StyledInput text={this.state.selectedPeriod && this.state.selectedPeriod.maxWorkingHours} textColor={'white'} onChange={this.handleMaxWorkingHoursChange} value={this.state.selectedPeriod && this.state.selectedPeriod.maxWorkingHours}/>
            <StyledInput text={this.state.selectedPeriod && this.state.selectedPeriod.allawedDelay} textColor={'white'} onChange={this.handleallawedDelayChange} value={this.state.selectedPeriod && this.state.selectedPeriod.allawedDelay}/>
            <StyledInput text={this.state.selectedPeriod && this.state.selectedPeriod.maxDelayTime} textColor={'white'} onChange={this.handleMaxDelayTimeChange} value={this.state.selectedPeriod && this.state.selectedPeriod.maxDelayTime} />

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