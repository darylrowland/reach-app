import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View
} from 'react-native';

import Styles from "./styles/Styles";
import Signup from "./Signup";
import Button from "./Button";

export default class Welcome extends Component {

	constructor(props) {
		super(props);
		this.state = {
			page: "signup"
		};
	}

	showPage(page) {
		this.setState({
			page: page
		});
	}

	render() {
		if (this.state.page == "welcome") {
			return (
				<View style={localStyles.container}>
					<View style={localStyles.content}>
						<Image source={require("../images/reachlogo.png")}/>
					</View>
					<View style={localStyles.buttonHolder}>
						<Button title="SIGNUP" onPress={() => {this.showPage("signup")}}/>
						<Button title="LOGIN" noBorder={() => {this.showPage("login")}}/>
					</View>
				</View>
			);
		} else if (this.state.page == "login") {
			return null;
		} else {
			return (
				<Signup 
					onBack={() => this.showPage("welcome")}
					marketplaces={this.props.marketplaces}
					onChangeMarketplaces={this.props.onChangeMarketplaces}/>
			);
		}
		
	}
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30
	},
	content: {
		flex: 1,
		justifyContent: "center"
	},
	buttonHolder: {
		flexDirection: "column"
	}
});