import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Content, View, Text, Input, Textarea } from 'native-base'
import ActionButton from 'react-native-circular-action-menu';
import moment from 'moment';
import { toUpper } from 'lodash';

// import { setHoursPlan } from './actions';

const initialState = {
  MB: null,
  ET: null,
  WW: null,
  AB: null,
  DL: null,
  LT: null,
  formula: ''
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
      const { MB, ET, WW, AB, LT, DL } = this.state;
      this.setState({ total: int(MB) + int(ET) + int(WW) + int(AB) + int(LT) + int(DL) });
    });
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

          <View style={{ marginBottom: 20, marginLeft: 20, marginRight: 20, backgroundColor: '#E3F6CE', padding: 10, borderRadius: 10 }}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Morning Entry Bonus (MB)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. MB' keyboardType="number-pad" onChangeText={() => this.handleCoefChange('MB')} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Extra Time (ET)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. ET' keyboardType="number-pad" onChangeText={null} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Weekend Work (WW)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. WW' keyboardType="number-pad" onChangeText={null} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Total</Text>
              <Input value={this.state.total} style={styles.inputStyle} disabled />
            </View>
            
          </View>

          <View style={{ marginBottom: 40, marginLeft: 20, marginRight: 20, backgroundColor: '#F6D8CE', padding: 10, borderRadius: 10 }}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Absence (AB)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. AB' keyboardType="number-pad" onChangeText={null} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Delay (DL)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. DL' keyboardType="number-pad" onChangeText={null} />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 9 }}>Less Work Time (LT)</Text>
              <Input style={styles.inputStyle} placeholder='Coef. LT' keyboardType="number-pad" onChangeText={null} />
            </View>

            {/* <StyledInput value={this.state.requiredWorkingHours} text={'Required working hours'} keyboardType="number-pad" textColor={'white'} onChange={this.handleRequiredWorkingHoursChange} />
            <StyledInput value={this.state.allowedDelaysPerMonth} text={'Allowed delays per month'} keyboardType="number-pad" textColor={'white'} onChange={this.handleAllowedDelaysPerMonthChange} /> */}
            {/* <StyledInput value={this.state.maxDelayTime} text={'Max delay allowed time'} textColor={'white'} onChange={this.handleMaxDelayTimeChange} /> */}

          </View>

          <View style={{ marginBottom: 20, marginLeft: 20, marginRight: 20, backgroundColor: '#BDBDBD', padding: 10, borderRadius: 10 }}>
            <Textarea value={this.state.formula} rowSpan={2} placeholder="Textarea" onChangeText={this.handleFormulaChange} />
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
              onPress={this.handleSubmitPlan}
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
  }
});


const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
  // setHoursPlan(payload) { dispatch(setHoursPlan(payload)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreFormula);
