import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View,
	TouchableOpacity
} from 'react-native';

import Styles from "./styles/Styles";

export default class NextTextButton extends Component {
	render() {
		return (
			<TouchableOpacity activeOpacity={Styles.activeOpacity} style={localStyles.container} onPress={this.props.onNext}>
				<View style={localStyles.button}>
					<Text style={localStyles.title}>{this.props.title}</Text>
					<Image source={require("../images/forward.png")}/>
				</View>
			</TouchableOpacity>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		marginTop: 10,
		marginBottom: 10
	},
	button: {
		flexDirection: "row",
		alignItems: "center"
	},
	title: {
		marginTop: 8,
		color: Styles.colours.primary,
		fontSize: 22,
		fontFamily: Styles.fonts.bold,
		marginRight: 10
	}
});