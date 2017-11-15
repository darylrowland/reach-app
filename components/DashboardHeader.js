import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import Styles from "./styles/Styles";

export default class DashboardHeader extends Component {
	render() {
		return (
			<View style={localStyles.container}>
				<Text style={Styles.styles.mediumTitle}>{this.props.title}</Text>
			</View>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		padding: 20,
		paddingBottom: 10,
		paddingTop: 50,
		borderBottomColor: Styles.colours.lightBackground,
		borderBottomWidth: 1
	}
});