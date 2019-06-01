
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
  Radio
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
  sessionFrom: 1,
  dateTo: null,
  sessionTo: 2,
  leaveCategory: 'Authorization',
  requestCategory: 'AUTHORIZATION',
  motif: ''
}

class LeaveRequest extends React.Component {

  state = initialState;

  resetAll = () => {
    this.setState(initialState);
  }

  handleCreateRequest = () => {
    if (this.state.requestCategory === 'LEAVE') {
      const { timeFrom, timeTo, ...request } = this.state;
      this.props.createLeaveRequest(request);
    } else if (this.state.requestCategory === 'AUTHORIZATION') {
      const { sessionFrom, sessionTo, dateFrom, dateTo, ...request } = this.state;

      console.log('fff', request);

      this.props.createLeaveRequest({
        ...request,
        date: dateFrom
      });
    }
  }

  handleCategoryChange = (category) => {
    if (category === 'Authorization') {
      this.setState({
        ...this.state,
        leaveCategory: category,
        requestCategory: 'AUTHORIZATION'
      });
    } else {
      this.setState({
        ...this.state,
        leaveCategory: category,
        requestCategory: 'LEAVE'
      });
    }
  }

  handleDateChange = (type, value) => {
    this.setState({
      ...this.state,
      dateFrom: type === "startdate" ? value : this.state.dateFrom,
      dateTo: type === "enddate" ? value : this.state.dateTo,
      timeFrom: type === "timeFrom" ? value : this.state.timeFrom,
      timeTo: type === "timeTo" ? value : this.state.timeTo
    });
  }

  handleMotifChange = (text) => {
    this.setState({
      ...this.state,
      motif: text
    });
  }

  handleRadioChange = (value) => {
    console.log('ffff', value);
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

          <View style={{ marginTop: 20,  width:340  , borderRadius:20 ,alignItems:'center' , alignSelf:'center' , backgroundColor:this.props.theme.backgroundColor}}>
            <View style={{
              ...styles.autorisationList,
              backgroundColor: this.props.theme.pickerBackground,
              borderColor: this.props.theme.pickerBackground, marginTop:20
            }}> 
              <Picker
                selectedValue={this.state.leaveCategory}
                style={{
                  color: 'black',
                }}
                textStyle={{ color: 'black' }}
                itemTextStyle={{ color: 'black' ,}}
                onValueChange={(itemValue, itemIndex) =>
                  this.handleCategoryChange(itemValue)
                }
              >
                <Picker.Item label="Authorization" value="Authorization" />
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


            <View>

              <DatePicker
                style={{ width: 300, alignSelf: 'center', marginBottom: 5, marginTop: 20 }}
                date={this.state.dateFrom}
                mode="date"
                iconSource={null}
                placeholder={this.state.requestCategory === 'AUTHORIZATION' ? 'Date' : 'From...'}

                format="DD-MM-YYYY"
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
                    color: 'black',
                    left: -100 , position:'absolute' , left:20
                  },
                  dateText: {
                    color: 'black',
                    left: -67, position:'absolute' , left:20

                  }
                }}
                onDateChange={(date) => { this.handleDateChange("startdate", date) }} />
            </View>

            {this.state.requestCategory !== 'AUTHORIZATION' && <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#4470B2', width: 300, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', borderRadius: 20, height: 40, alignItems: 'center' }}>
              <Text style={{ color: 'white' }} >Morning</Text><Radio onPress={() => this.setState({ sessionFrom: 1 })} selected={this.state.sessionFrom === 1} selectedColor={"white"} />
              <Text style={{ color: 'white' }} >Afternoon</Text><Radio onPress={() => this.setState({ sessionFrom: 2 })} selected={this.state.sessionFrom === 2} selectedColor={"white"} />
            </View>
            }

            {this.state.requestCategory !== 'AUTHORIZATION' && <View>

              <DatePicker
                style={{ width: 300, alignSelf: 'center', marginBottom: 10 }}
                date={this.state.dateTo}
                mode="date"
                iconSource={null}
                placeholder={"To ... "}
                format="DD-MM-YYYY"
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
                    color: 'black',
                    left: -110, position:'absolute' , left:20
                  },
                  dateText: {
                    color: 'black',
                    left: -67, position:'absolute' , left:20

                  }
                }}
                onDateChange={(date) => { this.handleDateChange("enddate", date) }}
              />
            </View>}

            {/* AUTHORIZATION MODE */}
            {this.state.requestCategory === 'AUTHORIZATION' &&
              <>
                <View>
                  <DatePicker
                    style={{ width: 300, alignSelf: 'center', marginBottom: 10 }}
                    date={this.state.timeFrom}
                    mode="time"
                    iconSource={null}
                    placeholder={"From..."}
                    format="H:mm"
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
                        color: 'black',
                        left: -110, position:'absolute' , left:20
                      },
                      dateText: {
                        color: 'black',
                        left: -67 , position:'absolute' , left:20

                      }
                    }}
                    onDateChange={(date) => { this.handleDateChange("timeFrom", date) }}
                  />
                </View>

                <View>
                  <DatePicker
                    style={{ width: 300, alignSelf: 'center', marginBottom: 10 }}
                    date={this.state.timeTo}
                    mode="time"
                    iconSource={null}
                    placeholder={"To..."}
                    format="H:mm"
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
                        color: 'black',
                        left: -110, position:'absolute' , left:20
                      },
                      dateText: {
                        color: 'black',
                        left: -67, position:'absolute' , left:20

                      }
                    }}
                    onDateChange={(date) => { this.handleDateChange("timeTo", date) }}
                  />
                </View>

              </>}

            {this.state.requestCategory !== 'AUTHORIZATION' && <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#4470B2', width: 300, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', borderRadius: 20, height: 40, alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Morning</Text><Radio onPress={() => this.setState({ sessionTo: 1 })} selected={this.state.sessionTo === 1} selectedColor={"white"} />
              <Text style={{ color: 'white' }}>Afternoon</Text><Radio onPress={() => this.setState({ sessionTo: 2 })} selected={this.state.sessionTo === 2} selectedColor={"white"} />
            </View>}

            <View style={{ marginBottom: 20 }}>
              <Textarea
                containerStyle={{ ...styles.textareaContainer, backgroundColor: this.props.theme.pickerBackground }}
                style={{ ...styles.textarea, color: 'black' }}
                onChangeText={(text) => this.handleMotifChange(text)}
                defaultValue={this.state.motif}
                placeholder={' Motif...'}
                placeholderTextColor={'black'}
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
          </View>
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
