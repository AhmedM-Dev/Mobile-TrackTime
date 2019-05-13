import React, { Component } from "react";
import {
    StyleSheet,
    StatusBar, Dimensions, 
} from "react-native";
import { Text, View, Icon, Content , Container} from 'native-base'
import axios from "axios";
import { API_URL } from "../../../../config";
import { fetchDataFromAsyncStorage } from '../../../services/services';
import { Header } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';

const MIN_HEIGHT = Header.HEIGHT;
const MAX_HEIGHT = 250;
var width = Dimensions.get('window').width;
export class checkTravels extends Component {

    constructor() {
        super();
        this.state = {
            myTravels: ['None']
        }
    };

    fetchTravels = () => {
        fetchDataFromAsyncStorage('user')
            .then(user => {
                axios.get(`${API_URL}travels?userId=${user.userId}`)
                    .then(response => {
                        console.log("TRAVELS:", response.data.travels);
                        this.setState({
                            myTravels: response.data.travels
                        });
                        return response.data.travels;
                    })
                    .catch(error => {
                        console.log(error);
                        return null;
                    });
            })
            .catch(error => {
                console.log("No user found");
            });
    }

    // componentDidUpdate() {

    // }

    componentWillMount() {
        this.fetchTravels();
    }

    render() {
        return (
            <Container style={styles.container} >
                <StatusBar hidden />
               
                <Content>
<View style={{flexDirection:'row' , marginTop:10}}>
                        <View style={styles.cardStyle}>

                            {
                                this.state.myTravels && this.state.myTravels.map((item, index) => {
                                    return (
                                        
                                        <View style={styles.cardStyle}>
                                        <View style={styles.leftIcon}></View>
                                     <Text key={index} style={{ color: 'black' }}><Text style={{fontWeight:'bold'}}>Conductor :</Text> {item.conductor}</Text>
                                            <Text key={index} style={{ color: 'black' }}><Text style={{fontWeight:'bold'}}>Destination adres :</Text> {item.destinationAdress}</Text>
                                            <Text key={index} style={{ color: 'black' }}><Text style={{fontWeight:'bold'}}>From </Text>{item.startDate} , {item.startTime}</Text>
                                            {/* <Text key={index} style={{ color: 'black' }}>{item.startTime}</Text> */}
                                            <Text key={index} style={{ color: 'black' }}><Text style={{fontWeight:'bold'}}>To </Text>{item.endDate} , {item.endTime}</Text>
                                            {/* <Text key={index} style={{ color: 'black' }}>{item.endTime}</Text> */}
                                            <Text key={index} style={{ color: 'black' }}><Text style={{fontWeight:'bold'}}>Type : </Text>{item.travelType}</Text>
                                            <Text key={index} style={{ color: 'black' }}><Text style={{fontWeight:'bold'}}>Type : </Text>{item.type}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        </View>

                        </Content>

                        <ActionButton
                            buttonColor="transparent"
                            btnOutRange="transparent"
                            icon={<Icon name='md-arrow-dropup' style={styles.ButtonIcon} />}
                            degrees={135}
                            size={40}
                            radius={50}
                            position='right'
                        // outRangeScale={0.5}       
                        >
                            <ActionButton.Item
                                buttonColor='#A23B81'
                                title="menu"
                                onPress={() => this.props.navigation.openDrawer()}>
                                <Icon
                                    name="md-menu"
                                    style={styles.actionButtonIcon}

                                />
                            </ActionButton.Item>
                            <ActionButton.Item
                                buttonColor='#3B76A2'
                                title="home"
                                onPress={() => this.props.navigation.navigate('Dashboard')}>
                                <Icon
                                    name="md-home"
                                    style={styles.actionButtonIcon}

                                />
                            </ActionButton.Item>
                        </ActionButton>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'white'
    },

    cardStyle: {
        backgroundColor: 'transparent',
        paddingLeft: 10,
        paddingTop:5,
        paddingBottom:5,
        width:width ,
        marginBottom:20
    },

    leftIcon: {
        backgroundColor: '#2CA96E',
        marginRight: -40,
        height: 140, width: 20,
        borderRadius: 100,
        alignSelf: 'center', left: -24,
        position:'absolute',
      },
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    
    ButtonIcon: {
        fontSize: 20,
        height: 22,
        color: '#2CA96E',
        
    },
 
  
});

export default checkTravels;