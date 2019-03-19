import React from 'react';
import {
    Image, StyleSheet , StatusBar
} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Left,
    Body,
    Right,
    View,
    Picker,
    Footer,
    FooterTab,
    Badge, Icon, Header, Title,
    
} from 'native-base';

// import Icon from 'react-native-vector-icons/FontAwesome'

import detailsIcon from '../../../assets/img/details.png'
import blueIcon from '../../../assets/img/blue.png'
import redIcon from '../../../assets/img/red.png'
import PureChart from 'react-native-pure-chart';
import Speedometer from 'react-native-speedometer-chart';
import theme from '../../../theme/fontFamily';


// diag4
export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            PickerValue: ''
        }
    };

    render() {
        let index = 0;
        const dataY = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
            // etc...
            // Can also add additional custom keys which are passed to the onChange callback
            { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
        ];
        // diag1

        let sampleData = [
            {
                seriesName: 'series1',
                data: [
                    { x: 'January', y: 30 },
                    { x: 'February', y: 40 },
                    { x: 'march', y: 30 },
                    { x: 'April', y: 20 },
                    { x: 'may', y: 10 },
                    { x: 'June', y: 10 },
                    { x: 'July', y: 10 },
                    { x: 'August', y: 30 },
                    { x: 'September', y: 30 },
                    { x: 'October', y: 30 },
                    { x: 'November', y: 30 },
                    { x: 'December', y: 30 },

                ],
                color: '#6894C7'
            },
            {
                seriesName: 'series2',
                data: [
                    { x: 'January', y: 400 },
                    { x: 'February', y: 300 },
                    { x: 'march', y: 503 },
                    { x: 'April', y: 170 },
                    { x: 'may', y: 400 },
                    { x: 'June', y: 200 },
                    { x: 'July', y: 100 },
                    { x: 'August', y: 500 },
                    { x: 'September', y: 370 },
                    { x: 'October', y: 320 },
                    { x: 'November', y: 240 },
                    { x: 'December =', y: 340 },
                ],
                color: '#C95C5C'
            }
        ]


        // diag2

        let sampleDataa = [
            {
                value: 50,
                label: 'Refused',
                color: '#BF1F43',
            }, {
                value: 40,
                label: 'Annulled',
                color: '#E4B5B5'
            }, {
                value: 25,
                label: 'Accepted',
                color: '#9BBB80'
            },
            {
                value: 10,
                label: 'On hold',
                color: '#AACDD8'
            }

        ]

        // diag4

        const dataaaa = [0.4, 0.6, 0.8]

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
                    <Title style={{ top: 15 }}>Dashboard</Title>

                    <Icon name='md-menu' style={{
                        color: 'white', position: 'absolute',
                        right: 20, top: 10
                    }}
                        onPress={() => alert('home')}
                    />
                </Header>

                <View style={styles.autorisationList}>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 300 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ language: itemValue })

                        }>
                        <Picker.Item label="Current year" value="2019" />
                        <Picker.Item label="2018" value="2018" />
                        <Picker.Item label="2017" value="2017" />
                        <Picker.Item label="All years" value="All years" />


                    </Picker>
                </View>

                <Content  >

                    <Card style={styles.cardStyle} >

                        <Text style={{ fontSize: 18, marginTop: 15, left: -100, }}> Summary </Text>

                        <CardItem>
                            <CardItem style={{ flexDirection: 'row' }}>
                                <Button badge vertical style={{ backgroundColor: 'white', width: 140, marginRight: 4 }}>
                                    <Badge style={{ backgroundColor: '#63BB93' }}><Text>12365</Text></Badge>
                                    <Text style={{ color: 'black' }}>Hours worked</Text>
                                </Button>
                                <Button badge vertical style={{ backgroundColor: 'white', width: 140 }}>
                                    <Badge style={{ backgroundColor: '#63BB93' }} ><Text>468</Text></Badge>
                                    <Text style={{ color: 'black' }} >Days worked</Text>
                                </Button>

                            </CardItem>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'row', }}>
                            <Button badge vertical style={{ marginTop: -30, marginLeft: 4, marginRight: 4, backgroundColor: 'white', width: 220 }}>
                                <Badge style={{ backgroundColor: '#63BB93' }}><Text>8</Text></Badge>
                                <Text style={{ color: 'black' }} >Average working hours</Text>
                            </Button>
                            <Button badge vertical style={{ marginTop: -30, backgroundColor: 'white', width: 90 }}>
                                <Badge style={{ backgroundColor: '#FF8C8C' }}><Text>256</Text></Badge>
                                <Text style={{ color: 'black' }} >Delays</Text>
                            </Button>
                        </CardItem>
                        <CardItem cardBody style={styles.s}>
                            <PureChart data={sampleData} type='line' />
                        </CardItem>


                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Image source={blueIcon} />
                                    <Text style={{ color: '#6894C7' }}>Days worked</Text>
                                </Button>
                            </Left>

                            <Body>
                                <Button transparent>
                                    <Image source={redIcon} />
                                    <Text style={{ color: '#C95C5C' }}>Hours worked</Text>
                                </Button>
                            </Body>

                            {/* <Right>
                                <Button backgroundColor='#F1F4FA' style={{
                                    borderRadius: 20
                                }} >
                                    <Image source={detailsIcon} style={{ right: -10 }} />
                                    <Text style={{ color: '#6FBADE' }}>Details </Text>
                                </Button>

                            </Right> */}
                        </CardItem>

                    </Card>


                    <Card style={styles.cardStyle}>

                        <CardItem>
                            <Text style={{ fontSize: 18, left: -80 }}>Authorizations</Text>
                        </CardItem>

                        <CardItem >
                            <PureChart data={sampleDataa} type='pie' />

                        </CardItem>

                    </Card>
                    <Card style={styles.cardStyle}  >
                        <CardItem>
                            <Text style={{ fontSize: 18, left: -100 }}>Average grade</Text>
                        </CardItem>
                        <CardItem >
                            <Speedometer
                                value={13}
                                totalValue={20}
                                size={250}
                                outerColor="#C2ECD4"
                                internalColor="#327951"
                                showText
                                text="13.00"
                                textStyle={{ color: '#297AB1' }}
                                showLabels
                                labelStyle={{ color: '#327951' }}
                                showPercent
                                percentStyle={{ color: '#327951' }}
                            /></CardItem>
                    </Card>

                </Content>

                <Footer style={{ backgroundColor: '#052D8F' }}>
                    <FooterTab theme={theme} style={{ backgroundColor: '#052D8F' }} >

                        <Button badge vertical style={{ backgroundColor: '#052D8F' }}>
                            <Badge><Text>2</Text></Badge>
                            <Icon name="home" />
                        </Button>

                        <Button vertical style={{ backgroundColor: '#052D8F' }} >
                            <Icon name="camera" />
                        </Button>

                        <Button active badge vertical style={{ backgroundColor: '#052D8F' }} >
                            <Badge ><Text>2</Text></Badge>
                            <Icon active name="navigate" />
                        </Button>

                        <Button vertical style={{ backgroundColor: '#052D8F' }} >
                            <Icon name="person" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}


const styles = StyleSheet.create({

    cardStyle: {

        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    },

    autorisationList: {
        borderWidth: 4,
        width: 300,
        alignItems: 'center',
        margin: 15,
        backgroundColor: 'white',
        borderColor: '#DDE3F3',
        left: -16,
        marginBottom: -2,
        marginTop: 2,
        width: 362
    },

    s: {
        position: 'relative',
        left: -20,
        paddingTop: 10,
        paddingRight: 10,
        width: 300,
    },
}
);

