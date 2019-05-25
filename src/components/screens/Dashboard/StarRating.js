
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text, Image
} from 'react-native';


import starFilled from '../../../assets/img/star-filled.png'

export default class StarRating extends Component {
	render() {
		return (
			<View style={ styles.container }>
            <Image
 style={styles.image}
 source={starFilled}
/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FF00FF",
		width: 100,
		height: 50
    },
    image: {
        width: 25,
        height: 25
       }
});