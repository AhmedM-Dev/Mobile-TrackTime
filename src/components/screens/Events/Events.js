import React from 'react';
import { StatusBar, Image, StyleSheet, View, Text } from 'react-native';
import { Container, Header, Content, Card } from 'native-base';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

export default class Events extends React.Component {
    
    render() {
        return (
            <Container >
                <StatusBar hidden />

                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Events', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

                <Content>

                  
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

   
});