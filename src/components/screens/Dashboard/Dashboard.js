import React from 'react';
import { Image } from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right
} from 'native-base';

import PureChart from 'react-native-pure-chart';

export default class Dashboard extends React.Component {
    render() {
        let sampleData = [
            {
              seriesName: 'series1',
              data: [
                {x: '2018-02-01', y: 30},
                {x: '2018-02-02', y: 200},
                {x: '2018-02-03', y: 170},
                {x: '2018-02-04', y: 250},
                {x: '2018-02-05', y: 10}
              ],
              color: '#297AB1'
            },
            {
              seriesName: 'series2',
              data: [
                {x: '2018-02-01', y: 20},
                {x: '2018-02-02', y: 100},
                {x: '2018-02-03', y: 140},
                {x: '2018-02-04', y: 550},
                {x: '2018-02-05', y: 40}
              ],
              color: 'yellow'
            }
          ]
          
          
        return (
            <Container>
                <Header />
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'Image URL' }} />
                                <Body>
                                    <Text>TrackTime</Text>
                                    <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            {/* <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: null, flex: 1 }} /> */}
                            <PureChart data={sampleData} type='line' />                        
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Text>4 Comments</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}