import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon, Content, Text, View } from 'native-base';
import companyLogo from '../../../assets/img/proxym.png'

export default class adminMenu extends Component {
  render() {
    return (
      <View style={styles.container} >

        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          backgroundColor: '#082E76',
          borderBottomRightRadius: 300
        }}>
          <Image source={companyLogo} style={{
            width: 50,
            left: 15,
            top: 15,
            height: 50,
            width: 50
          }}>
          </Image>
          {/* <Icon
            name="md-menu"
            style={{
              color: 'white',
              left: 30, top: 30
            }}
            onPress={() => this.props.navigation.openDrawer()} /> */}

        </View>
        <Content>
          <View style={{ top: 80, alignItems: 'center', marginBottom: 100 }}>
            <Text style={{ color: '#05183C', fontSize: 25, fontWeight: 'bold', fontFamily: 'cursive' }}> ADMINISTRATION </Text>
            <Text style={{ color: '#05183C', fontSize: 25, opacity: 0.9, fontFamily: 'cursive' }}> MENU </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button
              buttonStyle={{
                backgroundColor: "#072152",
                borderRadius: 20,
                width: 280,
                height: 50,
                marginBottom: 10, borderColor: 'gray', borderWidth: 1
              }}
              titleStyle={{
                color: 'white',
              }}
              title="Employee Management"
              onPress={() => this.props.navigation.navigate('EmployeeManagement')}
            />
            <Button
              buttonStyle={{
                backgroundColor: "#072152",
                borderRadius: 20,
                width: 280,
                height: 50,
                marginBottom: 10, borderColor: 'gray', borderWidth: 1
              }}
              titleStyle={{
                color: 'white',
              }}
              title="Events Management"
              onPress={() => this.props.navigation.navigate('EventsManagement')}
            />
            <Button
              buttonStyle={{
                backgroundColor: "#072152",
                borderRadius: 20,
                width: 280,
                height: 50,
                marginBottom: 10, borderColor: 'gray', borderWidth: 1
              }}
              titleStyle={{
                color: 'white',
              }}
              title="Groups Management"
              onPress={() => this.props.navigation.navigate('GroupsManagement')}
            />

            <Button

              buttonStyle={{
                backgroundColor: "#072152",
                borderRadius: 20,
                width: 280,
                height: 50,
                marginBottom: 10, borderColor: 'gray', borderWidth: 1
              }}
              titleStyle={{
                color: 'white',
              }}
              title="Holidays Management"
              onPress={() => this.props.navigation.navigate('addHolidays')}
            />

            <Button

              buttonStyle={{
                backgroundColor: "#072152",
                borderRadius: 20,
                width: 280,
                height: 50,
                marginBottom: 10, borderColor: 'gray', borderWidth: 1
              }}
              titleStyle={{
                color: 'white',
              }}
              title="Working hours management"
              onPress={() => console.log('Under development')}
            />

            <Button

              buttonStyle={{
                backgroundColor: "#072152",
                borderRadius: 20,
                width: 280,
                height: 50,
                marginBottom: 10, borderColor: 'gray', borderWidth: 1
              }}
              titleStyle={{
                color: 'white',
              }}
              title="Review users statistics"
              onPress={() => console.log('Under development')}
            />

            <Button

              buttonStyle={{
                backgroundColor: "#072152",
                borderRadius: 20,
                width: 280,
                height: 50,
                marginBottom: 10, borderColor: 'gray', borderWidth: 1
              }}
              titleStyle={{
                color: 'white',
              }}
              title="Score Formula"
              onPress={() => this.props.navigation.navigate('whm')}
            />

          </View>

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
});
