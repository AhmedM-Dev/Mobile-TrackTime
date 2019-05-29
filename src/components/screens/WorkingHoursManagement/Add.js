import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform , ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import { Icon, Container, Content, View, Text, Picker } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';


class Add extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: null,
      selectedUser: null
    }
  };


  handleEmailChange = (text) => {
    this.setState({
      ...this.state,
      email: text
    });
  }

  handlePassChange = (text) => {
    this.setState({
      ...this.state,
      pass: text
    });
  }

  componentWillMount() {
    AsyncStorage.getItem("user").then(user => {

      this.setState({
        connectedUser: JSON.parse(user)
      });
    })
  }

  handleSelectUser = (user) => {
    this.setState({
      selectedUser: user
    });
  }

  handleDeleteUser = () => {
    this.props.deleteUser(this.state.selectedUser.userId);
    ToastAndroid.show("user deleted successfully", ToastAndroid.LONG);
  }


  render() {
    return (
      <View style={styles.container} >
        <Content>
        <Icon
            name="md-arrow-round-back"
            style={{
              color: '#DA7373',
              margin:30,
              fontSize: 18,
              left:20
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />

        

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
              onPress={this.handleDeleteUser}>
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