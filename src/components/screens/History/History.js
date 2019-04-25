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
import SearchableDropdown from 'react-native-searchable-dropdown';


import PureChart from 'react-native-pure-chart';
import bg from '../../../assets/img/bg.jpg'

var categories = [
  {
      id: 'All categories',
      name: 'All categories',
  },
  {
      id: 'Paid leave',
      name: 'Paid leave',
  },
  {
      id: 'Additional days',
      name: 'Additional days',
  },
  {
    id: 'Unpaid leave',
    name: 'Unpaid leave',
},
{
  id: 'Sick leave',
  name: 'Sick leave',
},
{
  id: 'Paternity leave',
  name: 'Paternity leave',
},
{
  id: 'Maternity leave',
  name: 'Maternity leave',
},
{
  id: 'Wedding leave',
  name: 'Wedding leave',
},
{
  id: "Son's circumcision ",
  name: "Son's circumcision ",
},
{
  id: "Son's/Daughter's wedding",
  name: "Son's/Daughter's wedding",
},
{
  id: "Spouse's death",
  name: "Spouse's death",
},
{
  id: "Mother's/Father's death",
  name: "Mother's/Father's death",
},
{
  id: "Son's/Daughter's death",
  name: "Son's/Daughter's death",
},
{
  id: "Brother's/Sister's death",
  name:"Brother's/Sister's death",
},
{
  id: "Grandfather's/Grandmother's death",
  name: "Grandfather's/Grandmother's death",
},
{
  id: "Other",
  name: "Other",
},
];


export default class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      year: 'All years',
      status: 'All status',
      category: 'All categories'
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
      <Container style={{ backgroundColor: '#021630' }} >
        <StatusBar hidden />


        <Header style={{ backgroundColor: '#021630', flexDirection: 'row' }}>
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
                  <Picker.Item label="All years" value="All years" />
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
                  <Picker.Item label="All status" value="All status" />
                  <Picker.Item label="On hold" value="Waiting" />
                  <Picker.Item label="Accepted" value="Accepted" />
                  <Picker.Item label="Declined" value="Declined" />
                  <Picker.Item label="Canceled" value="Canceled" />
                </Picker>
              </View>


            </View>


            <View>

                {/* <Picker
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

                </Picker> */}
                  <SearchableDropdown
                  listType="ListView"
                    onTextChange={(itemValue, itemIndex) =>
                        this.setState({ category: itemValue })}
                    onItemSelect={
                        (itemValue, itemIndex) =>
                            this.setState({ category: JSON.stringify((itemValue.id)) })
                    }
                    containerStyle={{ marginTop:1}}
                    textInputStyle={{
                        borderWidth: 1,
                        borderColor: '#021630',
                        fontSize: 18,
                        width: 342,
                        alignSelf: 'center',
                        color: 'white',
                        backgroundColor: '#082955',
                       paddingLeft:27 
                    }}
                    itemStyle={{
                        padding: 3,
                        paddingLeft:30,
                        backgroundColor: '#082955',
                        width: 340,
                        alignSelf: 'center',
                        margin:-2  ,
                          }}
                    itemTextStyle={{ color: '#CEE4EE' }}
                    itemsContainerStyle={{ maxHeight: 220 , 
                                          alignSelf:'center',
                                           width:340 ,
                                           marginBottom:5,
                                           borderWidth:1,
                                           borderColor:'#082955',
                                           marginTop:-2
                                          }}
                    items={categories}
                    // defaultIndex={3}
                    placeholder="All categories"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                />

              <Button style={{ width: 340 ,flexDirection:'row' ,alignSelf:'center' , backgroundColor:'#0E6655' , borderRadius:0 , marginTop:2 }}>
                <Icon name="md-done-all" style={{color:'white', left:15 }}></Icon>
                <Text style={{ left :-200}}>FILTER</Text>
              </Button>

            </View>


            {/* <View style={styles.cardStyle}>
              <PureChart data={sampleDataa} type='pie' />
              </View> */}



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
    backgroundColor: '#082955',
    borderColor: '#082955',
    padding:10
},
  list: {
    borderWidth: 1,
    width: 340,
    height: 50,
    paddingLeft: 20,
    alignSelf: 'center',
    borderColor: '#082955',
    marginTop: 2,
    backgroundColor: '#082955', 

  },
  textStyle: {
    left: 18
  },
}
)