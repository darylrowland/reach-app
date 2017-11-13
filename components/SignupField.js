import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	Image,
	View,
	Dimensions,
	Animated,
	TouchableOpacity
} from 'react-native';

import Styles from "./styles/Styles";

export default class SignupField extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fieldPosition: new Animated.Value(0)
		};

		this.renderNextButton = this.renderNextButton.bind(this);
	}

	onChangeText(fieldId, value) {
		this.props.onChangeText(fieldId, value);
	}

	onNext() {
		if (this.props.value != "") {
			Animated.timing(this.state.fieldPosition, {
				toValue: 1,
				duration: 200
			}).start(() => {
				this.setState({
					fieldPosition: new Animated.Value(-1)
				}, () => {
					this.props.onNext();
					Animated.timing(this.state.fieldPosition, {
						toValue: 0,
						duration: 200
					}).start();
				});
			});
		}
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
				<TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={() => this.onNext()} hitSlop={Styles.hitSlop}>
					<Image source={require("../images/forward.png")}/>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	}

	renderAdditionalInfo(additionalInfo) {
		if (additionalInfo) {
			return (
				<View style={localStyles.additionalInfoHolder}>
					<Text style={localStyles.additionalInfo}>
						{additionalInfo}
					</Text>
				</View>
			)
		}
	}

	render() {
		var label;
		var next;

		if (this.props.value) {
			label = (
				<Text style={localStyles.label}>{this.props.title}</Text>
			);
		}

		var containerStyles = [localStyles.container];
		containerStyles.push({
			transform: [
				{translateX: this.state.fieldPosition.interpolate({
					inputRange: [-1, 0, 1],
					outputRange: [-Dimensions.get("window").width, 0, Dimensions.get("window").width]
				})}
			]
		});
		

		return (
			<View style={localStyles.outerContainer}>
				<Animated.View style={containerStyles}>
					<View style={localStyles.fieldAndLabel}>
						<View style={localStyles.labelHolder}>
							{label}
						</View>
						<View style={localStyles.inputAndNext}>
							<TextInput
								key={this.props.id}
								value={this.props.value}
								placeholder={this.props.title}
								onChangeText={(value) => this.onChangeText(this.props.field, value)}
								style={localStyles.field}
								onSubmitEditing={() => this.onNext()}
								keyboardType={this.props.field.keyboardType}
							/>
							{this.renderNextButton(this.props.field, this.props.value)}
						</View>
						

					</View>
					{this.renderAdditionalInfo(this.props.additionalInfo)}
				</Animated.View>
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
	},
	additionalInfo: {
		color: Styles.colours.primary,
		fontFamily: Styles.fonts.bold,
		fontSize: 14
	},
	additionalInfoHolder: {
		position: "absolute",
		top: 90,
		width: Dimensions.get("window").width - 60,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"
	}
});