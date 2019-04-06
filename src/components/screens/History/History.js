import React from 'react';
import { StatusBar, Image, StyleSheet, ImageBackground } from 'react-native';
import {
  Container,
  Content,
  Card,
  Text,
  Button,
  View,
  Picker,
  Footer,
  FooterTab,
  Badge, Icon, Header, Title,
} from 'native-base';
import PureChart from 'react-native-pure-chart';
import bg from '../../../assets/img/bg.jpg'
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
        label: 'Canceled',
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


        <Header style={{ backgroundColor: '#072F88', flexDirection: 'row' }}>
          <Icon name='md-menu' style={{
            color: 'white', position: 'absolute',
            left: 20, top: 15
          }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Title style={{ top: 15 }}>My leave history</Title>

          <View style={{position:'absolute' ,right:20}}>
                        <Badge style={{top:10 , right:-10 , zIndex:1}}><Text>2</Text></Badge>
                        <Icon active name="md-notifications"  style={{ color:'white' , top:-10 }}/>
                    </View>
        </Header>



        <Content>
          <Card style={styles.cardStyle} >
            <View>

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
                  <Picker.Item label="Canceled" value="Canceled" />
                </Picker>
              </View>


            </View>


            <View>

              <View style={styles.list}>
                <Picker
                  selectedValue={this.state.language3}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language3: itemValue })
                  }>
                  <Picker.Item label="All categories" value="All" />
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

              <Button rounded light style={{ width: 300 , top:10}}>
                <Icon name='md-checkmark' style={{color:'gray'}}/>
                <Text>FILTER</Text>
              </Button>

            </View>


            <View style={{marginTop:40}}>
              <PureChart data={sampleDataa} type='pie' /></View>

              
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
    height:50,
    paddingLeft:20,
    borderRadius:200,
    alignItems: 'center',
    borderColor: 'gray',
    marginTop: 10,
    backgroundColor:'white'

  },
  textStyle: {
    left: 18
  },
}
)