import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import { Icon, Container, Content, View, Text, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { toString } from 'lodash';

import AdminPickers from '../../../components/ui/AdminPickers/AdminPickers'
import StyledInput from '../../ui/Input/addEventInput';

import { addHoliday } from './actions';

const initialState = {
  holidayCategory: 'holidays',
  title: '',
  days: '',
  date: new Date()
}

class add extends Component {
  state = initialState;

  handleHolidayCategory = (text) => {
    this.setState({
      holidayCategory: text
    });
  }

  handleTitle = (text) => {
    this.setState({
      title: text
    });
  }

  handleDays = (num) => {
    if (toString(parseInt(num)) !== 'NaN' || num === '') {
      this.setState({
        days: num === '' ? '' : toString(parseInt(num))
      });
    }
  }

  handleDate = (text) => {
    this.setState({
      date: text
    });
  }

  handleAddHoliday = () => {

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

          <View >
            <AdminPickers height={45} width={300} paddingLeft={20} marginTop={40}>
              <Picker
                selectedValue={this.state.holidayCategory || ''}
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  color: 'white',
                }}
                onValueChange={(itemValue) => this.handleHolidayCategory(itemValue)}>
                <Picker.Item label="Holidays" value="holidays" color="#021630" />
                <Picker.Item label="Celebrations" value="celebrations" color="#021630" />
              </Picker>
            </AdminPickers>
          </View>

          <View style={{ marginBottom: 80, marginTop: 10, alignItems: 'center' }}>
            <StyledInput text={'Name'} value={this.state.title} textColor={'white'} keyboardType="email-address" onChange={this.handleTitle} />
            <StyledInput text={'Days number'} value={this.state.days} textColor={'white'} keyboardType="number-pad" onChange={this.handleDays} />
            {/* <StyledInput text={'Date'} textColor={'white'} keyboardType="email-address" onChange={this.handleDate} /> */}
            {this.state.holidayCategory === 'holidays' && <DatePicker
              style={{ width: 300 }}
              date={this.state.date || ''}
              mode="date"
              placeholder="Select holiday date"
              format="MMMM DD"
              iconSource={null}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  backgroundColor: '#072152',
                  borderColor: 'gray',
                  borderRadius: 20,
                  height: 45,
                },
                placeholderText: {
                  color: this.props.theme.fontColor
                },
                dateText: {
                  color: 'white',
                  alignSelf: 'flex-start',
                  paddingLeft: 30
                }
              }}

              onDateChange={this.handleDate}
            />}
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
              buttonColor='#C9CF57'
              title="Reset"
              onPress={() => this.setState(initialState)} >
              <Icon
                name="md-refresh"
                style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#006B4C'
              title="Save"
              onPress={this.handleAddHoliday}>
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

  instructions2: {
    color: 'white',
    marginBottom: 15,
    fontSize: 16
  },
  inputPos: {
    top: 150,
    marginBottom: 250
  },
});


const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    theme: state.settingsReducer.theme,
  }
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(add);
