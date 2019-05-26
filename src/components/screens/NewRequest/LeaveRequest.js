
import React from 'react';
import {
  StatusBar, StyleSheet, AsyncStorage, TextInput
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
import axios from "axios";
import { API_URL } from "../../../../config";
import ActionButton from 'react-native-circular-action-menu';

export default class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      PickerValue: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      category: "Paid leave",
      motif: '',
      languageSelected: 'English'
    }
  };

  resetAll = () => {
    this.setState({
      PickerValue: '',
      startdate: null,
      starttime: null,
      enddate: null,
      endtime: null,
      category: "Paid leave",
      motif: ''
    });
  }

  handleCreateRequest = () => {
    axios.post(API_URL + "requests", {
      userId: this.state.connectedUser.userId,
      ...this.state
    })
      .then((response) => {
        console.log(response.data);
      }).done();
  }

  handleCategoryChange = (category) => {
    this.setState({
      ...this.state,
      category: category
    });
  }

  handleDateChange = (type, value) => {
    this.setState({
      ...this.state,
      startDate: type === "startdate" ? value : this.state.startDate,
      startTime: type === "starttime" ? value : this.state.startTime,
      endDate: type === "enddate" ? value : this.state.endDate,
      endTime: type === "endtime" ? value : this.state.endTime
    })
  }

  handleMotifChange = (text) => {
    this.setState({
      ...this.state,
      motif: text
    });
  }

  componentWillMount() {
    AsyncStorage.getItem("user").then(user => {

      this.setState({
        connectedUser: JSON.parse(user)
      });
    })
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }} >
        <StatusBar hidden />
        <Content>
          <Card style={styles.cardStyle}>
            <View >
              <Text style={styles.textStyle} >
                Category  *
                                 </Text>
              <View style={styles.autorisationList}>
                <Picker
                  selectedValue={this.state.category}
                  style={{ width: 300, color: 'white', alignSelf: 'center', zIndex: 4, backgroundColor: 'transparent' }}
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
                style={{ width: 300, alignSelf: 'center', marginBottom: 5, marginTop: 20, color: 'white' }}
                date={this.state.startDate}
                mode="date"
                iconSource={null}
                placeholder="Select begin date   *"

                format="DD-MM-YYYY"
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
              <DatePicker
                style={{ width: 300, alignSelf: 'center', marginBottom: 5 }}
                date={this.state.startTime}
                placeholder="Select begin time   *"
                iconSource={null}
                mode="time"
                format="HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                minuteInterval={10}
                headerBackground="red"
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
                onDateChange={(time) => { this.handleDateChange("starttime", time) }}
              />
            </View>
            <View>

              <DatePicker
                style={{ width: 300, alignSelf: 'center', marginBottom: 5 }}
                date={this.state.endDate}
                mode="date"
                iconSource={null}
                placeholder={"Select end date   *"}
                format="DD-MM-YYYY"
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
              <DatePicker
                style={{ width: 300, alignSelf: 'center', marginBottom: 20 }}
                date={this.state.endTime}
                placeholder="Select end time   *"
                mode="time"
                format="HH:mm"
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
                onDateChange={(time) => { this.handleDateChange("endtime", time) }} />
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

const styles = StyleSheet.create({


  cardStyle: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 340,
    backgroundColor: '#ECECEC',
    borderColor: '#ECECEC',
    borderRadius: 20,
    marginTop: 40
  },

  autorisationList: {
    borderWidth: 1,
    width: 300,
    marginBottom: -20,
    borderColor: '#1C1C1C',
    backgroundColor: '#1C1C1C',
    alignSelf: 'center',
    zIndex: 5,
    borderRadius: 20
  },
  textStyle: {
    color: 'white',
    marginTop: 10,
    width: 300,
    paddingLeft: 10,
    top: 35,
    left: 180,
    zIndex: 2000,
    opacity: 0.3
  },
  textareaContainer: {
    borderWidth: 1,
    width: 300,
    height: 80,
    position: 'relative',
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: '#1C1C1C',
    borderColor: '#1C1C1C',
    alignSelf: 'center',
    color: 'white',
    borderRadius: 20,
    marginBottom: 100
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  ButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#2CA96E',
  },

});