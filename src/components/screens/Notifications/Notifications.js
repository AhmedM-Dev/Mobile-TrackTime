import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, View } from 'native-base';
import PropTypes from 'prop-types';
import { Image } from 'react-native'
import { connect } from 'react-redux';
import { TouchableHighlight } from 'react-native-gesture-handler';

import leaveIcon from '../../../assets/img/leave.png'
import clockIcon from '../../../assets/img/clock.png'
import travelIcon from '../../../assets/img/travel.png'
import eventIcon from '../../../assets/img/event.png'
import infosIcon from '../../../assets/img/details.png'
import delaysIcon from '../../../assets/img/a.png'


const initialState = {
    goTo: {
        to: null,
        data: null
    }
};

class Notifications extends Component {

    state = initialState;

    handleGoTo = (goTo) => {
        if (goTo.category === 'EVENT') {
            this.props.navigation.navigate('Events', { eventId: 'eventtttt' });
        } else {
            this.setState({
                goTo
            });
        }
    }

    getLogo = (category) => {
        switch (category) {
            case 'EVENT': return eventIcon;
            case 'TRAVEL': return travelIcon;
            case 'INFO': return infosIcon;
            case 'LEAVEREQUEST': return leaveIcon;
            case 'ATTENDANCEREQUEST': return clockIcon;
            case 'DELAY' || 'ABSENCE': return delaysIcon;

        }
    }

    render() {
        console.log()

        if (this.state.goTo.to && this.state.goTo.category !== 'EVENT') {
            return (
                <Container style={{ backgroundColor: this.props.theme.backgroundColor }}>

                    <Icon
                        name="md-arrow-dropleft"
                        onPress={() => this.handleGoTo(initialState)}
                        style={{ color: this.props.theme.fontColor, margin: 20 }}> </Icon>
                    <View style={{ backgroundColor: this.props.theme.cardBackground, width: 340, width: 340, alignSelf: 'center', borderRadius: 20, padding: 20 }}>
                        <Text style={{ color: this.props.theme.fontColor }}> Employee : </Text>
                        <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > Category : </Text>
                        <Text style={{ color: this.props.theme.fontColor }} > From : </Text>
                        <Text style={{ color: this.props.theme.fontColor, marginBottom: 10, marginTop: 10 }} > To : </Text>
                        <Text style={{ color: this.props.theme.fontColor }} > Motif : </Text>
                        {/* <Text>{this.state.goTo.data}</Text> */}

                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 50 }}>
                        <Button style={{ backgroundColor: 'green', marginRight: 20 }} ><Text> Accept</Text></Button>
                        <Button style={{ backgroundColor: 'red' }} ><Text> Refuse</Text></Button>
                    </View>
                </Container>
            )
        } else
            return (
                <Container style={{ backgroundColor: this.props.theme.backgroundColor }} >
                    <Header style={{ backgroundColor: this.props.theme.backgroundColor, flexDirection: 'row', }}>
                        <Icon name='md-menu' style={{
                            color: this.props.theme.fontColor, position: 'absolute',
                            left: 20, top: 15
                        }}
                            onPress={() => this.props.navigation.openDrawer()}
                        />
                        <Title style={{ top: 15, color: this.props.theme.fontColor, marginRight: 130, marginLeft: 40 }}>Notifications</Title>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Settings')} style={{
                            borderRadius: 100,
                            height: 30,
                            width: 30,
                            marginRight: 15,
                            top: 15,
                        }}>
                            <Image source={{ uri: this.props.avatar && this.props.avatar.photo }} style={{
                                borderRadius: 100,
                                height: 30,
                                width: 30,
                                borderWidth: 1,
                                borderColor: this.props.theme.fontColor
                            }}></Image>
                        </TouchableHighlight>
                    </Header>
                    <Content>

                        <List style={{ backgroundColor: this.props.theme.backgroundColor, }} >

                            {
                                this.props.notifications.length > 0 && this.props.notifications.map(notif => {
                                    return (
                                        <ListItem thumbnail>
                                            <Left>
                                                <Thumbnail square source={this.getLogo(notif.category)} />
                                            </Left>
                                            <Body>
                                                <Text style={{ color: this.props.theme.fontColor }}>{notif.title}</Text>
                                                <Text note numberOfLines={1} style={{ color: this.props.theme.fontColor }}>{notif.content && notif.content.substring(0, 30)}...</Text>
                                            </Body>
                                            <Right>
                                                <Button transparent onPress={() => this.handleGoTo({ to: 'info', data: 'jsdjfhjsdfhjh', category: notif.category, eventId: notif.category === 'EVENT' })}>
                                                    <Text>View</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>

                                    )

                                })
                            }

                        </List>
                    </Content>
                </Container>
            );
    }
}


Notifications.propTypes = {
    theme: PropTypes.object
};


const mapStateToProps = state => {
    return {
        notifications: state.notificationsReducer.notifications,
        theme: state.settingsReducer.theme,
        avatar: state.authReducer.avatar,
    }
}

export default connect(mapStateToProps)(Notifications);