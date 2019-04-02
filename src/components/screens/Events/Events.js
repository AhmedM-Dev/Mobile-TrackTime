import React, { Component } from 'react';
import { Image, StatusBar } from 'react-native';
import {
  Container,
  Header,
  View,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Title,
  Content,
  Button,
  Right,
  Footer,
  FooterTab,
  Badge
} from 'native-base';
import eventsLogo from '../../../assets/img/eventsLogo.png'
import afterWork from '../../../assets/img/afterWork.png'
export default class NewRequest extends Component {
  render() {

    
    return (
      <Container style={{ backgroundColor: '#DDE3F3' }} >
        <StatusBar hidden />
        <Header style={{ backgroundColor: '#052D8F', flexDirection: 'row' }}>
          <Icon name='md-menu' style={{
            color: 'white', position: 'absolute',
            left: 20, top: 10
          }}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Title style={{ top: 15 }}>Events</Title>

          <Icon name='home' style={{
            color: 'white', position: 'absolute',
            right: 20, top: 10
          }}
            onPress={() => this.props.navigation.navigate('Dashboard')}
          />
        </Header>
        <Content>
          {/* <Card style={{ flex: 0 }}>
            <CardItem button onPress={() => alert("This is Card Header")}>
              <Left>
                <Thumbnail source={eventsLogo} />
                <Body>
                  <Text>After work party</Text>
                  <Text note>July 15, 2019</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{top:-20}}  >
              <Body>
                <Image source={afterWork} style={{ height: 200, width: 320, flex: 1 }} />
              </Body>
            </CardItem>
          </Card> */}
        </Content>

        <Footer style={{ backgroundColor: '#072F88' }}>
          <FooterTab style={{ backgroundColor: '#072F88', }} >

            <Button vertical style={{ backgroundColor: '#072F88', height: 50 }} >
              <Icon name="md-log-out" style={{ color: 'white' }} />
            </Button>
            <Button vertical style={{ backgroundColor: '#072F88', height: 50 }}
              onPress={() => this.props.navigation.navigate('Settings')}>
              <Icon name="settings" style={{ color: 'white' }} />
            </Button>
            <Button active badge vertical style={{ backgroundColor: '#072F88', height: 50 }} >
              <Badge ><Text>7</Text></Badge>
              <Icon active name="md-chatbubbles" />
            </Button>
            <Button active badge vertical style={{ backgroundColor: '#072F88', height: 50 }} >
              <Badge ><Text>2</Text></Badge>
              <Icon active name="md-notifications" />
            </Button>

          </FooterTab>
        </Footer>

      </Container>
    );
  }
}