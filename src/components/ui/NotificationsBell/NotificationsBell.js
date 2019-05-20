import React from 'react';
import { Text, View, Badge, Icon } from 'native-base';
import axios from "axios";

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
    setInterval(() => {
      this.fetchNotifications();
    }, 10000);
  }

  render() {
    return (
      <View style={{ position: 'absolute', right: 20, top: 5 }}>
        <Badge style={{ top: 5, right: -10, zIndex: 1 }}>
          {this.state.notifs.length > 0 && <Text>{this.state.notifs.length}</Text>}
        </Badge>
        <Icon active name="md-notifications" style={{ color: this.props.theme.fontColor , top: -15 }} />
      </View>
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

  }
}

const mapDispatchToProps = dispatch => ({
  getNotifications() { dispatch(getNotifications()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsBell);



