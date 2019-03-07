import React from 'react';
import {
    StatusBar, Image, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    View
} from 'native-base';

import clock from '../../../assets/img/clock.png'

import PureChart from 'react-native-pure-chart';
import Speedometer from 'react-native-speedometer-chart';


import { ProgressCircle } from 'react-native-svg-charts'

import {
    RkText,
    RkStyleSheet,
    RkTheme,
} from 'react-native-ui-kitten';
import {

    DoughnutChart

} from '../../charts/doughnutChart';


export default class Dashboard extends React.Component {
    // diag4

    render() {

        // diag1

        let sampleData = [
            {
                seriesName: 'series1',
                data: [
                    { x: '2018-02-01', y: 30 },
                    { x: '2018-02-02', y: 200 },
                    { x: '2018-02-03', y: 170 },
                    { x: '2018-02-04', y: 250 },
                    { x: '2018-02-05', y: 10 }
                ],
                color: '#297AB1'
            },
            {
                seriesName: 'series2',
                data: [
                    { x: '2018-02-01', y: 20 },
                    { x: '2018-02-02', y: 100 },
                    { x: '2018-02-03', y: 140 },
                    { x: '2018-02-04', y: 550 },
                    { x: '2018-02-05', y: 40 }
                ],
                color: '#B19ADF'
            }
        ]

        // diag 2
        const chartConfig = {
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2 // optional, default 3
        }
        const screenWidth = Dimensions.get('window').width

        // diag4

        return (


            <Container >
                <StatusBar hidden />

                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Dashboard', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

                <Content >

                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'Image URL' }} />
                                <Body>
                                    <Text>TrackTime</Text>
                                    <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            {/* <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: null, flex: 1 }} /> */}
                            <PureChart data={sampleData} type='line' />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Text>4 Comments</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                        </CardItem>
                    </Card>

                    <Card style={styles.cardStyle}  >
                        <CardItem style={styles.cardAlign}>
                            <Speedometer
                                value={50}
                                totalValue={150}
                                size={250}
                                outerColor="#E4E6F5"
                                internalColor="#B19ADF"
                                showText
                                text="50.00"
                                textStyle={{ color: '#297AB1' }}
                                showLabels
                                labelStyle={{ color: '#297AB1' }}
                                showPercent
                                percentStyle={{ color: '#B19ADF' }}
                            /></CardItem>
                    </Card>





                    <Card style={styles.cardStyle} >
                        <Image source={clock} style={styles.clockAlign} ></Image>
                        <ProgressCircle
                            style={{ height: 200 }}
                            progress={0.7}
                            progressColor={'#B19ADF'}
                        />
                    </Card>

                    <Card>

                            {/* <DoughnutChart /> */}

                    </Card>

                </Content>





            </Container>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    gauge: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
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

    clockAlign: {
        width: 190,
        height: 190,
        position: 'absolute',
        top: 20,
        left: 83

    },

}
);

