import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  View,
  Picker,
  Icon
} from 'native-base';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map, split } from 'lodash';
import { getRequests } from './actions';

import AppHeader from '../../ui/AppHeader';
import CustumPicker from '../../../components/ui/CustomPicker/CustumPicker'

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      year: 'All years',
      status: 'All status',
      category: 'All categories',
      languageSelected: 'English'

    }

  };

  componentDidMount() {
    this.props.getRequests();
  }

  render() {


    return (
      <Container style={{ backgroundColor: this.props.theme.backgroundColor }} >
        <AppHeader title="History" navigation={this.props.navigation} />

        <View>

          <CustumPicker>
            <Picker
              selectedValue={this.state.year}
              style={{
                height: 50, width: 300, color: this.props.theme.fontColor,
              }}

              onValueChange={(itemValue, itemIndex) =>
                this.setState({ year: itemValue })
              }>
              <Picker.Item label="All years" value="All years" />
              <Picker.Item label="2019" value="2018" />
              <Picker.Item label="2017" value="2017" />

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
              <Picker.Item label="All status" value="All status" />
              <Picker.Item label="On hold" value="Waiting" />
              <Picker.Item label="Accepted" value="Accepted" />
              <Picker.Item label="Declined" value="Declined" />
              <Picker.Item label="Canceled" value="Canceled" />
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
            <Picker.Item label="All categories" value="All" />
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

          <Button style={{ width: 340, flexDirection: 'row', backgroundColor: '#0E6655', borderRadius: 0, marginTop: 2 , left:-20 }}>
            <Icon name="md-done-all" style={{ color: this.props.theme.backgroundColor, left: 15 }}></Icon>
            <Text style={{ left: -200 }}>FILTER</Text>
          </Button>
        </CustumPicker>
        <Content>
          {
            this.props.requestsList && this.props.requestsList.length > 0 &&
            <FlatList
              // ItemSeparatorComponent={Platform.OS !== 'android' && ({highlighted}) => (
              //   <View style={[style.separator, highlighted && {marginLeft: 0}]} />
              // )}
              // onScroll={this.handleLazyLoading}

              scrollEventThrottle={2}
              data={this.props.requestsList}
              renderItem={({ item }) => (
                <Card style={{ ...styles.cardStyle, backgroundColor: this.props.theme.cardBackground, borderColor: this.props.theme.cardBackground }}>
                  <View style={{ flex: 5, justifyContent: 'space-between' }}>
                    <Text style={{ color: this.props.theme.fontColor, fontWeight: 'bold' }}>
                      Status : {item.status}
                    </Text>

                  </View>

                </Card>
              )}
            />
          }
        </Content>

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
    requestsList: state.historyReducer.requestsList,
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
  }
}

const mapDispatchToProps = dispatch => ({
  getRequests(filters) { dispatch(getRequests(filters)) },
  getAvatar() { dispatch(getAvatar()) }

});


export default connect(mapStateToProps, mapDispatchToProps)(History);