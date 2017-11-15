import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	LayoutAnimation,
	Dimensions
} from 'react-native';

import Styles from "./styles/Styles";
import SignupHeader from "./SignupHeader";
import SignupProgress from "./SignupProgress";
import SignupField from "./SignupField";

import Geocoder from 'react-native-geocoder';

const POSTCODE_REG_EXP = new RegExp("^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$");

const FIELDS = [
	{id: "firstName", title: "First name", required: true},
	{id: "lastName", title: "Last name", required: true},
	{id: "companyName", title: "Company Name", required: true},
	{id: "email", title: "Email", lowerCase: true, required: true},
	{id: "mobileNumber", title: "Mobile Number", keyboardType: "number-pad", required: false},
	{id: "password", title: "Password", secureEntry: true, required: true},
	{id: "postcode", title: "Postcode", required: true, validator: (value) => {
		if (!value) {
			return false;
		}

		var formattedValue = value.toUpperCase();
		var validPostcode = false;
		formattedValue = formattedValue.trim();
		
		if (formattedValue.length >= 5 && formattedValue.indexOf(" ") < 0) {
			formattedValue = formattedValue.substr(0, formattedValue.length - 3) + " " + formattedValue.substr(formattedValue.length - 3);
		}

		if (POSTCODE_REG_EXP.test(formattedValue)) {
			validPostcode = true;
		}

		return validPostcode;
	}, formatter: (value) => {
		if (!value) {
			return null;
		}

		var formattedValue = value.toUpperCase();
		var validPostcode = false;
		formattedValue = formattedValue.trim();
		
		if (formattedValue.length >= 5 && formattedValue.indexOf(" ") < 0) {
			formattedValue = formattedValue.substr(0, formattedValue.length - 3) + " " + formattedValue.substr(formattedValue.length - 3);
		}

		if (POSTCODE_REG_EXP.test(formattedValue)) {
			validPostcode = true;
			return formattedValue;
		}

		return value.toUpperCase();
	}},
	{id: "firstLineAddress", title: "First line of address", required: true},
	{id: "pic", title: "Profile Pic", required: false, type: "pic"},
	{id: "marketplace", title: "Select services", required: false, type: "marketplace"},
	
]

export default class Signup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentStep: 0
		};

		this.getStreetName = this.getStreetName.bind(this);
	}

	onChangeField(field, value) {
		var updateObj = {};
		var valueToUse = value;

		if (field.lowerCase) {
			valueToUse = value.toLowerCase();
		}

		if (field.formatter) {
			valueToUse = field.formatter(value);
		}

		updateObj[field.id] = valueToUse;
		this.setState(updateObj);
	}

	getStreetName(callback) {
		Geocoder.geocodeAddress(this.state.postcode).then(res => {
			// res is an Array of geocoding object (see below)
			if (res && res.length > 0 && res[0].position) {
				Geocoder.geocodePosition(res[0].position).then((res) => {
					var streetName = null;

					if (res.length > 0 && res[0].streetName) {
						streetName = (res[0].streetName);
					}

					this.setState({
						streetName: streetName,
					});
				});
			}
		}).catch((err) => {
			console.error(err);
		});
	}

	onNextStep() {
		var nextStep = this.state.currentStep + 1;

		if (FIELDS[this.state.currentStep].id == "postcode") {
			// Postcode field has been entered, geocode it...
			this.getStreetName();
		}

		if (nextStep < FIELDS.length) {
			this.setState({
				currentStep: nextStep
			});
		}
	}

	getAdditionalInfo(field) {
		if (field.id == "firstLineAddress" && this.state.postcode) {
			return this.state.streetName;
		} else {
			return null;
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
						field={FIELDS[this.state.currentStep]}
						secureEntry={FIELDS[this.state.currentStep].secureEntry}
						onChangeText={(field, value) => this.onChangeField(field, value)}
						onChangeMarketplaces={this.props.onChangeMarketplaces}
						marketplaces={this.props.marketplaces}
						onNext={() => this.onNextStep()}
						additionalInfo={this.getAdditionalInfo(FIELDS[this.state.currentStep])}/>
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
	},
	additionalInfo: {
		color: Styles.colours.primary,
		fontFamily: Styles.fonts.bold,
		fontSize: 14
	},
	additionalInfoHolder: {
		marginTop: 10,
		width: Dimensions.get("window").width - 60,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"
	}
});