import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Dimensions } from 'react-native';
import { Icon, Content, Container } from 'native-base'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Button } from 'react-native-elements'
import leaveIcon from '../../../assets/img/leaveIcon.png'
import ActionButton from 'react-native-circular-action-menu';
import { connect } from 'react-redux';


import { getHolidays } from '../holidaysManagement/actions';

var width = Dimensions.get('window').width;

class Leaves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Leave', 'Days allowed'],
    }
  }

  componentDidMount() {
    this.props.getHolidays();
  }

  render() {
    const state = this.state;

    return (
      <Container style={{ ...styles.container, backgroundColor: this.props.theme.backgroundColor }}>
        <Content>

          <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row data={state.tableHead} widthArr={state.widthArr} style={{ height: 50, backgroundColor: this.props.theme.calendar.headerColor, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} textStyle={{ ...styles.text, color: 'white' }} />
          </Table>
          {this.props.holidays && this.props.holidays.length > 0 && <Table borderStyle={{ borderColor: 'transparent' }} style={{ marginBottom: 100 }}>
            {
              this.props.holidays.map((holiday, index) => (
                <Row
                  key={index}
                  data={[holiday.title, holiday.days]}
                  widthArr={state.widthArr}
                  style={[{ height: 50, backgroundColor: this.props.theme.calendar.c1 }, index % 2 && { backgroundColor: this.props.theme.calendar.c2 }]}
                  textStyle={{ ...styles.text, color: this.props.theme.fontColor }}
                />
              ))
            }
          </Table>}

          <ActionButton
            buttonColor="transparent"
            btnOutRange="transparent"
            icon={<Icon name='md-arrow-dropup' style={styles.ButtonIcon} />}
            degrees={180}
            size={40}
            radius={50}
          // outRangeScale={0.5}       
          >


            <ActionButton.Item
              buttonColor='#53C6B1'
              title="new request"
              onPress={() => this.props.navigation.navigate('New request')}>
              <Icon
                name="md-add"
                style={styles.actionButtonIcon}

              />

            </ActionButton.Item>

            <ActionButton.Item
              buttonColor='#9AAE81'
              title="history"
              onPress={() => this.props.navigation.navigate('Leave history')}>
              <Icon
                name="md-information"
                style={styles.actionButtonIcon}

              />
            </ActionButton.Item>

          </ActionButton>
        </Content>
      </Container>

    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'white' },
  header: { height: 50, backgroundColor: '#4470B2', borderTopRightRadius: 20, borderTopLeftRadius: 20 },
  headerText: { textAlign: 'center', fontWeight: 'bold', color: 'white' },
  text: { color: 'black', textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#ECECEC' },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  ButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#4470B2',
  },
});


const mapStateToProps = state => {
  return {
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
    holidays: state.holidaysReducer.holidays && state.holidaysReducer.holidays.length > 0 ? state.holidaysReducer.holidays.filter(item => item.category === 'holidays') : state.holidaysReducer.holidays
  }
}

const mapDispatchToProps = dispatch => ({
  getHolidays() { dispatch(getHolidays()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaves);
