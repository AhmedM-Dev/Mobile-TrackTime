import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PermissionsAndroid, StyleSheet, StatusBar, ActivityIndicator, Switch, Image, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Left, Body, Right, View, Picker, Footer, FooterTab, Badge, Icon, Title } from 'native-base';
import PureChart from 'react-native-pure-chart';
import wifi from 'react-native-android-wifi';
import companyLogo from '../../../assets/img/proxym.png'
import CustomCard from "../../ui/CustomCard";
import ButtonWithBadge from "../../ui/ButtonWithBadge";
import AppHeader from '../../ui/AppHeader';
import { getStats, getUsers, getAvailableYears } from './actions';
import { getAvatar } from "../../../store/actions";
import prepareGraphDate from "../../../utils/prepareGraphDate";
import CustumPicker from '../../../components/ui/CustomPicker/CustumPicker'
import Star from 'react-native-star-view';


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
    this.props.getAvailableYears();

    // wifi.getBSSID((bssid) => {
    //   console.log(bssid);
    // });
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
    const loading = this.props.loading;

    if (!loading || (!loading && this.props.stats && this.props.stats.perMonth.length > 0)) {

      const rejected = this.props.stats && this.props.stats.rejected !== 0 && this.props.stats.rejected || 1;
      const canceled = this.props.stats && this.props.stats.canceled !== 0 && this.props.stats.canceled || 1;
      const accepted = this.props.stats && this.props.stats.accepted !== 0 && this.props.stats.accepted || 1;
      const onHold = this.props.stats && this.props.stats.onHold !== 0 && this.props.stats.onHold || 1;

      const sampleData = [
        {
          value: accepted,
          label: 'Accepted',
          color: '#5AC26B'
        },
        {
          value: canceled,
          label: 'Canceled',
          color: '#E5DC6F'
        },
        {
          value: onHold,
          label: 'On hold',
          color: '#5AAAC2'
        },
        {
          value: rejected,
          label: 'Refused',
          color: '#D94949',
        },
      ];

      console.log('sampleData', sampleData);

      return (

        <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>

          <AppHeader title="Dashboard" navigation={this.props.navigation} />

          <Content style={{ padding: 10 }} >
            <CustumPicker >
              <Picker
                selectedValue={this.state.year || new Date().getFullYear()}
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

                {/* {
                  this.props.years.map((item, index) => {
                    <Picker.Item key={index} label="All years" value={null} color="#021630" />
                  })
                } */}
              </Picker>
            </CustumPicker>
            <View  >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, marginTop: 10 }}>
                <ButtonWithBadge style={{ flex: 6 }} text="Hours worked" data={this.props.stats && this.props.stats.totalHours && this.props.stats.totalHours.toFixed(2)} badgeColor="#3F7930" />
                <ButtonWithBadge style={{ flex: 6 }} text="Days worked" data={this.props.stats && this.props.stats.totalDays} badgeColor="#3F7930" />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ButtonWithBadge style={{ flex: 8 }} text="Average working hours" data={this.props.stats && this.props.stats.averageWorkingHours && this.props.stats.averageWorkingHours.toFixed(2)} badgeColor="#3F7930" />
                <ButtonWithBadge style={{ flex: 4 }} text="Delays" data={this.props.stats && this.props.stats.totalDelays} badgeColor="#E82C2C" />
              </View>

              <CustomCard>
                <View style={{ flex: 1, left: -10 }}>
                  {this.props.stats && this.props.stats.perMonth && <PureChart data={prepareGraphDate(this.props.stats.perMonth)}
                    type='bar'
                    backgroundColor={this.props.theme.cardBackground}
                    height={150}
                  />}
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
                paddingBottom: 5, paddingTop: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingLeft: 20,
                left: -20,
                backgroundColor: this.props.theme.cardHeaderColor,
                fontFamily: 'cursive', fontWeight: 'bold'
              }}>Requests</Text>
              <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                <PureChart data={sampleData} type='pie' />
              </View>
            </CustomCard>

            <CustomCard>

              <Text style={{
                fontSize: 18,
                color: this.props.theme.fontColor,
                width: '114%',
                top: -20,
                paddingBottom: 5, paddingTop: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingLeft: 20,
                left: -20,
                backgroundColor: this.props.theme.cardHeaderColor,
                fontFamily: 'cursive', fontWeight: 'bold'
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

          </Content>
        </Container>
      )
    } else {
      return (
        <View style={styles.container}>
          <Image source={companyLogo} style={{ marginBottom: 50 }}></Image>
          <ActivityIndicator size={80} color="#0000ff" />
          <StatusBar hidden={true} />
        </View>
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
    backgroundColor: '#020B1C',
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
    avatar: state.authReducer.avatar,
    years: state.dashboardReducer.statsReducer.years
  }
}

const mapDispatchToProps = dispatch => ({
  getStats(year) { dispatch(getStats(year)) },
  getAvatar() { dispatch(getAvatar()) },
  getAvailableYears() { dispatch(getAvailableYears()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
