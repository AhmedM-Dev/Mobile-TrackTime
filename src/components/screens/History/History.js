import React from 'react';
import { StatusBar, Image, StyleSheet, View, Text, Picker } from 'react-native';
import { Container, Header, Content, Card, Icon, Title , } from 'native-base';
import { Button } from 'react-native-elements';
import PureChart from 'react-native-pure-chart';

export default class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      PickerValue: ''
    }

  };

  
  render() {

   
    let sampleDataa = [
      {
          value: 50,
          label: 'Refused',
          color: '#BF1F43',
      }, {
          value: 40,
          label: 'Annulled',
          color: '#E4B5B5'
      }, {
          value: 25,
          label: 'Accepted',
          color: '#9BBB80'
      },
      {
          value: 10,
          label: 'On hold',
          color: '#AACDD8'
      }

  ]

    return (
      <Container style={{ backgroundColor: '#DDE3F3' }} >
        <StatusBar hidden />


        <Header style={{ backgroundColor: '#052D8F', flexDirection: 'row' }}
        >

          <Icon name='md-menu' style={{
            color: 'white', position: 'absolute',
            left: 20, top: 10
          }}
            onPress={() => alert('menu')}
          />

          <Title style={{ top: 15 }}>My leave history</Title>

          <Icon name='md-menu' style={{
            color: 'white', position: 'absolute',
            right: 20, top: 10
          }}
            onPress={() => alert('home')}
          />
        </Header>

        <Content>
          <Card style={styles.cardStyle}>

            <View>
              <Text style={styles.textStyle} >
                Year:
                </Text>
              <View style={styles.list}>
                <Picker
                  selectedValue={this.state.language1}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language1: itemValue })
                  }>
                  <Picker.Item label="All Years" value="All Years" />
                  <Picker.Item label="2019" value="2018" />
                  <Picker.Item label="2018" value="2019" />
                  <Picker.Item label="2017" value="2017" />

                </Picker>
              </View>

            </View>


            <View>
              <Text style={styles.textStyle} >
                Status:
             </Text>
              <View style={styles.list}>
                <Picker
                  selectedValue={this.state.language}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }>
                  <Picker.Item label="All Status" value="All Status" />
                  <Picker.Item label="On hold" value="Waiting" />
                  <Picker.Item label="Accepted" value="Accepted" />
                  <Picker.Item label="Declined" value="Declined" />
                  <Picker.Item label="Annulled" value="Canceled" />
                </Picker>
              </View>

            </View>


            <View>
              <Text style={styles.textStyle} >
                Category
                  </Text>
              <View style={styles.list}>
                <Picker
                  selectedValue={this.state.language3}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language3: itemValue })
                  }>
                  <Picker.Item label="All" value="All" />
                  <Picker.Item label="Paid leave" value="Paid leave" />
                  <Picker.Item label="Additional days" value="Additional days" />
                  <Picker.Item label="Unpaid leave" value="Unpaid leave" />
                  <Picker.Item label="Sick leave" value="Sick leave" />
                  <Picker.Item label="Paternity leave" value="Paternity leave" />
                  <Picker.Item label="Maternity leave" value="Maternity leave" />
                  <Picker.Item label="Wedding leave" value="Wedding" />
                  <Picker.Item label="Son's circumcision " value="circumcision " />
                  <Picker.Item label="Son's/Daughter's wedding" value="wedding" />
                  <Picker.Item label="Spouse's death" value="death" />
                  <Picker.Item label="Mother's/Father's death" value="death" />
                  <Picker.Item label="Son's/Daughter's death" value="death" />
                  <Picker.Item label="Brother's/Sister's death" value="death" />
                  <Picker.Item label="Grandfather's/Grandmother's death" value="death" />
                  <Picker.Item label="Other" value="Other" />

                </Picker>
              </View>

            </View>
            <Button
              buttonStyle={{ width: 150  , marginBottom:30 ,top : 10 ,width:300 , backgroundColor:'#052D8F' }}
              title="FILTER"
            />
               <PureChart data={sampleDataa} type='pie'  />

             

          </Card>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    padding: 15,
    alignItems: 'center',

  },
  list: {
    borderWidth: 1,
    width: 300,
    alignItems: 'center',
    borderColor: 'black',
    margin: 15

  },
  textStyle: {
    left: 18
  },
}
)