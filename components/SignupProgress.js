import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions
} from 'react-native';

import Styles from "./styles/Styles";

export default class SignupProgress extends Component {
	render() {
		var progressBarStyles =[localStyles.progress];

		var progressWidth = (this.props.currentStep + 1) * (Dimensions.get("window").width / this.props.totalSteps);

		progressBarStyles.push({
			width: progressWidth
		});

		return (
			<View style={localStyles.container}>
				<View style={progressBarStyles}></View>
			</View>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		height: 10,
		backgroundColor: Styles.colours.lightBackground
	},
	progress: {
		height: 10,
		backgroundColor: Styles.colours.primary
	}
});