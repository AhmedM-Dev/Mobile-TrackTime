import React from 'react';
import { StatusBar, Image, StyleSheet, ImageBackground 


} from 'react-native';
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
      year: '',
      status: '',
      category: ''
    }

  };


  render() {


    let sampleDataa = [
      {
        value: 50,
        label: 'Refused',
        color: '#E04415',
    }, {
        value: 40,
        label: 'Canceled',
        color: '#CBC93B'
    }, {
        value: 25,
        label: 'Accepted',
        color: '#1A9E00'
    },
    {
        value: 10,
        label: 'On hold',
        color: '#15BFC2'
    }

  ]

    return (
      <Container style={{ backgroundColor: '#13446E' }} >
        <StatusBar hidden />


        <Header style={{ backgroundColor: '#13446E', flexDirection: 'row' }}>
          <Icon name='md-menu' style={{
            color: 'white', position: 'absolute',
            left: 20, top: 15
          }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Title style={{ top: 15 }}>My leave history</Title>

          <View style={{ position: 'absolute', right: 20 }}>
            <Badge style={{ top: 10, right: -10, zIndex: 1 }}><Text>2</Text></Badge>
            <Icon active name="md-notifications" style={{ color: 'white', top: -10 }} />
          </View>
        </Header>



        <Content>
            <View>

              <View style={styles.list}>
                <Picker
                  selectedValue={this.state.year}
                  style={{ height: 50, width: 300 , color:'white' }}
                 
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ year: itemValue })
                  }>
                  <Picker.Item label="All Years" value="All Years" />
                  <Picker.Item label="2019" value="2018" />
                  <Picker.Item label="2017" value="2017" />

                </Picker>
              </View>

            </View>


            <View>

              <View style={styles.list}>
                <Picker
                  selectedValue={this.state.status}
                  style={{ height: 50, width: 300 , color:'white'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ status: itemValue })
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
                  selectedValue={this.state.category}
                  style={{ height: 50, width: 300 , color:'white' }}
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
              </View>

              <Button style={{ width: 340, top:5 , alignSelf:'center' , backgroundColor:'#4986B9'  }}>
                <Text style={{left:15}}>FILTER</Text>
              </Button>

            </View>


            <View style={styles.cardStyle}>
              <PureChart data={sampleDataa} type='pie' />
              </View>



        </Content>



      </Container>
    );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    marginTop:10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 340,
    backgroundColor: '#245E8F',
    borderColor: '#245E8F',
    padding:10
},
  list: {
    borderWidth: 1,
    width: 340,
    height: 50,
    paddingLeft: 20,
    alignSelf: 'center',
    borderColor: '#245E8F',
    marginTop: 2,
    backgroundColor: '#245E8F', 

  },
  textStyle: {
    left: 18
  },
}
)