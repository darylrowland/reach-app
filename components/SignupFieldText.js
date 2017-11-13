import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	View
} from 'react-native';

import Styles from "./styles/Styles";

export default class SignupFieldText extends Component {

	constructor(props) {
		super(props);
		this.renderNextButton = this.renderNextButton.bind(this);
	}

	renderNextButton(field, value) {
		var passedValidation;

		if (!field.validator) {
			passedValidation = true;
		} else {
			passedValidation = field.validator(value);
		}

		if ((value && passedValidation) || !field.required) {
			return (
				<TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={() => this.props.onNext()} hitSlop={Styles.hitSlop}>
					<Image source={require("../images/forward.png")}/>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	}

	render() {
		var label;

		if (this.props.value) {
			label = (
				<Text style={localStyles.label}>{this.props.title}</Text>
			);
		}

		return (
			<View style={localStyles.fieldAndLabel}>
				<View style={localStyles.labelHolder}>
					{label}
				</View>
				<View style={localStyles.inputAndNext}>
					<TextInput
						key={this.props.id}
						value={this.props.value}
						placeholder={this.props.title}
						onChangeText={(value) => this.props.onChangeText(this.props.field, value)}
						style={localStyles.field}
						onSubmitEditing={() => this.props.onNext()}
						keyboardType={this.props.field.keyboardType}
					/>
					{this.renderNextButton(this.props.field, this.props.value)}
				</View>
			</View>
		);
	}
}

const localStyles = StyleSheet.create({
	field: {
		fontFamily: Styles.fonts.bold,
		flexDirection: "row",
		color: Styles.colours.black,
		fontSize: 20,
		height: 30,
		flex: 1
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
	label: {
		fontSize: 15,
		fontFamily: Styles.fonts.bold,
		color: Styles.colours.border
	},
	labelHolder: {
		height: 40
	},
});