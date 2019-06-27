import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Content, View, Text, Input, Textarea } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import moment from 'moment';
import { toUpper } from 'lodash';

import { setFormula } from './actions';

const initialState = {
  WT: null,
  ME: null,
  ET: null,
  WW: null,
  DL: null,
  LT: null,
  formula: 'Formula',
  total: 0
}

int = (value) => isNaN(parseFloat(value)) ? 0 : parseFloat(value);

class ScoreFormula extends Component {
  state = initialState;


  handleDateChange = (type, value) => {
    this.setState({
      ...this.state,
      dateFrom: type === "dateFrom" ? value : this.state.dateFrom,
      dateTo: type === "dateTo" ? value : this.state.dateTo,
    })
  }

  handleRequiredWorkingHoursChange = (requiredWorkingHours) => {
    this.setState({ requiredWorkingHours });
  }

  handlePeriodNameChange = (periodName) => {
    this.setState({ periodName });
  }

  handleAllowedDelaysPerMonthChange = (allowedDelaysPerMonth) => {
    this.setState({ allowedDelaysPerMonth });
  }

  handleBeginTimeChange = (type, time) => {
    this.setState({ [type]: time });
  }

  handleSubmitPlan = () => {
    const { allowedDelaysPerMonth, beginTime, beginTimeMax, dateFrom, dateTo, periodName, requiredWorkingHours } = this.state;

    if (dateFrom && dateTo && periodName.length > 0 && requiredWorkingHours && allowedDelaysPerMonth && moment(beginTime).format() && moment(beginTimeMax).format()) {
      this.props.setHoursPlan({ ...this.state });
      this.handleClear();
    } else {
      Alert.alert(
        'Hours Plan',
        'All fields are required.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }
  }

  handleClear = () => {
    this.setState(initialState);
  }

  handleFormulaChange = (formula) => {
    console.log("Formula:", formula);
    this.setState({ formula: toUpper(formula) });
  }

  handleCoefChange = (field, value) => {
    this.setState({ [field]: value }, () => {
      const { WT, ME, ET, WW, LT, DL } = this.state;
      this.setState({
        total: int(WT) + int(ME) + int(ET) + int(WW),
        formula: `( ((WT * ${int(WT)}) + (ME * ${int(ME)}) + (ET * ${int(ET)}) + (WW * ${int(WW)}) - (DL * ${int(DL)}) - (LT * ${int(LT)})) * 20 ) / ${int(WT) + int(ME) + int(ET) + int(WW)}`,
        displayFormula: `((WT * ${int(WT)}) + (ME * ${int(ME)}) + (ET * ${int(ET)}) + (WW * ${int(WW)}) - (DL * ${int(DL)}) - (LT * ${int(LT)})) * 20\n________________________________\n${int(WT) + int(ME) + int(ET) + int(WW)}`
      });
    });
  }

  handleSubmitScore = () => {
    this.props.setFormula(this.state);
  }

  render() {
    return (
      <View style={styles.container} >
        <Content>
          <Icon
            name="md-arrow-round-back"
            style={{
              color: '#DA7373',
              margin: 30,
              fontSize: 18,
              left: 20
            }}
            onPress={() => this.props.navigation.navigate('Administration')} />

          <View style={{ marginBottom: 20, marginLeft: 20, marginRight: 20, backgroundColor: '#FAFAFA', padding: 10, borderRadius: 10 }}>
            <Text style={{ ...styles.title, backgroundColor: '#FAFAFA' }}>Work Score</Text>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Working Time (WT)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. WT' keyboardType="number-pad" onChangeText={(text) => this.handleCoefChange('WT', text)} />
            </View>
          </View>

          <View style={{ marginBottom: 20, marginLeft: 20, marginRight: 20, backgroundColor: '#E3F6CE', padding: 10, borderRadius: 10 }}>
            <Text style={{ ...styles.title, backgroundColor: '#E3F6CE' }}>Bonus</Text>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Morning Entry Bonus (ME)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. ME' keyboardType="number-pad" onChangeText={(text) => this.handleCoefChange('ME', text)} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Extra Time Bonus (ET)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. ET' keyboardType="number-pad" onChangeText={(text) => this.handleCoefChange('ET', text)} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Weekend Work Bonus (WW)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. WW' keyboardType="number-pad" onChangeText={(text) => this.handleCoefChange('WW', text)} />
            </View>
          </View>

          <View style={{ marginBottom: 20, marginLeft: 20, marginRight: 20, backgroundColor: '#F6D8CE', padding: 10, borderRadius: 10 }}>
            <Text style={{ ...styles.title, backgroundColor: '#F6D8CE' }}>Penalties</Text>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Delay (DL)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. DL' keyboardType="number-pad" onChangeText={(text) => this.handleCoefChange('DL', text)} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Less Work Time (LT)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. LT' keyboardType="number-pad" onChangeText={(text) => this.handleCoefChange('LT', text)} />
            </View>
          </View>

          <View style={{ marginBottom: 40, marginLeft: 20, marginRight: 20, backgroundColor: '#CEE3F6', padding: 10, borderRadius: 10 }}>
            <Text style={{ ...styles.title, backgroundColor: '#CEE3F6' }}>Coefficient</Text>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Total</Text>
              <Input value={`${this.state.total}`} style={styles.inputStyle} disabled />
            </View>
          </View>

          <View style={{ marginBottom: 20, marginLeft: 20, marginRight: 20, backgroundColor: '#BDBDBD', padding: 10, borderRadius: 10 }}>
            <Textarea disabled style={{ fontWeight: 'bold', textAlign: 'center' }} value={this.state.displayFormula || 'Formula'} rowSpan={4} placeholder="Textarea" onChangeText={this.handleFormulaChange} />
          </View>

          <ActionButton
            buttonColor="#9C9C9C"
            btnOutRange="#C8593C"
            icon={<Icon name='md-arrow-dropup' style={styles.actionButtonIcon} />}
            degrees={180}
            size={40}
            radius={50}
            outRangeScale={0.5}
          >
            <ActionButton.Item
              buttonColor='#A9A91C'
              title="Reset"
              onPress={this.handleClear} >
              <Icon name="md-refresh" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#006B4C'
              title="Save"
              onPress={this.handleSubmitScore}
            >
              <Icon
                name="md-done-all"
                style={styles.actionButtonIcon}
              />
            </ActionButton.Item>
          </ActionButton>
        </Content>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1D0D0',
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  inputStyle: {
    flex: 3,
    borderWidth: 1,
    borderRadius: 4,
    margin: 2,
    height: 30,
    paddingTop: 2,
    paddingBottom: 2,
  },

  title: {
    flex: 12,
    position: 'absolute',
    alignSelf: 'center',
    top: -14,
    fontSize: 20,
    borderRadius: 14,
    paddingRight: 10,
    paddingLeft: 10
  }
});


const mapStateToProps = state => {
  return {
    formula: state.formulaReducer.formula
  }
}

const mapDispatchToProps = dispatch => ({
  setFormula(payload) { dispatch(setFormula(payload)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreFormula);
