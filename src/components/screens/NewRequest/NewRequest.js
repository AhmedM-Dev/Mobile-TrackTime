import React from 'react';
import { StatusBar, Image, StyleSheet, View, Text, Picker } from 'react-native';
import { Container, Header, Content, Card, Row } from 'native-base';
import DatePicker from 'react-native-datepicker';
import Textarea from 'react-native-textarea';
import timeIcon from '../../../assets/img/time.png'
export default class Events extends React.Component {
    constructor() {
        super();
        this.state = {
            PickerValue: ''

        }

    };
    render() {
        return (
            <Container >
                <StatusBar hidden />

                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'New request', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

                <Content>

                    <Card style={styles.cardStyle}>

                        <View>
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

                        </View>


                        <View>
                            <Text  >
                                from
                  </Text>


                            <DatePicker
                                style={{ width: 300 }}
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
                                style={{ width: 300, marginTop: 10 }}
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
                            <Text  >
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

                            <Text style={styles.notifPos}> Notif </Text>
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
        height: 570,
        padding: 15,
        alignItems: 'center',

    },

    buttonPos: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10
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
        borderColor: '#CA6464'
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
        top: 35
    },

    notifPos: {
        position: 'relative',
        top: 30
    },

    DatePicker: {
        padding: 10,
    }

});