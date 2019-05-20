import React from 'react';
import { StatusBar, Image, StyleSheet ,} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  View,
  Picker,
 Icon, Header, Title,
} from 'native-base';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { TouchableHighlight } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PureChart from 'react-native-pure-chart';
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
      <Container style={{backgroundColor:this.props.theme.backgroundColor}} >
        <StatusBar hidden />

        <Header style={{ backgroundColor: this.props.theme.backgroundColor, flexDirection: 'row',  }}>
                        <Icon name='md-menu' style={{
                            color: this.props.theme.fontColor, position: 'absolute',
                            left: 20, top: 15
                        }}
                            onPress={() => this.props.navigation.openDrawer()}
                        />
                        <Title style={{ top: 15, color: this.props.theme.fontColor , marginRight: 90, marginLeft: 25}}> Leaves history</Title>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Settings')} style={{
                        borderRadius: 100,
                        height: 30,
                        width: 30,
                        marginRight: 15,
                        top: 15,
                    }}>
                        <Image source={{ uri: this.props.avatar && this.props.avatar.photo }} style={{
                            borderRadius: 100,
                            height: 30,
                            width: 30,
                            borderWidth: 1,
                            borderColor: this.props.theme.fontColor,
                            zIndex:20
                        }}></Image>
                    </TouchableHighlight>
                   
                    </Header>



        <Content>
            <View>

              <CustumPicker>
                <Picker
                  selectedValue={this.state.year}
                  style={{ height: 50, width: 300 , color:this.props.theme.fontColor ,
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
                  style={{ height: 50, width: 300 , color:this.props.theme.fontColor , 
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
                  style={{ height: 50, width: 300 , color:this.props.theme.fontColor , borderRadius:20}}
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

              <Button style={{ width: 340 ,flexDirection:'row' ,alignSelf:'center' , backgroundColor:'#0E6655' , borderRadius:0 , marginTop:2 }}>
                <Icon name="md-done-all" style={{color:this.props.theme.backgroundColor, left:15 }}></Icon>
                <Text style={{ left :-200}}>FILTER</Text>
              </Button>

            </CustumPicker>


            {/* <View >
              <PureChart data={sampleDataa} type='pie' />
              </View> */}



        </Content>



      </Container>
    );
  }
}


const styles = StyleSheet.create({

  textStyle: {
    left: 18
  },
}
)



History.propTypes = {
  theme: PropTypes.object
};


const mapStateToProps = state => {
  return {
    theme: state.settingsReducer.theme,
    avatar: state.authReducer.avatar,
  }
}


export default connect(mapStateToProps)(History);