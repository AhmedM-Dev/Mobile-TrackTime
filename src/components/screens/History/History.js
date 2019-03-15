import React from 'react';
import { StatusBar, Image, StyleSheet, View, Text, Picker } from 'react-native';
import { Container, Header, Content, Card, Accordion } from 'native-base';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      PickerValue: ''

    }

  };
  render() {
    return (
      <Container >
        <StatusBar hidden />

        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'New request', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />

        <Content>
          <Accordion headerStyle={{ backgroundColor: '#fff' }} />
          <Card style={styles.cardStyle}>

            <View>
              <Text style={styles.AnneeStyle} >
                Année:
</Text>
              <View style={styles.autorisationList}>
                <Picker
                  selectedValue={this.state.language1}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language1: itemValue })
                  }>
                  <Picker.Item label="All Years" value="All Years" />
                  <Picker.Item label="2018" value="2018" />
                  <Picker.Item label="2019" value="2019" />

                </Picker>
              </View>

            </View>


            <View>
              <Text style={styles.AnneeStyle} >
                Status:
</Text>
              <View style={styles.autorisationList}>
                <Picker
                  selectedValue={this.state.language}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }>
                  <Picker.Item label="All Status" value="All Status" />
                  <Picker.Item label="Waiting" value="Waiting" />
                  <Picker.Item label="Accepted" value="Accepted" />
                  <Picker.Item label="Declined" value="Declined" />
                  <Picker.Item label="Canceled" value="Canceled" />
                  <Picker.Item label="Expired" value="Expired" />

                </Picker>
              </View>

            </View>


            <View>
              <Text style={styles.categoryStyle} >
                Category
                  </Text>
              <View style={styles.autorisationList}>
                <Picker
                  selectedValue={this.state.language3}
                  style={{ height: 50, width: 300 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language3: itemValue })
                  }>
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
              buttonStyle={{ width: 150 }}
              title="FILTER"
            />

          </Card>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    height: 570,
    padding: 15,
    alignItems: 'center',

  },
  autorisationList: {
    borderWidth: 1,
    width: 300,

    alignItems: 'center',
    borderColor: 'black',
    margin: 15

  },
  AnneeStyle: {
    left: 18
  },
}
)