import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform , ToastAndroid} from 'react-native';
import { Icon, Container, Content, View, Text } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Textarea from 'react-native-textarea'
import StyledInput from '../../ui/Input/addEventInput';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';

import { createEvent } from './actions';

const options = {
  title: '',
  takePhotoButtonTitle: 'Take photo',
  chooseFromLibraryButtonTitle: 'Choose from library',
  maxWidth: 500,
  maxHeight: 500
};


class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      logo: null,
      photo: null,
      dateFrom: null,
      dateTo: null,
      photoFileName: '',
      logoName: '' 
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


  selectLogo = () => {
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
          logo: response.data,
          logoName: response.fileName
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
      dateFrom: type === "dateFrom" ? value : this.state.dateFrom,
      dateTo: type === "dateTo" ? value : this.state.dateTo,
    })
  }




  handleCreateEvent = () => {
    const { title, logoName, dateFrom, dateTo, details, photoFileName } = this.state;
    if (title !== '' && logoName !== '' && dateFrom !== '' && dateTo !== '' && details !== '' && photoFileName !== '') {
      this.props.createEvent(this.state);
      ToastAndroid.show("Event added successfully", ToastAndroid.LONG);
    } else {
      ToastAndroid.show("All infos are required.", ToastAndroid.LONG);
    }
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

  

  render() {
    return (
      <View style={styles.container} >
        <Content>
          <Icon
            name="md-arrow-dropleft"
            style={{
              marginLeft: 30,
              top: 25,
              marginBottom: 40
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />
          <View style={{ marginTop: 10 }}>
            <Button
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
            <Button
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
              title={this.state.logoName || "logo"}
              onPress={this.selectLogo}
            />
            <Icon name="md-download"
              onPress={this.myfun}
              style={{ position: "absolute", top: 120, color: "white", left: 260, opacity: 0.7 }} />

          </View>

          <View>
            <StyledInput text={'Title'} textColor={'white'} onChange={this.handleTitleChange} />
            <View>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={this.handleDetailsChange}
                defaultValue={this.state.details}
                placeholder={'Details'}
                placeholderTextColor={'white'}
                underlineColorAndroid={'transparent'}
              />
            </View>
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
              onDateChange={(dateF) => { this.handleDateChange("dateFrom", dateF) }} />

            <DatePicker
              style={{ width: 300, alignSelf: 'center', marginBottom: 80 }}
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
              onDateChange={(dateT) => { this.handleDateChange("dateTo", dateT) }}
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
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: 'black',
    borderColor: 'gray',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10, width: 300, alignSelf: 'center'
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
    stats: state.dashboardReducer.statsReducer.stats,
    theme: state.settingsReducer.theme,
  }
}

const mapDispatchToProps = dispatch => ({
  createEvent(event) { dispatch(createEvent(event)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
