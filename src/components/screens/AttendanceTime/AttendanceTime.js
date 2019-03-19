import React from 'react';
import {
    StatusBar, Image, StyleSheet, View, Text
} from 'react-native';
import { Container, Content, Card, Icon, Header, Title } from 'native-base';
import { ProgressCircle } from 'react-native-svg-charts'
import clock from '../../../assets/img/clock.png'
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';
import dateIcon from '../../../assets/img/date.png'

const PI = 3.14159265359;
export default class AttendanceTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: '15-05-2018' };
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#DDE3F3' }}>

                <StatusBar hidden />


                <Header style={{ backgroundColor: '#052D8F', flexDirection: 'row' }}>
                    <Icon name='md-menu' style={{
                        color: 'white', position: 'absolute',
                        left: 20, top: 10
                    }}
                        onPress={() => alert('menu')}
                    />
                    <Title style={{ top: 15 }}>Attendence time</Title>

                    <Icon name='md-menu' style={{
                        color: 'white', position: 'absolute',
                        right: 20, top: 10
                    }}
                        onPress={() => alert('home')}
                    />
                </Header>
                <View>
                    <View style={{
                        flexDirection: 'row', backgroundColor: 'white',
                        width: 360, padding: 10, borderWidth: 4,
                        borderColor: '#DDE3F3',
                    }}>
                        <View>
                            <DatePicker
                                style={{ width: 160 }}
                                date={this.state.date1} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="From date"
                                format="DD-MM-YYYY"
                                minDate="01-01-2004"
                                maxDate="31-12-2019"
                                iconSource={dateIcon}
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        marginRight: 20,
                                    },
                                }}
                                onDateChange={date => {
                                    this.setState({ date1: date });
                                }}
                            />
                        </View>
                        <View>
                            <DatePicker
                                style={{ width: 160 }}
                                date={this.state.date2} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="To date"
                                format="DD-MM-YYYY"
                                minDate="01-01-2004"
                                maxDate="31-12-2019"
                                iconSource={dateIcon}
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                    },
                                }}

                                onDateChange={date => {
                                    this.setState({ date2: date });
                                }}
                            />
                        </View>
                    </View>
                    <Button
                        buttonStyle={{ width: 354, height: 50, padding: 10, left: 3, backgroundColor: '#009688' }}
                        title="FILTER"
                    />
                </View>
                <Content>
                    <Card style={styles.cardStyle} >
                        <Image source={clock} style={styles.clockAlign} ></Image>
                        <ProgressCircle
                            style={{ height: 200, right: -70 }}
                            startAngle={-((PI / 30) * 15)}
                            endAngle={((PI / 30) * 35)}
                            progress={1}
                            progressColor={'#009688'}
                        />
                        <ProgressCircle
                            style={{ height: 210, position: 'relative', top: -205, right: -70 }}
                            startAngle={(PI / 30) * 5}
                            endAngle={(PI / 30) * 10}
                            progress={1}
                            progressColor={'#FF5050'}
                        />
                    </Card>
                </Content>
            </Container>
        )
    }
};
const styles = StyleSheet.create({
    clockAlign: {
        width: 193,
        height: 193,
        position: 'absolute',
        top: 18.5,
        right: 10
    },
    cardStyle: {
        paddingTop: 15,
        paddingBottom: 15,
        height: 250
    },
});


