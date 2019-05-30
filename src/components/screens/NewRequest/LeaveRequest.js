
import React from 'react';
import {
  StatusBar, TextInput, ActivityIndicator, Alert
} from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Picker,
  Icon,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import ActionButton from 'react-native-circular-action-menu';
import Textarea from 'react-native-textarea';
import moment from 'moment';

import { createLeaveRequest } from '../../../store/actions';

import styles from './styles';

const initialState = {
  dateFrom: null,
  dateTo: null,
  leaveCategory: "Paid leave",
  requestCategory: 'LEAVE',
  motif: ''
}

class LeaveRequest extends React.Component {

  state = initialState;

  resetAll = () => {
    this.setState(initialState);
  }

  handleCreateRequest = () => {
    this.props.createLeaveRequest(this.state);
  }

  handleCategoryChange = (category) => {
    this.setState({
      ...this.state,
      leaveCategory: category
    });
  }

  handleDateChange = (type, value) => {
    this.setState({
      ...this.state,
      dateFrom: type === "startdate" ? value : this.state.dateFrom,
      dateTo: type === "enddate" ? value : this.state.dateTo,
    })
  }

  handleMotifChange = (text) => {
    this.setState({
      ...this.state,
      motif: text
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <Container style={{ backgroundColor: this.props.theme.backgroundColor }} >
        {this.props.sendingRequest && !this.props.requestSuccess &&
          <View style={styles.loading}>
            <ActivityIndicator size={80} color="#F2F2F2" />
          </View>
        }
        <StatusBar hidden />
        <Content>

          <View style={{ marginTop: 50 }}>
            <View style={{
              ...styles.autorisationList,
              backgroundColor: this.props.theme.pickerBackground,
              borderColor: this.props.theme.pickerBackground
            }}>
              <Picker
                // placeholder="Select leave category"
                selectedValue={this.state.leaveCategory}
                style={{
                  color: this.props.theme.fontColor,
                }}

                // style={{ width: 300, alignSelf: 'center', zIndex: 4 }}
                textStyle={{ color: this.props.theme.fontColor }}
                itemTextStyle={{ color: this.props.theme.fontColor }}
                onValueChange={(itemValue, itemIndex) =>
                  this.handleCategoryChange(itemValue)
                }
              >
                <Picker.Item label="Paid leave" value="Paid leave" />
                <Picker.Item label="Additional days" value="Additional days" />
                <Picker.Item label="Unpaid leave" value="Unpaid leave" />
                <Picker.Item label="Sick leave" value="Sick leave" />
                <Picker.Item label="Paternity leave" value="Paternity leave" />
                <Picker.Item label="Maternity leave" value="Maternity leave" />
                <Picker.Item label="Wedding leave" value="Wedding leave" />
                <Picker.Item label="Son's circumcision" value="Son's circumcision" />
                <Picker.Item label="Son's/Daughter's wedding" value="Son's/Daughter's wedding" />
                <Picker.Item label="Spouse's death" value="Spouse's death" />
                <Picker.Item label="Mother's/Father's death" value="Mother's/Father's death" />
                <Picker.Item label="Son's/Daughter's death" value="Son's/Daughter's death" />
                <Picker.Item label="Brother's/Sister's death" value="Brother's/Sister's death" />
                <Picker.Item label="Grandfather's/Grandmother's death" value="Grandfather's/Grandmother's death" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>

          <View>

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 5, marginTop: 20 }}
              date={this.state.dateFrom}
              mode="datetime"
              iconSource={null}
              placeholder="From ... "

              format="DD-MM-YYYY, HH:mm"
              minDate={moment().format('DD-MM-YYYY')}
              // maxDate="31-12-2019"
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
                  borderRadius: 20
                },
                placeholderText: {
                  color: this.props.theme.fontColor,
                  left: -100
                },
                dateText: {
                  color: this.props.theme.fontColor,
                  left: -67

                }
              }}
              onDateChange={(date) => { this.handleDateChange("startdate", date) }} />
          </View>
          <View>

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 10 }}
              date={this.state.dateTo}
              mode="datetime"
              iconSource={null}
              placeholder={"To ... "}
              format="DD-MM-YYYY, HH:mm"
              minDate={moment().format('DD-MM-YYYY')}
              // maxDate="31-12-2019"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
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
                  borderRadius: 20
                },
                placeholderText: {
                  color: this.props.theme.fontColor,
                  left: -110
                },
                dateText: {
                  color: this.props.theme.fontColor,
                  left: -67

                }
              }}
              onDateChange={(date) => { this.handleDateChange("enddate", date) }}
            />
          </View>

          <View style={{ marginBottom: 50 }}>
            <Textarea
              containerStyle={{ ...styles.textareaContainer, backgroundColor: this.props.theme.pickerBackground }}
              style={{ ...styles.textarea, color: this.props.theme.fontColor }}
              onChangeText={(text) => this.handleMotifChange(text)}
              defaultValue={this.state.motif}
              placeholder={' Motif...'}
              placeholderTextColor={this.props.theme.fontColor}
              underlineColorAndroid={'transparent'}
            // maxLength={300}
            />
          </View>

          {/* <TextInput
              onChangeText={(text) => this.handleMotifChange(text)}
              style={styles.textareaContainer}
              placeholder="Motif..."
              placeholderTextColor="white"
              defaultValue={this.state.motif}
            /> */}

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
              onPress={() => this.handleCreateRequest()}>
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
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    sendingRequest: state.requestsReducer.sendingRequest,
    requestSuccess: state.requestsReducer.requestSuccess,
    theme: state.settingsReducer.theme
  }
}

const mapDispatchToProps = dispatch => ({
  createLeaveRequest(request) { dispatch(createLeaveRequest(request)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRequest);
