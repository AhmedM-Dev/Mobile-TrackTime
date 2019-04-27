import React from 'react';
import { Text, View, Badge, Icon } from 'native-base';
import axios from "axios";

import { API_URL } from "../../../../config";

export default class NotificationsBell extends React.Component {

    state = {
        notifs: []
    };

    fetchNotifications = () => {
        axios.get(`${API_URL}notifications?userId=${this.props.userId}`)
            .then(response => {
                this.setState({
                    notifs: response.data.notifications
                });
            })
            .catch(error => this.setState({
                notifs: []
            })
        );
    }

    componentDidMount() {
        setInterval(() => {
            this.fetchNotifications();
        }, 10000);
    }

    render () {
        return (
            <View style={{ position: 'absolute', right: 20, top: 5 }}>
                <Badge style={{ top: 10, right: -10, zIndex: 1 }}>
                    {this.state.notifs.length > 0 && <Text>{this.state.notifs.length}</Text>}
                </Badge>
                <Icon active name="md-notifications" style={{ color: 'white', top: -10 }} />
            </View>
        );
    }
}