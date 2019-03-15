import React from 'react';
import {
    StatusBar, Image, StyleSheet
} from 'react-native';
import { Container, Content, Card, Row } from 'native-base';
import { ProgressCircle } from 'react-native-svg-charts'
import clock from '../../../assets/img/clock1.png'
import { Header } from 'react-native-elements';

const PI = 3.14159265359;

export default class AttendanceTime extends React.Component {

    render() {
        return (
            <Container style={{ backgroundColor: '#DDE3F3' }}>

                <StatusBar hidden />

                <Header
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: () => alert('menu')
                    }
                    }

                    centerComponent={{
                        text: 'Attendance time',
                        style: { color: '#fff', fontSize: 18 }
                    }}

                    rightComponent={{
                        icon: 'home',
                        color: '#fff',
                        onPress: () => alert('home')
                    }
                    }
                    backgroundColor="#052D8F"
                />

                
                <Content>
                    <Card style={styles.cardStyle} >
                        <Image source={clock} style={styles.clockAlign} ></Image>
                        <ProgressCircle
                            style={{ height: 200 }}
                            startAngle={-1}
                            endAngle={(PI / 30) * 45}
                            progress={1}
                            progressColor={'#4FA275'}
                        />
                        <ProgressCircle
                            style={{ height: 210, position: 'relative', top: -205 }}
                            startAngle={(PI / 30) * 5.5}
                            endAngle={(PI/30) * 10}
                            progress={1}
                            progressColor={'orange'}
                        />
                    </Card>
                </Content>
            </Container>
        )
    }
};

const styles = StyleSheet.create({


    clockAlign: {
        width: 190,
        height: 190,
        position: 'absolute',
        top: 20,
        left: 83

    },

    cardStyle: {
        paddingTop: 15,
        paddingBottom: 15,

    },
    cardAlign: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },

});


