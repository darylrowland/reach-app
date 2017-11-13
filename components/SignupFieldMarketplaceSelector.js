import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions
} from 'react-native';

import MarketplaceSelector from "./MarketplaceSelector";

export default class SignupFieldMarketplaceSelector extends Component {
	render() {
		return (
			<View style={localStyles.container}>
				<MarketplaceSelector 
					marketplaces={this.props.marketplaces}
					onChangeMarketplaces={this.props.onChangeMarketplaces}/>
			</View>

		);
	}
}

const localStyles = StyleSheet.create({
	container: {
		height: Dimensions.get("window").height - 180,
		width: Dimensions.get("window").width - 60
	}
});