import React from 'react';
import { StatusBar, StyleSheet, View, Text, Picker } from 'react-native';
import { Container, Icon, Title, Content, Card, Header } from 'native-base';
import { Button } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
import Textarea from 'react-native-textarea';
import timeIcon from '../../../assets/img/Time.png'
import dateIcon from '../../../assets/img/date.png'

export default class Events extends React.Component {
    constructor() {
        super();
        this.state = {
            PickerValue: ''
        }

    };
    render() {
        return (
            <Container style={{ backgroundColor: '#DDE3F3' }} >
                <StatusBar hidden />

                <Header style={{ backgroundColor: '#052D8F', flexDirection: 'row' }}
                >

                    <Icon name='md-menu' style={{
                        color: 'white', position: 'absolute',
                        left: 20, top: 10
                    }}
                        onPress={() => alert('menu')}
                    />

                    <Title style={{ top: 15 }}>New request</Title>

                    <Icon name='md-menu' style={{
                        color: 'white', position: 'absolute',
                        right: 20, top: 10
                    }}
                        onPress={() => alert('home')}
                    />

                </Header>
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
                            <Text style={{ top: -5, left: 5 }}>
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
                            <Text style={{ left: 5, top: 20 }}>
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
                                style={{ width: 300, top: 40 }}
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
                        <View > 
                            <Text style={{ top: 60, left: 5 }}> Notif </Text>
                            <Textarea
                                style={styles.textareaContainer}
                                onChangeText={this.onChange}
                                defaultValue={this.state.text}
                                placeholderTextColor={'black'}
                            />

                        </View>
                        <View style={styles.buttonPos}>
                                <Button
                                    buttonStyle={{ width: 150, marginBottom: 30, marginRight: 20, top: 10, width: 140, backgroundColor: '#052D8F' }}
                                    title="Save"
                                    onPress={() => [this.props.navigation.navigate(''), alert('Request sent')]}
                                />
                                <Button
                                    buttonStyle={{ width: 150, marginBottom: 30, top: 10, width: 140, backgroundColor: '#CA2626' }}
                                    title="Cancel"
                                    onPress={() => this.props.navigation.navigate('')} 
                                />

                        </View>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        height: 575,
        padding: 15,
        alignItems: 'center',
    },
    buttonPos: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5,
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
        height: 80,
        position: 'relative',
        top: 70,
        borderColor: 'gray'
    },
    DatePicker: {
        padding: 10,
    }
});