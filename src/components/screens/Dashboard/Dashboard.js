import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PermissionsAndroid, StyleSheet, StatusBar, ActivityIndicator, Switch, Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Left, Body, Right, View, Picker, Footer, FooterTab, Badge, Icon, Header, Title } from 'native-base';
import PureChart from 'react-native-pure-chart';
import wifi from 'react-native-android-wifi';
import companyLogo from '../../../assets/img/proxym.png'

import CustomCard from "../../ui/CustomCard";
import ButtonWithBadge from "../../ui/ButtonWithBadge";
import NotificationsBell from "../../ui/NotificationsBell";
import Speedometer from 'react-native-speedometer-chart';

import { getStats } from './actions';
import { getAvatar } from "../../../store/actions";

import prepareGraphDate from "../../../utils/prepareGraphDate";
import CustumPicker from '../../../components/ui/CustomPicker/CustumPicker'
import StarRating from './StarRating';

import Star from 'react-native-star-view';

import userPic from '../../../assets/img/userPic.jpg';
import SimplePicker from 'react-native-simple-picker';
import click from '../../../assets/img/click.png'
import { TouchableHighlight } from 'react-native-gesture-handler';

// import {
//   ContributionGraph,
// } from 'react-native-chart-kit'

// const chartConfig = {
//   backgroundGradientFrom: '#1E2923',
//   backgroundGradientTo: '#08130D',
//   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//   strokeWidth: 2 // optional, default 3
// }

