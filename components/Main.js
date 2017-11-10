import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import Styles from "./styles/Styles";
import Welcome from "./Welcome";

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: null	
		};
	}

	render() {
		if (this.state.user) {
			return (
				<View style={localStyles.container}>
					
				</View>
			);
		} else {
			return (
				<Welcome/>
			);
		}
		
	}
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Styles.colours.white
	}
});