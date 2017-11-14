import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import Styles from "./styles/Styles";
import Welcome from "./Welcome";

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: null,
			marketplaces: {
				
			}	
		};
	}

	onChangeMarketplaces(marketplaces) {
		this.setState({
			marketplaces: marketplaces
		});
	}

	render() {
		if (this.state.user) {
			return (
				<View style={localStyles.container}>
					
				</View>
			);
		} else {
			return (
				<Welcome
					marketplaces={this.state.marketplaces}
					onChangeMarketplaces={(marketplaces) => this.onChangeMarketplaces(marketplaces)}
				/>
			);
		}
		
	}
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Styles.colours.white
	}
});