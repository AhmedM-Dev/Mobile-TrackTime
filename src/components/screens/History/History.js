import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  View,
  Picker,
  Icon,
  List,
  ListItem,
  Body, Right
} from 'native-base';
import ActionButton from 'react-native-circular-action-menu';
import style from '../NewRequest/styles';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startCase, toLower } from 'lodash';
import { getRequests } from './actions';

import AppHeader from '../../ui/AppHeader';
import CustumPicker from '../../../components/ui/CustomPicker/CustumPicker'

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      year: null,
      status: 'all',
      category: 'all',
      languageSelected: 'English'
    }
  };

  componentDidMount() {
    this.props.getRequests({});
  }

  handleFilter = () => {
    this.props.getRequests({
      year: this.state.year || null,
      status: this.state.status === 'all' ? null : this.state.status,
      category: this.state.category === 'all' ? null : this.state.category
    });
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value })
  }

  handleClear = () => {
    this.setState({
      year: null,
      status: 'all',
      category: 'all',
      languageSelected: 'English'
    });
  }

  render() {
    return (
      <Container style={{ backgroundColor: this.props.theme.backgroundColor }} >
        <AppHeader title="History" navigation={this.props.navigation} />

        <View style={{ marginTop: 10 }}>

          <CustumPicker>
            <Picker
              selectedValue={this.state.year}
              style={{
                height: 50, width: 300, color: this.props.theme.fontColor,
              }}

              onValueChange={(itemValue, itemIndex) =>
                this.setState({ year: itemValue })
              }>
              <Picker.Item label="All years" value="all" />
              <Picker.Item label="2019" value="2019" />
              <Picker.Item label="2018" value="2018" />
              <Picker.Item label="2017" value="2017" />
              <Picker.Item label="2016" value="2016" />

            </Picker>
          </CustumPicker>

        </View>
        <View>
          <CustumPicker>
            <Picker
              selectedValue={this.state.status}
              style={{
                height: 50, width: 300, color: this.props.theme.fontColor,
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ status: itemValue })
              }>
              <Picker.Item label="All status" value="all" />
              <Picker.Item label="On hold" value="pending" />
              <Picker.Item label="Accepted" value="accepted" />
              <Picker.Item label="Declined" value="rejected" />
              <Picker.Item label="Canceled" value="canceled" />
            </Picker>
          </CustumPicker>
        </View>

        <CustumPicker>

          <Picker
            selectedValue={this.state.category}
            style={{ height: 50, width: 300, color: this.props.theme.fontColor, borderRadius: 20 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ category: itemValue })
            }>
            <Picker.Item label="All categories" value="all" />
            <Picker.Item label="Paid leave" value="Paid leave" />
            <Picker.Item label="Additional days" value="Additional days" />
            <Picker.Item label="Unpaid leave" value="Unpaid leave" />
            <Picker.Item label="Sick leave" value="Sick leave" />
            <Picker.Item label="Paternity leave" value="Paternity leave" />
            <Picker.Item label="Maternity leave" value="Maternity leave" />
            <Picker.Item label="Wedding leave" value="Wedding leave" />
            <Picker.Item label="Son's circumcision " value="Son's circumcision " />
            <Picker.Item label="Son's/Daughter's wedding" value="Son's/Daughter's wedding" />
            <Picker.Item label="Spouse's death" value="Spouse's death" />
            <Picker.Item label="Mother's/Father's death" value="Mother's/Father's death" />
            <Picker.Item label="Son's/Daughter's death" value="Son's/Daughter's death" />
            <Picker.Item label="Brother's/Sister's death" value="Brother's/Sister's death" />
            <Picker.Item label="Grandfather's/Grandmother's death" value="Grandfather's/Grandmother's death" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

        </CustumPicker>
        <Content>
          <List style={{ backgroundColor: this.props.theme.notif, width: '100%', }} >
            {
              this.props.history && this.props.history.length > 0 ? this.props.history.map(request => {
                return (
                  <ListItem style={{ backgroundColor: this.props.theme.backgroundColor, marginLeft: 0, paddingLeft: 15, borderBottomWidth: 0.5 }} thumbnail>
                    <Body style={{ borderBottomWidth: 0 }}>
                      <Text style={{ color: this.props.theme.fontColor, fontSize: 12, fontWeight: 'bold' }}>
                        {request.requestCategory === 'LEAVE' ? startCase(toLower(request.leaveCategory)) : startCase(toLower(request.requestCategory))} Request
                      </Text>
                      <Text note style={{ color: this.props.theme.fontColor, fontSize: 10, includeFontPadding: true, paddingLeft: 10 }}>
                        {request.motif || (request.attendance && request.attendance.date && `Correction request for ${moment(request.attendance.date).format('dddd DD MMMM YYYY')}.\n`)}
                      </Text>
                      <Text note numberOfLines={1} style={{ color: this.props.theme.fontColor, fontSize: 10 }}>
                        Created at: {request.createdAt}
                      </Text>
                    </Body>
                    <Right>
                      {request.status === "accepted" && <Text style={{ color: 'green' }}>Accepted</Text>}
                      {request.status === "canceled" && <Text style={{ color: 'orange' }}>Canceled</Text>}
                      {request.status === "rejected" && <Text style={{ color: 'red' }}>Declined</Text>}
                      {request.status === "pending" && <Text style={{ color: 'brown' }}>On Hold</Text>}
                    </Right>
                  </ListItem>
                )
              })
                :
                <View style={{ padding: 10 }}>
                  <Text>No data.</Text>
                </View>
            }
          </List>
        </Content>
        <ActionButton
          buttonColor={this.props.theme.cardBackground}
          btnOutRange={this.props.theme.cardBackground}
          icon={<Icon name='md-arrow-dropup' style={style.ButtonIcon} />}
          degrees={135}
          size={40}
          radius={50}
          position="right"
          outRangeScale={0.5}
        >

          <ActionButton.Item
            buttonColor='green'
            title="Save"
            onPress={this.handleFilter}
          >
            <Icon
              name="md-done-all"
              style={style.actionButtonIcon}

            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor='red'
            title="Reset"
            onPress={this.handleClear}
          >
            <Icon
              name="md-refresh"
              style={style.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    );
  }
}


const styles = StyleSheet.create({

  textStyle: {
    left: 18
  },
  cardStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 230,
    padding: 15,
    borderRadius: 10
  },
}
)
const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    user: state.authReducer.user,
    history: state.historyReducer.history,
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
  }
}

const mapDispatchToProps = dispatch => ({
  getRequests(filters) { dispatch(getRequests(filters)) },
  getAvatar() { dispatch(getAvatar()) }

});


export default connect(mapStateToProps, mapDispatchToProps)(History);
