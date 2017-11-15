import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import Button from "./Button";
import Styles from "./styles/Styles";

export default class Settings extends Component {
	render() {
		return (
			<View style={Styles.styles.content}>
				<Button title="Logout" onPress={this.props.onLogout}/>
			</View>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1
	}
});