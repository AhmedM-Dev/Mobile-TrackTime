import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PermissionsAndroid, StyleSheet, StatusBar, ActivityIndicator, Switch } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Left, Body, Right, View, Picker, Footer, FooterTab, Badge, Icon, Header, Title } from 'native-base';
import PureChart from 'react-native-pure-chart';
import wifi from 'react-native-android-wifi';

import CustomCard from "../../ui/CustomCard";
import ButtonWithBadge from "../../ui/ButtonWithBadge";
import NotificationsBell from "../../ui/NotificationsBell";

import { getStats } from './actions';
import { getAvatar } from "../../../store/actions";

import prepareGraphDate from "../../../utils/prepareGraphDate";

var items = [
    {
        id: 'Current year',
        name: 'Current year',
    },
    {
        id: '2018',
        name: '2018',
    },
    {
        id: 'All years',
        name: 'All years',
    },

];

option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

class Dashboard extends React.Component {
    state = {
        connectedUser: {},
        year: new Date().getFullYear(),
        daysWorked: 0,
        workedHours: 0,
        delays: 0,
        averageWorkHours: 0,
        byMonth: null,
        fetched: false
    }

    componentDidMount() {
        this.props.getStats({ year: this.state.year });
        this.props.getAvatar();

        wifi.getBSSID((bssid) => {
            console.log(bssid);
        });
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
                color: '#C25A5A',
            }, {
                value: 40,
                label: 'Canceled',
                color: '#C2C25A'
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
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={80} color="#0000ff" />
                    <StatusBar hidden={true} />
                </View>
            )
        } else if (this.props.stats && this.props.stats.perMonth.length > 0) {
            return (

                <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>
                    <StatusBar hidden />

                    <Header style={{ backgroundColor: this.props.theme.cardBackground, flexDirection: 'row', borderBottomWidth: 1 }}>
                        <Icon name='md-menu' style={{
                            color: this.props.theme.fontColor, position: 'absolute',
                            left: 20, top: 15
                        }}
                            onPress={() => this.props.navigation.openDrawer()}
                        />
                        <Title style={{ top: 15, color: this.props.theme.fontColor }}>{this.props.user.displayName}</Title>
                        {/* <NotificationsBell userId={this.state.connectedUser && this.state.connectedUser.userId} /> */}
                    </Header>

                    <Content style={{ padding: 10 }} >
                        <View>
                            <Picker
                                selectedValue={this.state.year}
                                style={{
                                    height: 50,
                                    width: '100%',
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                    borderWidth: 1,
                                    borderColor: '#021630',
                                    color: this.props.theme.fontColor,
                                    backgroundColor: this.props.theme.cardBackground
                                }}
                                onValueChange={(itemValue, itemIndex) => this.handleYearFilterChange(itemValue)}>
                                <Picker.Item label={`Current year (${new Date().getFullYear()})`} value={new Date().getFullYear()} color="#021630"
                                    style={{ alignSelf: "center", backgroundColor: 'red' }} />
                                <Picker.Item label="2018" value="2018" color="#021630" />
                                <Picker.Item label="2017" value="2017" color="#021630" />
                                <Picker.Item label="2016" value="2016" color="#021630" />
                                <Picker.Item label="All years" value={null} color="#021630" />
                            </Picker>
                        </View>
                        <View  >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
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
                                        type='line'
                                        backgroundColor={this.props.theme.cardBackground}
                                        height={150}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'green' }}> Days worked</Text>
                                    <Text style={{ color: 'blue' }}> Hours worked</Text>
                                    <Text style={{ color: '#BE4242' }}> Delays</Text>
                                </View>
                            </CustomCard>
                        </View>

                        <CustomCard>
                            <Text style={{ fontSize: 18, color: this.props.theme.fontColor }}>Authorizations</Text>
                            <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                                <PureChart data={sampleDataa} type='pie' />
                            </View>
                        </CustomCard>
                    </Content>
                </Container>
            )
        }
    }
}


const styles = StyleSheet.create({

    cardStyle: {

        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        backgroundColor: '#082955',
        borderColor: '#082955',
        borderRadius: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },

    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

Dashboard.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.shape({
        email: PropTypes.string,
        job_title: PropTypes.string,
        token: PropTypes.string,
        userId: PropTypes.number,
        username: PropTypes.string,
        displayName: PropTypes.string
    }),
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
        theme: state.settingsReducer.theme
    }
}

const mapDispatchToProps = dispatch => ({
    getStats(year) { dispatch(getStats(year)) },
    getAvatar() { dispatch(getAvatar()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);