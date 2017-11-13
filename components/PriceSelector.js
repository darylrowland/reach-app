import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View
} from 'react-native';

import Styles from "./styles/Styles";

export default class PriceSelector extends Component {

	constructor(props) {
		super(props);
		this.state = {
			price: 0
		};

		this.getPrice = this.getPrice.bind(this);
	}

	getPrice() {
		if (this.props.price) {
			return this.props.price;
		}

		return 0;
	}

	render() {
		return (
			<View style={localStyles.container}>
				<Image source={require("../images/minusbtn.png")}/>
				<Text style={localStyles.price}>£{this.getPrice()}</Text>
				<Image source={require("../images/addbtn.png")}/>
			</View>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: 80
	},
	price: {
		fontFamily: Styles.fonts.bold,
		fontSize: 18,
		marginTop: 5,
		color: Styles.colours.black
	}
});