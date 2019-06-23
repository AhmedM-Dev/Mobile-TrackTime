import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Content, View, } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import StyledInput from '../../ui/Input/addEventInput';

import { setHoursPlan } from './actions';

const initialState = {
  periodName: '',
  dateFrom: null,
  dateTo: null,
  requiredWorkingHours: null,
  allowedDelaysPerMonth: null,
  beginTime: '',
  beginTimeMax: '',
}

class Add extends Component {
  state = initialState;

  handleDateChange = (type, value) => {
    this.setState({
      ...this.state,
      dateFrom: type === "dateFrom" ? value : this.state.dateFrom,
      dateTo: type === "dateTo" ? value : this.state.dateTo,
    })
  }

  handleRequiredWorkingHoursChange = (requiredWorkingHours) => {
    this.setState({ requiredWorkingHours });
  }

  handlePeriodNameChange = (periodName) => {
    this.setState({ periodName });
  }

  handleAllowedDelaysPerMonthChange = (allowedDelaysPerMonth) => {
    this.setState({ allowedDelaysPerMonth });
  }

  handleBeginTimeChange = (type, time) => {
    this.setState({ [type]: time });
  }

  handleSubmitPlan = () => {
    const { allowedDelaysPerMonth, beginTime, beginTimeMax, dateFrom, dateTo, periodName, requiredWorkingHours } = this.state;

    if (dateFrom && dateTo && periodName.length > 0 && requiredWorkingHours && allowedDelaysPerMonth && moment(beginTime).format() && moment(beginTimeMax).format()) {
      this.props.setHoursPlan({ ...this.state });
      this.handleClear();
    } else {
      Alert.alert(
        'Hours Plan',
        'All fields are required.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }
  }

  handleClear = () => {
    this.setState(initialState);
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


            <StyledInput text={'Period name'} value={this.state.periodName} textColor={'white'} onChange={this.handlePeriodNameChange} />


            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 5, color: 'white', marginTop: 5 }}
              date={this.state.dateFrom}
              mode="date"
              iconSource={null}
              placeholder="From date... "

              format="YYYY-MM-DD"
              minDate="01-01-2019"
              maxDate="31-12-2019"
              customStyles={{ ...datePicker }}
              onDateChange={(dateF) => { this.handleDateChange("dateFrom", dateF) }} />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 30 }}
              date={this.state.dateTo}
              placeholder="To date... "
              mode="date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              iconSource={null}

              customStyles={{ ...datePicker }}
              onDateChange={(dateT) => { this.handleDateChange("dateTo", dateT) }}
            />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 5 }}
              date={this.state.beginTime}
              placeholder="Begin work time at..."
              mode="time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              iconSource={null}

              customStyles={{ ...datePicker }}
              onDateChange={(beginTime) => { this.handleBeginTimeChange("beginTime", beginTime) }}
            />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 30 }}
              date={this.state.beginTimeMax}
              placeholder="Begin work time max at..."
              mode="time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              iconSource={null}

              customStyles={{ ...datePicker }}
              onDateChange={(beginTimeMax) => { this.handleBeginTimeChange("beginTimeMax", beginTimeMax) }}
            />

            <StyledInput value={this.state.requiredWorkingHours} text={'Required working hours'} keyboardType="number-pad" textColor={'white'} onChange={this.handleRequiredWorkingHoursChange} />
            <StyledInput value={this.state.allowedDelaysPerMonth} text={'Allowed delays per month'} keyboardType="number-pad" textColor={'white'} onChange={this.handleAllowedDelaysPerMonthChange} />
            {/* <StyledInput value={this.state.maxDelayTime} text={'Max delay allowed time'} textColor={'white'} onChange={this.handleMaxDelayTimeChange} /> */}

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
              onPress={this.handleClear} >
              <Icon name="md-refresh" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#006B4C'
              title="Save"
              onPress={this.handleSubmitPlan}
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

const datePicker = {
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
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
  setHoursPlan(payload) { dispatch(setHoursPlan(payload)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
