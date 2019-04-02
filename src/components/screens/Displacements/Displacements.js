import React from 'react'
import { StatusBar, StyleSheet, Image} from 'react-native'
import {
    Container,
    Content,
    Card,
    Text,
    View,
    Picker,
    Footer,
    Button,
    FooterTab,
    Badge, Icon, Header, Title, Accordion
} from 'native-base'
import Textarea from 'react-native-textarea';
import timeIcon from '../../../assets/img/Time.png'
import dateIcon from '../../../assets/img/date.png'
import DatePicker from 'react-native-datepicker';

export default class Displacements extends React.Component {

    constructor() {
        super();
        this.state = {
            PickerValue: ''
        }
    };
  
    render() {
        const dataArray = [
            {
                title: "Local ",
                content: "hhhhhhhhhhhhh hhhhhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhh hhhhhhhhhh hhhhhhhhhhhh hhh"
            },
            {
                title: "Abroad",
                 content:
                    "hhhhhhhhhhhhhhhh hhhhhhhhhh hhhhhhhhhh hhhhhhhh hhhhhhhhhhh hhhhhhh hhhhhhhhhhh hhhhh"
            },
        ];

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
                    <Title style={{ top: 15 }}>My Displacements</Title>

                    <Icon name='home' style={{
                        color: 'white', position: 'absolute',
                        right: 20, top: 15
                    }}
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                    />
                </Header>

                <Content>
                    <Card style={{ alignItems: 'center' }}>
                        <Accordion
                            icon="add"
                            expandedIcon="remove"
                            dataArray={dataArray}
                            style={{ margin: 20, width: 320 }}
                        //  headerStyle={{ backgroundColor: "#99AFAE" }}
                        //  contentStyle={{ backgroundColor: "#ddecf8" }}
                        />


                        <Text style={{ fontSize: 22, marginBottom: 20 }}>  Create a new Displacement</Text>

                        <View>
                            <Text style={styles.textStyle} >
                                Type
                </Text>
                            <View style={styles.list}>
                                <Picker
                                    selectedValue={this.state.type}
                                    style={{ height: 50, width: 300 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ type: itemValue })
                                    }>
                                    <Picker.Item label="Local" value="Local" />
                                    <Picker.Item label="Abroad" value="Abroad" />
                                </Picker>
                            </View>
                        </View>


                        <View>
                            <Text style={styles.textStyle} >
                                Conductor
                </Text>
                            <View style={styles.list}>
                                <Picker
                                    selectedValue={this.state.conductor}
                                    style={{ height: 50, width: 300 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ conductor: itemValue })
                                    }>
                                    <Picker.Item label="aaaa" value="aaaa" />
                                    <Picker.Item label="bbbb" value="bbbb" />
                                    <Picker.Item label="cccc" value="cccc" />
                                </Picker>
                            </View>
                        </View>


                        <View>
                            <Text style={{ left: 10, top: -5 }}>
                                From
                  </Text>
                            <DatePicker
                                style={{ width: 300 }}
                                date={this.state.dateB}
                                mode="date"
                                iconSource={dateIcon}
                                placeholder="Select date"
                                format="DD-MM-YYYY"
                                minDate="01-01-2019"
                                maxDate="31-12-2019"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ dateB: date }) }}
                            />
                            <DatePicker
                                style={{ width: 300, top: 10 }}
                                date={this.state.timeB}
                                placeholder="Select time"
                                iconSource={timeIcon}
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={10}
                                headerBackground="red"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                    }
                                }}
                                onDateChange={(time) => { this.setState({ timeB: time }); }}
                            />
                        </View>
                        <View>
                            <Text style={{ left: 10, top: 20 }}>
                                To
                             </Text>
                            <DatePicker
                                style={{ width: 300, top: 25 }}
                                date={this.state.dateE}
                                mode="date"
                                iconSource={dateIcon}
                                placeholder="Select date"
                                format="DD-MM-YYYY"
                                minDate="01-01-2019"
                                maxDate="31-12-2019"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ dateE: date }) }}
                            />
                            <DatePicker
                                style={{ width: 300, top: 40, marginBottom: 60 }}
                                date={this.state.timeE}
                                placeholder="Select time"
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={10}
                                iconSource={timeIcon}

                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                    }
                                }}
                                onDateChange={(time) => { this.setState({ timeE: time }); }}
                            />
                        </View>



                        <View>
                            <Text style={styles.textStyle} >
                                Type
                </Text>
                            <View style={styles.list}>
                                <Picker
                                    selectedValue={this.state.type2}
                                    style={{ height: 50, width: 300 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ type2: itemValue })
                                    }>
                                    <Picker.Item label="Administration" value="Administration" />
                                    <Picker.Item label="Customer" value="Customer" />
                                    <Picker.Item label="Business development" value="Business development" />
                                    <Picker.Item label="Visa" value="Visa" />
                                    <Picker.Item label="Other" value="Other" />
                                </Picker>
                            </View>


                            <View>
                                <Text style={styles.textStyle} >Destination adress</Text>
                                <Textarea
                                    style={styles.textareaContainer}
                                    onChangeText={this.onChange}
                                    defaultValue={this.state.text}
                                    placeholderTextColor={'black'}
                                />
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 50 , left:30}}>
                            <Button  light style={{ width: 150, marginRight: 20, top: 10, width: 140, backgroundColor: '#55B285' }}>
                                <Text style={{color:'white', left:35}}>Save</Text>
                            </Button>
                            <Button  light style={{ width: 150, marginRight: 20, top: 10, width: 140, backgroundColor: '#E05353' , }}>
                                <Text style={{color:'white' , left:30}} >Cancel</Text>
                            </Button>
                        </View>

                    </Card>
                </Content>
                <Footer style={{ backgroundColor: '#072F88' }}>
                    <FooterTab style={{ backgroundColor: '#072F88', }} >

                        <Button vertical style={{ backgroundColor: '#072F88', height: 50 }} >
                            <Icon name="md-log-out" style={{ color: 'white' }} />
                        </Button>
                        <Button vertical style={{ backgroundColor: '#072F88', height: 50 }} 
                        onPress={() =>this.props.navigation.navigate('Settings')}>
                            <Icon name="settings" style={{ color: 'white' }} />
                        </Button>
                        <Button active badge vertical style={{ backgroundColor: '#072F88', height: 50 }} >
                            <Badge><Text>7</Text></Badge>
                            <Icon active name="md-chatbubbles" />
                        </Button>
                        <Button active badge vertical style={{ backgroundColor: '#072F88', height: 50 }} >
                            <Badge><Text>2</Text></Badge>
                            <Icon active name="md-notifications" />
                        </Button>

                    </FooterTab>
                </Footer>
            </Container>

        )
    }
}

const styles = StyleSheet.create({

    list: {
        borderWidth: 1,
        width: 300,
        alignItems: 'center',
        borderColor: 'black',
        margin: 15

    },
    textStyle: {
        left: 18
    },
    textareaContainer: {
        borderWidth: 1,
        width: 300,
        height: 40,
        borderColor: 'gray',
        marginTop: 10,
        left: 15,
    },
}
)