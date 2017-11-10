import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	Image,
	View,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import Styles from "./styles/Styles";

export default class SignupField extends Component {

	onChangeText(fieldId, value) {
		this.props.onChangeText(fieldId, value);
	}

	onNext() {
		if (this.props.value != "") {
			this.props.onNext();
		}
	}

	render() {
		var label;
		var next;

		if (this.props.value) {
			label = (
				<Text style={localStyles.label}>{this.props.title}</Text>
			);

			next = (
				<TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={() => this.onNext()}>
					<Image source={require("../images/forward.png")}/>
				</TouchableOpacity>
			);
		}

		return (
			<View style={localStyles.outerContainer}>
				<View style={localStyles.container}>
					<View style={localStyles.fieldAndLabel}>
						<View style={localStyles.labelHolder}>
							{label}
						</View>
						<View style={localStyles.inputAndNext}>
							<TextInput
								key={this.props.id}
								value={this.props.value}
								placeholder={this.props.title}
								onChangeText={(value) => this.onChangeText(this.props.id, value)}
								style={localStyles.field}
								onSubmitEditing={() => this.onNext()}
							/>
							{next}
						</View>
					</View>
				</View>
			</View>
		)
	}
}

const localStyles = StyleSheet.create({
	labelAndTextBoxHolder: {
		flexDirection: "column"
	},
	outerContainer: {
		flexDirection: "row"
	},
	fieldAndLabel: {
		flexDirection: "column",
		height: 60,
		flex: 1
	},
	inputAndNext: {
		flex: 1,
		flexDirection: "row"
	},
	container: {
		flexDirection: "row",
		flex: 1,
		marginLeft: 30,
		marginRight: 30,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: Styles.colours.lightBackground
	},
	labelHolder: {
		height: 40
	},
	field: {
		fontFamily: Styles.fonts.bold,
		flexDirection: "row",
		color: Styles.colours.black,
		fontSize: 20,
		height: 30,
		flex: 1
		
	},
	label: {
		fontSize: 15,
		fontFamily: Styles.fonts.bold,
		color: Styles.colours.border
	}
});