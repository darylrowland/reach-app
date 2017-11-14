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

import SignupFieldText from "./SignupFieldText";
import SignupFieldProfilePic from "./SignupFieldProfilePic";
import SignupFieldMarketplaceSelector from "./SignupFieldMarketplaceSelector";

export default class SignupField extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fieldPosition: new Animated.Value(0)
		};

		this.renderFieldType = this.renderFieldType.bind(this);
	}

	onChangeText(fieldId, value) {
		this.props.onChangeText(fieldId, value);
	}

	onNext() {
		if (this.props.value != "" || !this.props.field.required) {
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

	renderFieldType() {
		if (!this.props.field.type || this.props.field.type == "text") {
			return (
				<SignupFieldText
					id={this.props.id}
					value={this.props.value}
					title={this.props.title}
					secureEntry={this.props.secureEntry}
					field={this.props.field}
					onChangeText={(field, value) => this.props.onChangeText(field, value)}
					onNext={() => this.onNext()}
				/>
			)
		} else if (this.props.field.type == "pic") {
			return (
				<SignupFieldProfilePic
					id={this.props.id}
					value={this.props.value}
					field={this.props.field}
					onChangeFile={(field, uri) => this.props.onChangeText(field, uri)}
					onNext={() => this.onNext()}
				/>
			)
		} else if (this.props.field.type == "marketplace") {
			return (
				<SignupFieldMarketplaceSelector
					id={this.props.id}
					marketplaces={this.props.marketplaces}
					field={this.props.field}
					onChangeMarketplaces={this.props.onChangeMarketplaces}
					onNext={() => this.onNext()}
				/>
			);
		} else {
			return null;
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

		if (this.props.field.type == "marketplace" || this.props.field.type == "pic") {
			containerStyles.push(localStyles.containerNoBorder);
		}

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
					{this.renderFieldType()}
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
		flexDirection: "row",
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
	containerNoBorder: {
		borderBottomWidth: 0
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