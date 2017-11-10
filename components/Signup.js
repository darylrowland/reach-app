import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	LayoutAnimation
} from 'react-native';

import Styles from "./styles/Styles";
import SignupHeader from "./SignupHeader";
import SignupProgress from "./SignupProgress";
import SignupField from "./SignupField";

const FIELDS = [
	{id: "firstName", title: "First name"},
	{id: "lastName", title: "Last name"},
	{id: "email", title: "Email"}
]

export default class Signup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentStep: 0,
			firstName: "Daryl"
		};
	}

	onChangeField(fieldId, value) {
		var updateObj = {};
		updateObj[fieldId] = value;
		this.setState(updateObj);
	}

	onNextStep() {
		var nextStep = this.state.currentStep + 1;
		
		if (nextStep < FIELDS.length) {
			this.setState({
				currentStep: nextStep
			});
		}
	}

	onBack() {
		if (this.state.currentStep == 0) {
			this.props.onBack();
		} else {
			this.setState({
				currentStep: this.state.currentStep - 1
			});
		}
	}

	render() {
		return (
			<View style={localStyles.container}>
				<SignupHeader showBack={true} onBack={() => this.onBack()}/>
				<View style={localStyles.content}>
					<SignupField 
						id={FIELDS[this.state.currentStep].id}
						title={FIELDS[this.state.currentStep].title}
						value={this.state[FIELDS[this.state.currentStep].id]}
						onChangeText={(fieldId, value) => this.onChangeField(fieldId, value)}
						onNext={() => this.onNextStep()}/>
				</View>
				<SignupProgress currentStep={this.state.currentStep} totalSteps={FIELDS.length}/>
			</View>
		);
	}
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1,
		alignItems: "center",
		paddingTop: 60
	}
});