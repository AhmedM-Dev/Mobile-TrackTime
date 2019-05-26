import React from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import { Icon, Header, Title, View } from 'native-base';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import NotificationsBell from '../NotificationsBell';

const AppHeader = props => {

  const styles = StyleSheet.create({

    header: {
      backgroundColor: props.theme.backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      shadowColor: 'red',
      shadowOffset: { width: 20, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
  
    starStyle: {
      width: 150,
      height: 30,
      marginBottom: 10,
      alignSelf: 'center'
    }

  });

  return (
    <>
      <StatusBar hidden />

      <Header style={styles.header}>

        <View style={{ flex: 1 }}>
          <Icon name='md-menu' style={{ color: props.theme.fontColor }} onPress={() => props.navigation.openDrawer()} />
        </View>

        <View style={{ flex: 8 }}>
          <Title style={{ color: props.theme.fontColor }}>{props.title}</Title>
        </View>

        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableHighlight onPress={() => props.navigation.navigate('Settings')} style={{
            borderRadius: 100,
            height: 40,
            width: 40,
          }}>
            <Image source={{ uri: props.avatar && props.avatar.photo }} style={{
              borderRadius: 100,
              height: 40,
              width: 40,
              borderWidth: 1,
              borderColor: props.theme.fontColor
            }}></Image>
          </TouchableHighlight>
          <NotificationsBell navigation={props.navigation} />
        </View>

      </Header>
    </>
  )
}



const mapStateToProps = state => {
  return {
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
  }
}

export default connect(mapStateToProps)(AppHeader);