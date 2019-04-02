import React from 'react';
import {
    StatusBar, Image, StyleSheet
} from 'react-native';
import {
    Container,
    Content,
    Card,
    Text,
    Button,
    View,
    Picker,
    Footer,
    FooterTab,
    Badge, 
    Icon,
     Header,
      Title,
} from 'native-base';
import { ProgressCircle } from 'react-native-svg-charts'
import clock from '../../../assets/img/clock.png'
import DatePicker from 'react-native-datepicker';
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


                <Header style={{ backgroundColor: '#072F88', flexDirection: 'row' }}>
                    <Icon name='md-menu' style={{
                        color: 'white', position: 'absolute',
                        left: 20, top: 15
                    }}
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Title style={{ top: 15 }}>Attendance time</Title>

                    <Icon name='home' style={{
                        color: 'white', position: 'absolute',
                        right: 20, top: 15
                    }}
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                    />
                </Header>
                <View style={{
                    backgroundColor: 'white',
                    width: 360, padding: 10, borderWidth: 4, height: 180,
                    borderColor: '#DDE3F3', alignItems: 'center', alignContent: 'center'
                }}>
                    <DatePicker
                        style={{ width: 300, marginBottom: 10 }}
                        date={this.state.date1}
                        mode="date"
                        placeholder="From date"
                        format="DD-MM-YYYY"
                        minDate="01-01-2004"
                        maxDate="31-12-2019"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={dateIcon}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                borderRadius: 100,
                                marginLeft: 36,
                            },
                        }}
                        onDateChange={date => {
                            this.setState({ date1: date });
                        }}
                    />
                    <DatePicker
                        style={{ width: 300, marginBottom: 10 }}
                        date={this.state.date2}
                        mode="date"
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
                                borderRadius: 100
                            },
                        }}

                        onDateChange={date => {
                            this.setState({ date2: date });
                        }}
                    />

                    <Button rounded light style={{ width: 300, left: 15 }}>
                        <Icon name='md-checkmark' style={{ color: 'gray' }} />
                        <Text>FILTER</Text>
                    </Button>
                </View>
                <Content>
                    <Card style={styles.cardStyle} >
                        <Image source={clock} style={styles.clockAlign} ></Image>
                        <ProgressCircle
                            style={{ height: 200, right: -70 }}
                            startAngle={-((PI / 30) * 15)}
                            endAngle={((PI / 30) * 35)}
                            progress={1}
                            progressColor={'#55B285'}
                        />
                        <ProgressCircle
                            style={{ height: 200, position: 'relative', top: -200, right: -70 }}
                            startAngle={(PI / 30) * 5}
                            endAngle={(PI / 30) * 10}
                            progress={1}
                            progressColor={'#E05353'}
                        />
                    </Card>

                </Content>
                <Footer style={{ backgroundColor: '#072F88' }}>
                    <FooterTab style={{ backgroundColor: '#072F88', }} >

                        <Button vertical style={{ backgroundColor: '#072F88', height: 50 }} >
                            <Icon name="md-log-out" style={{ color: 'white' }} />
                        </Button>
                        <Button vertical style={{ backgroundColor: '#072F88', height: 50 }} 
                        onPress={() =>this.props.navigation.navigate('Settings')} >
                            <Icon name="settings" style={{ color: 'white' }} />
                        </Button>
                        <Button active badge vertical style={{ backgroundColor: '#072F88', height: 50 }} >
                            <Badge ><Text>7</Text></Badge>
                            <Icon active name="md-chatbubbles" />
                        </Button>
                        <Button active badge vertical style={{ backgroundColor: '#072F88', height: 50 }} >
                            <Badge ><Text>2</Text></Badge>
                            <Icon active name="md-notifications" />
                        </Button>

                    </FooterTab>
                </Footer>
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


