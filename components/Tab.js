import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View,
	TouchableOpacity
} from 'react-native';

import Styles from "./styles/Styles";

export default class Tab extends Component {
	render() {
		var icon = this.props.tab.iconOff;
		var titleStyles = [localStyles.title];

		if (this.props.selected) {
			icon = this.props.tab.iconOn;
			titleStyles.push(localStyles.titleOn);
		}

		return (
			<TouchableOpacity style={localStyles.container} onPress={this.props.onPress}>
				<Image source={icon}/>
				<Text style={titleStyles}>{this.props.tab.title}</Text>
			</TouchableOpacity>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center"
	},
	title: {
		marginTop: 4,
		color: Styles.colours.lightText,
		fontSize: 15,
		fontFamily: Styles.fonts.bold
	},
	titleOn: {
		color: Styles.colours.primary
	}

});