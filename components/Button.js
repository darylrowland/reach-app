import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import Styles from "./styles/Styles";

export default class Button extends Component {
	render() {
		var containerStyles = [localStyles.container];

		if (this.props.noBorder) {
			containerStyles.push(localStyles.containerNoBorder);
		}

		return (
			<TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={this.props.onPress} style={containerStyles}>
				<Text style={localStyles.title}>{this.props.title}</Text>
			</TouchableOpacity> 
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		borderWidth: 3,
		borderColor: Styles.colours.border,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		marginTop: 5,
		marginBottom: 5
	},
	containerNoBorder: {
		borderWidth: 0
	},
	title: {
		fontSize: 16,
		marginTop: 5,
		fontFamily: Styles.fonts.black
	}
});