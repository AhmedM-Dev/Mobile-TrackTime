import React from 'react';
import { Text, View, Badge, Icon, Button } from 'native-base';
import axios from "axios";

import { getNotifications } from './actions';

import { API_URL } from "../../../../config";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class NotificationsBell extends React.Component {

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
    this.props.getNotifications();
    setInterval(() => {
      this.props.getNotifications();
    }, 10000);
  }

  render() {
    return (
      <Button transparent onPress={() => this.props.navigation.navigate('Notifications')}  >
        {this.props.notifications && this.props.user && this.props.notifications.filter(notif => !notif.vues.includes(this.props.user.userId)).length > 0 && <Badge style={{ position: 'absolute', zIndex: 1, right: 0 }}>
          <Text>{this.props.notifications.filter(notif => !notif.vues.includes(this.props.user.userId)).length}</Text>
        </Badge>}
        <Icon active name="md-notifications" style={{ color: this.props.theme.fontColor, fontSize: 32 , }} />
      </Button>
    );
  }
}

NotificationsBell.propTypes = {
  theme: PropTypes.object
};

const mapStateToProps = state => {
  return {
    notifications: state.notificationsReducer.notifications,
    theme: state.settingsReducer.theme,
    user: state.authReducer.user
  }
}

const mapDispatchToProps = dispatch => ({
  getNotifications() { dispatch(getNotifications()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);



