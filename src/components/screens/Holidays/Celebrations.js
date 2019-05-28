import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Content, Container, Icon } from 'native-base';
import { connect } from 'react-redux';

class Celebrations extends Component {
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
      <Container style={{...styles.container , backgroundColor:this.props.theme.backgroundColor}}>
        <Content>
          <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row data={state.tableHead} widthArr={state.widthArr} style={{ height: 50, backgroundColor: this.props.theme.calendar.headerColor , borderTopLeftRadius:20, borderTopRightRadius:20 }} textStyle={{ ...styles.text, color: 'white' }} />
          </Table>
          <Table borderStyle={{ borderColor: 'transparent' }} style={{ marginBottom: 100 }}>
            {
              tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={state.widthArr}
                  style={[ {height: 40, backgroundColor: this.props.theme.calendar.c1 }, index % 2 && { backgroundColor: this.props.theme.calendar.c2}]}
                  textStyle={{...styles.text , color:this.props.theme.fontColor}}
                />
              ))
            }
          </Table>

         
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  text: { color: 'black', textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
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

const mapStateToProps = state => {
  return {
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
  }
}


export default connect(mapStateToProps)(Celebrations);
