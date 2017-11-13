import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	View
} from 'react-native';

import Styles from "./styles/Styles";

export default class SignupHeader extends Component {
	render() {
		var back;

		if (this.props.showBack) {
			back = (
				<TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={this.props.onBack} hitSlop={Styles.hitSlop}>
					<Image source={require("../images/back.png")}/>
				</TouchableOpacity>
			);
		} else {
			back = (
				<View></View>
			);
		}

		return (
			<View style={localStyles.container}>
				{back}
				<Image source={require("../images/reachlogo_small.png")}/>


			</View>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 30,
		paddingTop: 40
	}
});