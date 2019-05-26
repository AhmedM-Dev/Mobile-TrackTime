import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Content, Container, Icon } from 'native-base';
import ActionButton from 'react-native-circular-action-menu';

export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Name', 'Date', 'Days',],
    }
  }

  render() {
    const state = this.state;
    const tableData = [
      ['Christmas', '01-01', '1'],
      ['Feast of the revolution', '14-01', '1'],
      ['Independence Day', '20-03', '1'],
      ['Labor Day', '01-05', '1'],
      ['Feast of the republic', '25-07', '1'],
      ["Woman's day", '13-08', '1'],
    ]

    return (
      <Container style={styles.container}>
        <Content>
          <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.headerText} />
          </Table>
          <Table borderStyle={{ borderColor: '#ECECEC' }} style={{ marginBottom: 100 }}>
            {
              tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={state.widthArr}
                  style={[styles.row, index % 2 && { backgroundColor: '#D3D2D2' }]}
                  textStyle={styles.text}
                />
              ))
            }
          </Table>

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
              buttonColor='#A23B81'
              title="menu"
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon
                name="md-menu"
                style={styles.actionButtonIcon}

              />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#3B76A2'
              title="home"
              onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Icon
                name="md-home"
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
  header: { height: 50, backgroundColor: '#2CA96E', borderTopRightRadius: 20, borderTopLeftRadius: 20 },
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
    color: '#2CA96E',
  },
});