// const commitsData = [
//   { date: '2017-01-02', count: 1 },
//   { date: '2017-01-03', count: 2 },
//   { date: '2017-01-04', count: 3 },
//   { date: '2017-01-05', count: 4 },
//   { date: '2017-01-06', count: 5 },
//   { date: '2017-01-30', count: 2 },
//   { date: '2017-01-31', count: 3 },
//   { date: '2017-03-01', count: 2 },
//   { date: '2017-04-02', count: 4 },
//   { date: '2017-03-05', count: 2 },
//   { date: '2017-02-30', count: 4 }
// ]
// option = {
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [{
//     data: [820, 932, 901, 934, 1290, 1330, 1320],
//     type: 'line'
//   }]
// };

const languages = ['English', 'Frensh'];

class Dashboard extends React.Component {


  state = {
    connectedUser: {},
    year: new Date().getFullYear(),
    daysWorked: 0,
    workedHours: 0,
    delays: 0,
    averageWorkHours: 0,
    byMonth: null,
    fetched: false,
    languageSelected: 'English',

  }

  componentDidMount() {
    this.props.getStats({ year: this.state.year });
    this.props.getAvatar();

    wifi.getBSSID((bssid) => {
      console.log(bssid);
    });
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }


  handleYearFilterChange = (year) => {
    this.setState({
      year
    }, () => this.props.getStats({ year: this.state.year }));
  }

  render() {
    let sampleDataa = [
      {
        value: 50,
        label: 'Refused',
        color: '#D94949',
      }, {
        value: 40,
        label: 'Canceled',
        color: '#E5DC6F'
      }, {
        value: 25,
        label: 'Accepted',
        color: '#5AC26B'
      },
      {
        value: 10,
        label: 'On hold',
        color: '#5AAAC2'
      }

    ]

    if (!this.props.stats) {
      return (
        <View style={styles.container}>
          <Image source={companyLogo} style={{ marginBottom: 50 }}></Image>
          <ActivityIndicator size={80} color="#0000ff" />
          <StatusBar hidden={true} />
        </View>
      )
    } else if (this.props.stats && this.props.stats.perMonth.length > 0) {
      return (

        <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>
          <StatusBar hidden />

          <Header style={{ backgroundColor: this.props.theme.backgroundColor, flexDirection: 'row', }}>
            <Icon name='md-menu' style={{
              color: this.props.theme.fontColor, position: 'absolute',
              left: 20, top: 15
            }}
              onPress={() => this.props.navigation.openDrawer()}
            />
            <Title style={{ top: 15, color: this.props.theme.fontColor, marginRight: 90, marginLeft: 80 }}>Dashboard</Title>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Settings')} style={{
              borderRadius: 100,
              height: 30,
              width: 30,
              marginRight: 15,
              top: 15,
            }}>
              <Image source={{ uri: this.props.avatar && this.props.avatar.photo }} style={{
                borderRadius: 100,
                height: 30,
                width: 30,
                borderWidth: 1,
                borderColor: this.props.theme.fontColor
              }}></Image>
            </TouchableHighlight>
            <NotificationsBell navigation={this.props.navigation} />
          </Header>

          <Content style={{ padding: 10 }} >
            <CustumPicker >
              <Picker
                selectedValue={this.state.year}
                style={{
                  height: 50, width: 300, color: this.props.theme.fontColor,
                }}
                onValueChange={(itemValue, itemIndex) => this.handleYearFilterChange(itemValue)}>
                <Picker.Item label={`Current year (${new Date().getFullYear()})`} value={new Date().getFullYear()} color="#021630"
                  style={{ alignSelf: "center", backgroundColor: 'red' }} />
                <Picker.Item label="2018" value="2018" color="#021630" />
                <Picker.Item label="2017" value="2017" color="#021630" />
                <Picker.Item label="2016" value="2016" color="#021630" />
                <Picker.Item label="All years" value={null} color="#021630" />
              </Picker>
            </CustumPicker>
            <View  >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, marginTop: 10 }}>
                <ButtonWithBadge style={{ flex: 6 }} text="Hours worked" data={this.props.stats.totalHours.toFixed(2)} badgeColor="#3F7930" />
                <ButtonWithBadge style={{ flex: 6 }} text="Days worked" data={this.props.stats.totalDays} badgeColor="#3F7930" />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ButtonWithBadge style={{ flex: 8 }} text="Average working hours" data={this.props.stats.averageWorkingHours.toFixed(2)} badgeColor="#3F7930" />
                <ButtonWithBadge style={{ flex: 4 }} text="Delays" data={this.props.stats.totalDelays} badgeColor="#E82C2C" />
              </View>

              <CustomCard>
                <View style={{ flex: 1, left: -10 }}>
                  <PureChart data={prepareGraphDate(this.props.stats.perMonth)}
                    type='bar'
                    backgroundColor={this.props.theme.cardBackground}
                    height={150}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#4C98B4', fontWeight: 'bold' }}> Days worked</Text>
                  <Text style={{ color: '#AA669A', fontWeight: 'bold' }}> Hours worked</Text>
                  <Text style={{ color: '#BE4242', fontWeight: 'bold' }}> Delays</Text>
                </View>
              </CustomCard>
            </View>

            <CustomCard>
              <Text style={{
                fontSize: 18,
                color: this.props.theme.fontColor,
                width: '114%',
                top: -20,
                paddingBottom: 5, paddingTop: 5,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingLeft:20,
                left: -20,
                backgroundColor: this.props.theme.cardHeaderColor
              }}>Authorizations</Text>
              <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                <PureChart data={sampleDataa} type='pie' />
              </View>
            </CustomCard>

            <CustomCard>
              
            <Text style={{
                fontSize: 18,
                color: this.props.theme.fontColor,
                width: '114%',
                top: -20,
                paddingBottom: 5, paddingTop: 5,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingLeft:20,
                left: -20,
                backgroundColor: this.props.theme.cardHeaderColor
              }}>
              Average grade</Text>
              <View style={{ margin: 10 }}>
                <Text style={{
                  alignSelf: 'center',
                  color: '#94E7B2',
                  fontWeight: 'bold'
                }}>14.7  <Text style={{ color: this.props.theme.fontColor }}>/ 20</Text></Text>
              </View>
              <Star score={14.7} style={styles.starStyle} totalScore={20} />
            </CustomCard>

            {/* <CustomCard>
              <ContributionGraph
                values={commitsData}
                endDate={new Date('2017-04-01')}
                numDays={105}
                width={200}
                height={220}
                chartConfig={chartConfig}
              />
            </CustomCard> */}
          </Content>
        </Container>
      )
    }
  }
}


const styles = StyleSheet.create({


  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: 'black',
  },

  starStyle: {
    width: 150,
    height: 30,
    marginBottom: 10,
    alignSelf: 'center'
  }

});

Dashboard.propTypes = {
  loading: PropTypes.bool,
  // user: PropTypes.shape({
  //   email: PropTypes.string,
  //   jobTitle: PropTypes.string,
  //   token: PropTypes.string,
  //   userId: PropTypes.string,
  //   username: PropTypes.string,
  //   displayName: PropTypes.string,
  //   groupId: PropTypes.string,
  // }),
  stats: PropTypes.shape({
    averageWorkingHours: PropTypes.number,
    maxHours: PropTypes.number,
    perMonth: PropTypes.array,
    totalDays: PropTypes.number,
    totalHours: PropTypes.number,
    totalDelays: PropTypes.number
  }),
  theme: PropTypes.object
};


const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    stats: state.dashboardReducer.statsReducer.stats,
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar
  }
}

const mapDispatchToProps = dispatch => ({
  getStats(year) { dispatch(getStats(year)) },
  getAvatar() { dispatch(getAvatar()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);