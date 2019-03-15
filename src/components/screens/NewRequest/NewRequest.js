import React from 'react';
import { StatusBar, Image, StyleSheet, View, Text, Picker } from 'react-native';
import { Container, Content, Card, Row, ActionSheet, ContentText, Button, Form, Icon, Item } from 'native-base';

import DatePicker from 'react-native-datepicker';
import Textarea from 'react-native-textarea';
import timeIcon from '../../../assets/img/time.png'
import menuIcon from '../../../assets/img/menu.png'
import homeIcon from '../../../assets/img/home.png'
import { Header } from 'react-native-elements';
import { red } from 'ansi-colors';


export default class Events extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         PickerValue: ''

    //     }

    // };

    constructor(props) {
        super(props);
        this.state = {
            selected2: undefined
        };
    }
    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    render() {
        return (
            <Container  style={{ backgroundColor: '#DDE3F3' }} >
                <StatusBar hidden />


                <Header
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff',
                        onPress: () => alert('menu')
                    }
                    }

                    centerComponent={{
                        text: 'New request',
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

                    <Card style={styles.cardStyle}>

                        {/* <View>
                            <Text style={styles.categoryStyle} >
                                Category
                  </Text>
                            <View style={styles.autorisationList}>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={{ height: 50, width: 300 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ language: itemValue })
                                    }>
                                    <Picker.Item label="Paid leave" value="Paid leave" />
                                    <Picker.Item label="Additional days" value="Additional days" />
                                    <Picker.Item label="Unpaid leave" value="Unpaid leave" />
                                    <Picker.Item label="Sick leave" value="Sick leave" />
                                    <Picker.Item label="Paternity leave" value="Paternity leave" />
                                    <Picker.Item label="Maternity leave" value="Maternity leave" />
                                    <Picker.Item label="Wedding leave" value="Wedding" />
                                    <Picker.Item label="Son's circumcision " value="circumcision " />
                                    <Picker.Item label="Son's/Daughter's wedding" value="wedding" />
                                    <Picker.Item label="Spouse's death" value="death" />
                                    <Picker.Item label="Mother's/Father's death" value="death" />
                                    <Picker.Item label="Son's/Daughter's death" value="death" />
                                    <Picker.Item label="Brother's/Sister's death" value="death" />
                                    <Picker.Item label="Grandfather's/Grandmother's death" value="death" />
                                    <Picker.Item label="Other" value="Other" />

                                </Picker>
                            </View>

                        </View> */}

                        <Content >

                        <Text style={styles.categoryStyle} >
                                Category
                  </Text>

                            <Form>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        style={{ width: 300 }}
                                        placeholder="Select your SIM"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected2}
                                        onValueChange={this.onValueChange2.bind(this)}>

                                         <Picker.Item label="Paid leave" value="Paid leave" />
                                    <Picker.Item label="Additional days" value="Additional days" />
                                    <Picker.Item label="Unpaid leave" value="Unpaid leave" />
                                    <Picker.Item label="Sick leave" value="Sick leave" />
                                    <Picker.Item label="Paternity leave" value="Paternity leave" />
                                    <Picker.Item label="Maternity leave" value="Maternity leave" />
                                    <Picker.Item label="Wedding leave" value="Wedding" />
                                    <Picker.Item label="Son's circumcision " value="circumcision " />
                                    <Picker.Item label="Son's/Daughter's wedding" value="wedding" />
                                    <Picker.Item label="Spouse's death" value="death" />
                                    <Picker.Item label="Mother's/Father's death" value="death" />
                                    <Picker.Item label="Son's/Daughter's death" value="death" />
                                    <Picker.Item label="Brother's/Sister's death" value="death" />
                                    <Picker.Item label="Grandfather's/Grandmother's death" value="death" />
                                    <Picker.Item label="Other" value="Other" />
                                    </Picker>
                                </Item>
                            </Form>

                        </Content>

                        <View>
                            <Text  style={{ top:-20 , left:20}}>
                                from
                  </Text>
                            <DatePicker
                                style={{ width: 300 , top:-15 }}
                                date={this.state.dateB}
                                mode="date"
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
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { this.setState({ dateB: date }) }}
                            />

                            <DatePicker
                                style={{ width: 300 , top:-5 }}
                                date={this.state.timeB}
                                placeholder="Select time"
                                iconSource={timeIcon}
                                mode="time"
                                format="HH:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={10}

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
                            <Text  style={{left:20 , top:5 } }>
                                To
                  </Text>


                            <DatePicker
                                style={{ width: 300, marginTop: 10 }}
                                date={this.state.dateE}
                                mode="date"
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
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { this.setState({ dateE: date }) }}
                            />

                            <DatePicker
                                style={{ width: 300, marginTop: 10 }}
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

                            <Text style={{top:25,left:20}}> Notif </Text>
                            <Textarea
                                style={styles.textareaContainer}
                                onChangeText={this.onChange}
                                defaultValue={this.state.text}
                                placeholderTextColor={'black'}
                            />

                        </View>

                        <View style={styles.buttonPos}>

                            <Text style={[styles.buttonText, styles.saveStyle]}
                                onPress={() => [this.props.navigation.navigate(''), alert('Request sent')]} >
                                Save
                             </Text>

                            <Text style={[styles.buttonText, styles.cancelStyle]}
                                onPress={() => this.props.navigation.navigate('')} >
                                Cancel
                             </Text>
                        </View>

                    </Card>

                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({


    cardStyle: {
        height: 550,
        padding: 15,
        alignItems: 'center',

    },

    buttonPos: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -10,
    },
    buttonText: {
        margin: 20,
        borderWidth: 1,
        width: 100,
        height: 50,
        color: 'white',
        paddingTop: 15,
        borderRadius: 20,
    },

    saveStyle: {
        paddingLeft: 35,
        backgroundColor: '#009688',
        borderColor: '#009688'
    },
    cancelStyle: {
        paddingLeft: 30,
        backgroundColor: '#CA6464',
        borderColor: '#CA6464',
    },
    autorisationList: {
        borderWidth: 1,
        width: 300,

        alignItems: 'center',
        borderColor: 'black',
        margin: 15

    },
    categoryStyle: {
        left: 18
    },

    textareaContainer: {
        borderWidth: 1,
        width: 300,
        height: 60,
        position: 'relative',
        top: 35,
        borderColor:'gray'
    },

   
    DatePicker: {
        padding: 10,
    }

});