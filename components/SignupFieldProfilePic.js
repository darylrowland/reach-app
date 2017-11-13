import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	Text,
	View
} from 'react-native';

import Styles from "./styles/Styles";
import ProfilePic from "./ProfilePic";
import NextTextButton from "./NextTextButton";

export default class SignupFieldProfilePic extends Component {

	getTitle(value) {
		if (value) {
			return "Next";
		}

		return "Skip";
	}

	render() {
		return (
			<View style={localStyles.container}>
				<Text style={Styles.styles.mediumTitle}>Make yourself known</Text>
				<ProfilePic uri={this.props.value} onChangeFile={(fileUri) => this.props.onChangeFile(this.props.field, fileUri)}/>
				<Text style={Styles.styles.description}>Upload an image that represents your business</Text>
				<NextTextButton title={this.getTitle(this.props.value)} onNext={this.props.onNext}/>
			</View>
		);
	}
}

const localStyles = StyleSheet.create({
	container: {
		paddingBottom: 20,
		paddingTop: 20,
		flex: 1
	}
});