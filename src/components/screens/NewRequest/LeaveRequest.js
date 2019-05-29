
import React from 'react';
import {
  StatusBar, TextInput, ActivityIndicator, Alert
} from 'react-native';
import {
  Container,
  Content,
  Card,
  Text,
  View,
  Picker,
  Icon,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import ActionButton from 'react-native-circular-action-menu';

import { createLeaveRequest } from '../../../store/actions';

import styles from './styles';

const initialState = {
  PickerValue: '',
  dateFrom: null,
  dateTo: null,
  leaveCategory: "Paid leave",
  requestCategory: 'LEAVE',
  motif: '',
  languageSelected: 'English',
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

  // componentDidUpdate() {
  //   if (!this.props.sendingRequest && this.props.requestSuccess) {
  //     this.setState(initialState);
  //     alert("Request created successfully.");
  //   }
  // }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    if (!this.props.sendingRequest && this.props.requestSuccess) {
      Alert.alert(
        'Info',
        'Your request has been successfully created.',
        [
          { text: 'OK', onPress: () => this.setState(initialState) },
        ],
        { cancelable: false },
      );
    }
    return (
      <Container style={{ backgroundColor: 'white' }} >
        {this.props.sendingRequest && !this.props.requestSuccess &&
          <View style={styles.loading}>
            <ActivityIndicator size={80} color="#F2F2F2" />
          </View>
        }
        <StatusBar hidden />
        <Content>
          <Card style={styles.cardStyle}>
            <View >
              <Text style={styles.textStyle} >
                Category  *
              </Text>
              <View style={styles.autorisationList}>
                <Picker
                  placeholder="Select leave category"
                  selectedValue={this.state.leaveCategory}
                  // style={{ width: 300, alignSelf: 'center', zIndex: 4 }}
                  textStyle={{ color: "white" }}
                  itemTextStyle={{ color: 'white' }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.handleCategoryChange(itemValue)
                  }>
                  <Picker.Item label="Paid leave" value="Paid leave" />
                  <Picker.Item label="Additional days" value="Additional days" />
                  <Picker.Item label="Unpaid leave" value="Unpaid leave" />
                  <Picker.Item label="Sick leave" value="Sick leave" />
                  <Picker.Item label="Paternity leave" value="Paternity leave" />
                  <Picker.Item label="Maternity leave" value="Maternity leave" />
                  <Picker.Item label="Wedding leave" value="Wedding leave" />
                  <Picker.Item label="Son's circumcision " value="Son's circumcision " />
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
                placeholder="Select begin date   *"

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
                    backgroundColor: '#1C1C1C',
                    borderColor: '#1C1C1C',
                    borderWidth: 1,
                    borderRadius: 20
                  },
                  placeholderText: {
                    color: 'white'
                  },
                  dateText: {
                    color: 'white'
                  }
                }}
                onDateChange={(date) => { this.handleDateChange("startdate", date) }} />
            </View>
            <View>

              <DatePicker
                style={{ width: 300, alignSelf: 'center', marginBottom: 5 }}
                date={this.state.dateTo}
                mode="datetime"
                iconSource={null}
                placeholder={"Select end date   *"}
                format="DD-MM-YYYY, HH:mm"
                minDate="01-01-2019"
                maxDate="31-12-2019"
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
                    backgroundColor: '#1C1C1C',
                    borderColor: '#1C1C1C',
                    borderWidth: 1,
                    borderRadius: 20
                  },
                  placeholderText: {
                    color: 'white'
                  },
                  dateText: {
                    color: 'white',
                  }
                }}
                onDateChange={(date) => { this.handleDateChange("enddate", date) }}
              />
            </View>
            <TextInput
              name="destinationAdres"
              onChangeText={(text) => this.handleMotifChange(text)}
              style={styles.textareaContainer}
              placeholder="Motif..."
              placeholderTextColor="white"
              defaultValue={this.state.motif}
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
          </Card>
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
