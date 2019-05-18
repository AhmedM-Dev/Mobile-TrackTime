import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import axios from "axios";
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import { API_URL } from "../../../../config";
import titleIcon from '../../../assets/img/titleIcon.png';
import Background from '../../../assets/img/backgroundM.jpg';
import StyledInput from '../../ui/Input/addEventInput';
import DatePicker from 'react-native-datepicker';
import motifIcon from '../../../assets/img/detailsIcon.png'
import priceIcon from '../../../assets/img/priceIcon.png'
import { Button } from 'react-native-elements';

import events from '../../../assets/img/events.jpg'

import { createEvent } from './actions';

const options = {
  title: '',
  takePhotoButtonTitle: 'Take photo',
  chooseFromLibraryButtonTitle: 'Choose from library',
};


class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      logo: null,
      photo: null,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      photoFileName: null
    }
  }
  selectPhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {

      console.log("RESPONSE IMAGE", response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };
        this.setState({
          photo: response.data,
          photoFileName: response.fileName
        });
      }
    });
  }

  uploadPic = () => {
    console.log("PIC", this.state.pic);
    // RNFetchBlob.fetch('POST', 'https://unentertaining-sect.000webhostapp.com/war/upload.php', {
    //   Authorization: "Bearer access-token",
    //   otherHeader: "foo",
    //   'Content-Type': 'multipart/form-data',
    // }, [
    //     { name: 'image', filename: 'avatar.png', data: this.state.pic }
    //   ]).then((resp) => {
    //     console.log('your image uploaded successfully');
    //     this.setState({ avatarSource: null })
    //   })
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

  handleCreateEvent = () => {
    this.props.createEvent(this.state);
  }

  handleTitleChange = (title) => {
    this.setState({
      title
    });
  }

  handleDetailsChange = (details) => {
    this.setState({
      details
    });
  }

  handleDateChange = (dateID, date) => {
    this.setState({
      [dateID]: date
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <Content>
          <Icon
            name="md-keypad"
            style={{
              color: 'black',
              margin: 15,
              top: 10
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />
          <View style={{ marginTop: 10 }}>
            <Button
              icon={
                <Icon
                  name="md-log-out"
                  style={{ color: 'white', marginRight: 10, fontSize: 18, left: -81 }}
                />
              }
              buttonStyle={{
                backgroundColor: 'black',
                borderRadius: 20,
                borderColor: 'white',
                borderWidth: 2,
                width: 300,
                alignSelf: 'center',
                marginBottom: 5
              }}
              titleStyle={{
                color: 'white'
              }}
              title={this.state.photoFileName || "Event image"}
              onPress={this.selectPhoto}
            />
            <Icon name="md-download"
              onPress={this.myfun}
              style={{ position: "absolute", top: 120, color: "white", left: 260, opacity: 0.7 }} />

          </View>

          <View>
            <StyledInput image={titleIcon} text={'Title'} textColor={'white'} onChange={this.handleTitleChange} />
            <StyledInput image={motifIcon} text={'Datails'} textColor={'white'} onChange={this.handleDetailsChange} />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 5, color: 'white', marginTop: 5 }}
              date={this.state.startDate}
              mode="date"
              iconSource={null}
              placeholder="Start date"

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
                  backgroundColor: 'black',
                  borderColor: 'gray',
                  borderRadius: 20

                },
                placeholderText: {
                  color: 'white'
                },
                dateText: {
                  color: 'white'
                }
              }}
              onDateChange={(date) => { this.handleDateChange("startDate", date) }} />
            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 5 }}
              date={this.state.startTime}
              placeholder="Start time"
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
                  backgroundColor: 'black',
                  borderColor: 'gray',
                  borderRadius: 20

                },
                placeholderText: {
                  color: 'white'
                },
                dateText: {
                  color: 'white'
                }
              }}
              onDateChange={(time) => { this.handleDateChange("startTime", time) }}
            />


            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 5 }}
              date={this.state.endDate}
              mode="date"
              iconSource={null}
              placeholder="End date"
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
                  backgroundColor: 'black',
                  borderColor: 'gray',
                  borderRadius: 20
                },
                placeholderText: {
                  color: 'white'
                },
                dateText: {
                  color: 'white',
                }
              }}
              onDateChange={(date) => { this.handleDateChange("endDate", date) }}
            />
            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 70 }}
              date={this.state.endTime}
              placeholder="End time"
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
                  borderRadius: 20

                },
                dateInput: {
                  marginTop: 10,
                  backgroundColor: 'black',
                  borderColor: 'gray',
                  borderRadius: 20

                },
                placeholderText: {
                  color: 'white'
                },
                dateText: {
                  color: 'white'
                }
              }}
              onDateChange={(time) => { this.handleDateChange("endTime", time) }}
            />


          </View>





          <ActionButton
            buttonColor="black"
            btnOutRange="#C8593C"
            icon={<Icon name='md-arrow-dropup' style={styles.actionButtonIcon} />}
            degrees={180}
            size={40}
            radius={50}

          // outRangeScale={0.5}       
          >

            <ActionButton.Item
              buttonColor='#C9CF57'
              title="Reset"
              onPress={() => alert('refresh')} >
              <Icon
                name="md-refresh"
                style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#006B4C'
              title="Save"
              onPress={this.handleCreateEvent}>
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
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
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


});

const mapStateToProps = state => {
  return {
      loading: state.loadingReducer.loading,
      user: state.authReducer.user,
      stats: state.dashboardReducer.statsReducer.stats,
      theme: state.settingsReducer.theme,
  }
}

const mapDispatchToProps = dispatch => ({
  createEvent(event) { dispatch(createEvent(event)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);