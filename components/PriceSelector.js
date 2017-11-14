import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	View
} from 'react-native';

import Styles from "./styles/Styles";

const PRICE_INCREMENT = 10;

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

	onChangePrice(increment) {
		if (this.getPrice() + increment >= 0) {
			this.props.onChangePrice(this.getPrice() + increment);
		}
		
	}

	render() {
		return (
			<View style={localStyles.container}>
				<TouchableOpacity activeOpacity={Styles.activeOpacity} hitSlop={Styles.hitSlop} onPress={() => this.onChangePrice(-PRICE_INCREMENT)}>
					<Image source={require("../images/minusbtn.png")}/>
				</TouchableOpacity>
				<Text style={localStyles.price}>£{this.getPrice()}</Text>
				<TouchableOpacity activeOpacity={Styles.activeOpacity} hitSlop={Styles.hitSlop} onPress={() => this.onChangePrice(PRICE_INCREMENT)}>
					<Image source={require("../images/addbtn.png")}/>
				</TouchableOpacity>
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