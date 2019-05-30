import React, { Component } from 'react';
import { StatusBar, ImageBackground, Image, StyleSheet, Platform , ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon, Container, Content, View, Text ,Picker} from 'native-base'
import ActionButton from 'react-native-circular-action-menu';

import { connect } from 'react-redux';

import { deleteGroup , getGroups} from './actions';

import AdminPickers from '../../../components/ui/AdminPickers/AdminPickers'
import groupIcon from '../../../assets/img/group.png';


import { orderBy } from 'lodash';

class removeGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group:null
        }
    }
   
    handleRemoveGrooup = () => {
        const { group } = this.state;
        if (group !== null) {
            this.props.deleteGroup(this.state.group.groupId);
            ToastAndroid.show("Group deleted successfully .", ToastAndroid.LONG);

        }

        else {
            ToastAndroid.show("Group name is required.", ToastAndroid.LONG);
        }
      }
    componentDidMount() {
        this.props.getGroups();
      }

      handleGroupChange = (group) => {
        this.setState({
          ...this.state,
          group: group
        });
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
                 
                    

                    <View style={{marginBottom:80, marginTop:100}}>

                    <View style={{
            backgroundColor: '#9C9C9C',
            marginBottom: 20,
            flexDirection: 'row',
            borderColor: '#9C9C9C',
            borderWidth: 1,
            borderRadius: 20,
            alignSelf: 'center',
            height: 45, width: 300,

              paddingLeft:10
          }}>

              <Picker
              
                selectedValue={this.state.group || ''}
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  color: 'white',

                }}
                name="group"
                onValueChange={this.handleGroupChange}>
                {this.props.groups && this.props.groups.length > 0 && orderBy(this.props.groups, 'name', 'asc').map(group => <Picker.Item label={group.name} value={group} color="#021630" />)}

              </Picker>
            </View>

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
                            onPress={() => alert('refresh')} >
                            <Icon
                                name="md-refresh"
                                style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item
                            buttonColor='#006B4C'
                            title="Save"
                            onPress={() => { this.handleRemoveGrooup() }}>
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


});



const mapStateToProps = state => {
    return {
      loading: state.loadingReducer.loading,
      user: state.authReducer.user,
      theme: state.settingsReducer.theme,
      groups: state.groupsReducer.groups
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    deleteGroup(groupId) { dispatch(deleteGroup(groupId)) },
    getGroups() { dispatch(getGroups()) },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(removeGroup);