
import React from 'react';
import {
  StatusBar, TextInput, ActivityIndicator, Alert
} from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Picker,
  Icon,
  Radio,
  List,
  ListItem, Thumbnail, Left, Body, Right, Button
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import ActionButton from 'react-native-circular-action-menu';
import Textarea from 'react-native-textarea';
import moment from 'moment';
import { camelCase } from 'lodash';

import { getRequests, cancelRequest } from '../../../store/actions';

import styles from './styles';

const initialState = {
  dateFrom: null,
  sessionFrom: 1,
  dateTo: null,
  sessionTo: 2,
  leaveCategory: 'Authorization',
  requestCategory: 'AUTHORIZATION',
  motif: ''
}

class Requests extends React.Component {

  state = initialState;

  componentDidMount() {
    this.props.getRequests({ status: 'pending' });
  }

  handleCancelRequest = (requestId) => {
    if (requestId) {
      this.props.cancelRequest({ requestId, status: 'canceled' });
    }
  }

  handleSendCancelRequest = (requestId) => {
    Alert.alert(
      'Cancel Request',
      'Are you sure to cancel this request ?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
        { text: 'Yes', onPress: () => this.handleCancelRequest(requestId) }
      ],
      { cancelable: true },
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: this.props.theme.backgroundColor }} >
        <StatusBar hidden />
        <Content>
          <List style={{ backgroundColor: this.props.theme.notif, width: '100%', }} >
            {
              this.props.requests && this.props.requests.length > 0 ? this.props.requests.map(request => {
                return (
                  <ListItem style={{ backgroundColor: this.props.theme.backgroundColor, marginLeft: 0, paddingLeft: 15, borderBottomWidth: 0.5 }} thumbnail>
                    <Body style={{ borderBottomWidth: 0 }}>
                      <Text style={{ color: this.props.theme.fontColor, fontSize: 12, fontWeight: 'bold' }}>
                        {camelCase(request.requestCategory)} Request
                      </Text>
                      <Text note style={{ color: this.props.theme.fontColor, fontSize: 10, includeFontPadding: true, paddingLeft: 10 }}>
                        {request.motif}
                      </Text>
                      <Text note numberOfLines={1} style={{ color: this.props.theme.fontColor, fontSize: 10 }}>
                        Created at: {request.createdAt}
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent onPress={() => this.handleSendCancelRequest(request.requestId)}>
                        <Text>Cancel</Text>
                      </Button>
                    </Right>
                  </ListItem>
                )
              }) : <Text>No pending requests available.</Text>
            }
          </List>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    requests: state.requestsReducer.requests,
    theme: state.settingsReducer.theme
  }
}

const mapDispatchToProps = dispatch => ({
  getRequests(payload) { dispatch(getRequests(payload)) },
  cancelRequest(requestId) { dispatch(cancelRequest(requestId)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
