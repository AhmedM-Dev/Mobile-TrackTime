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
            <Container style={{ backgroundColor: '#13446E' }}>

                <StatusBar hidden />

                <Header style={{ backgroundColor: '#13446E', flexDirection: 'row' }}>
                    <Icon name='md-menu' style={{
                        color: 'white', position: 'absolute',
                        left: 20, top: 15
                    }}
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                    <Title style={{ top: 15 }}>Attendance time</Title>

                    <View style={{ position: 'absolute', right: 20 }}>
                        <Badge style={{ top: 10, right: -10, zIndex: 1 }}><Text>2</Text></Badge>
                        <Icon active name="md-notifications" style={{ color: 'white', top: -10 }} />
                    </View>
                </Header>

                <View style={{flexDirection:'row' , alignSelf:'center'  , marginBottom:10}}>
                <View style={{marginRight:5}}>

                    <DatePicker
                        style={{ width: 225, marginBottom: 5,marginTop: 10 }}
                        date={this.state.date1}
                        mode="date"
                        placeholder="Select start date"
                        format="DD-MM-YYYY"
                        minDate="01-01-2004"
                        maxDate="31-12-2019"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={null}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 20,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                backgroundColor:'#245E8F',
                                borderColor:'#245E8F' ,
                                
                            },
                        }}
                        onDateChange={date => {
                            this.setState({ date1: date });
                        }}
                    />
                    <DatePicker
                        style={{ width: 225, }}
                        date={this.state.date2}
                        mode="date"
                        placeholder="Select end date"
                        format="DD-MM-YYYY"
                        minDate="01-01-2004"
                        maxDate="31-12-2019"
                        iconSource={null}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                backgroundColor:'#245E8F',
                                borderColor:'#245E8F'
                            },
                        }}
                        
                        onDateChange={date => {
                            this.setState({ date2: date });
                        }}
                        />
                        </View>

                    <Button style={{ width: 110, height:85 , backgroundColor:'#4986B9' , marginTop:10}}>
                        <Text style={{left:15}}>FILTER</Text>
                    </Button>
                </View>


                <Content>
                    <View  style={styles.cardStyle}>
                        <Image source={clock} style={styles.clockAlign} ></Image>

                        <ProgressCircle
                            style={{ height: 200, right: -58  , top:2}}
                            startAngle={-((PI / 30) * 15)}
                            endAngle={((PI / 30) * 35)}
                            progress={1}
                            progressColor={'#2AA92A'}
                        />
                        <ProgressCircle
                            style={{ height: 200, position: 'relative', top: -198, right: -58 }}
                            startAngle={(PI / 30) * 5}
                            endAngle={(PI / 30) * 10}
                            progress={1}
                            progressColor={'#FF0000'}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
};
const styles = StyleSheet.create({
    cardStyle: {
        alignSelf: 'center',
        width: 340,
         backgroundColor: '#245E8F',
        borderColor: '#245E8F',
        padding:15
    },

    clockAlign: {
        width: 193,
        height: 193,
        position: 'absolute',
        top: 20,
        right: 15
    },
    
});


