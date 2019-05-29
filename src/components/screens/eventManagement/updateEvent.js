import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform ,ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import ImagePicker from 'react-native-image-picker';
import StyledInput from '../../ui/Input/addEventInput';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';
import Textarea from 'react-native-textarea'


import { connect } from 'react-redux';

import { getEvents , updateEvent} from './actions';

const options = {
  title: '',
  takePhotoButtonTitle: 'Take photo',
  chooseFromLibraryButtonTitle: 'Choose from library',
  maxWidth: 500,
  maxHeight: 500
};
class updateEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: null,
    }
  }
  selectPhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {

      console.log("RESPONSE IMAGE", response);

      if (response.didCancel) {
        console.log('Event cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }
      else {
        this.setState({
          selectedEvent: {
          photo: response.data,
          photoFileName: response.fileName}
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
        
        componentDidMount() {
          this.props.getEvents();
        }
      
        handleSelectEvent = (event) => {
          this.setState({
            selectedEvent: event
          });
        }

        handleChangeTitle = (text) => {
          this.setState({
            selectedEvent: {
              ...this.state.selectedEvent,
              title: text
            }
          });
        }

        handleChangeDetails = (text) => {
          this.setState({
            selectedEvent: {
              ...this.state.selectedEvent,
              details: text
            }
          });
        }


        handleChangedateFrom= (time) => {
          this.setState({
            selectedEvent: {
              ...this.state.selectedEvent,
              dateFrom: time
            }
          });
        }

        handleChangeDateTo = (time) => {
          this.setState({
            selectedEvent: {
              ...this.state.selectedEvent,
              dateTo: time
            }
          });
        }


        submitEvent = () => {
          const { photo,title,details,dateFrom,dateTo , eventId} = this.state.selectedEvent;
      
          if (photo !== '' && title !== '' && details !== '' && dateFrom !== '' && dateTo !== '' ) {
            this.props.updateEvent({
              eventId,
              ...this.state.selectedEvent
            });
            ToastAndroid.show("Event updated successfully", ToastAndroid.LONG);
      
          } else {
            ToastAndroid.show("All infos are required.", ToastAndroid.LONG);
      
          }
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

          <View style={{
            backgroundColor: '#AA7979',
            marginBottom: 20,
            flexDirection: 'row',
            borderColor: '#CB9090',
            borderWidth: 1,
            borderRadius: 20,
            alignSelf: 'center',
            height: 45, width: 300,

              paddingLeft:10
          }}>
            <Picker
              selectedValue={this.state.selectedEvent || ''}
              style={{
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 10,
                color: 'white',
              }}
              name="event"
              onValueChange={this.handleSelectEvent}>
              {this.props && this.props.events && this.props.events.length > 0 && this.props.events.map(event => <Picker.Item label={`${event.title}`} value={event} color="#021630" />)}
            </Picker>
          </View>
          <View>
            <Button
              buttonStyle={{
                backgroundColor: '#072152',
                borderRadius: 20,
                borderColor: 'gray',
                borderWidth: 1,
                width: 300,
                alignSelf: 'center',
                marginBottom: 5
              }}
              titleStyle={{
                color: 'white'
              }}
              title={this.state.selectedEvent && this.state.selectedEvent.photoFileName}
              onPress={this.selectPhoto}
            />
            <StyledInput textColor={'white'} onChange={this.handleChangeTitle} value={this.state.selectedEvent && this.state.selectedEvent.title} />
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={this.handleChangeDetails}
              defaultValue={this.state.selectedEvent && this.state.selectedEvent.details}
              placeholderTextColor={'white'}
              underlineColorAndroid={'transparent'}
            />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 5, color: 'white', marginTop: 5 }}
              date={this.state.selectedEvent && this.state.selectedEvent.dateFrom}
              mode="datetime"
              iconSource={null}
              placeholder={this.state.selectedEvent && this.state.selectedEvent.dateFrom}

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
                  color: 'white'
                },
                dateText: {
                  color: 'white'
                }
              }}
              onDateChange={(dateF) => { this.handleChangedateFrom(dateF) }} />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 80 }}
              date={this.state.selectedEvent && this.state.selectedEvent.dateTo}
              placeholder={this.state.selectedEvent && this.state.selectedEvent.dateTo}
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
                  color: 'white'
                },
                dateText: {
                  color: 'white'
                }
              }}
              onDateChange={(dateT) => { this.handleChangeDateTo(dateT)}}
            />

          </View>





          <ActionButton
            buttonColor="#072152"
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
              onPress={() => alert('refresh')} >
              <Icon
                name="md-refresh"
                style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#006B4C'
              title="Save"
              onPress={() => { this.submitEvent() }}>
              <Icon
                name="md-done-all"
                style={styles.actionButtonIcon}

              />
            </ActionButton.Item>
          </ActionButton>
        </Content>
      </View >
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
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#072152',
    borderColor: 'gray',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: 300,
    alignSelf: 'center'
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10
  },

});

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    theme: state.settingsReducer.theme,
    events: state.eventsReducer.events
  }
}

const mapDispatchToProps = dispatch => ({
  getEvents() { dispatch(getEvents()) },
  updateEvent(user) { dispatch(updateEvent(user)) },

});

export default connect(mapStateToProps, mapDispatchToProps)(updateEvents);