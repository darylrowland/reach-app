import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Modal,
	FlatList,
	StatusBar,
	View
} from 'react-native';

import Styles from "./styles/Styles";
import Button from "./Button";
import PriceSelector from "./PriceSelector";
import update from "react-addons-update";

const EXAMPLE_RATES = [
	{id: 1, title: "Lock set installation blah oh yeah"},
	{id: 2, title: "Lock repair/fix"},
	{id: 3, title: "Lock change"}
];

export default class RateCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			availableRates: null,
			loading: true
		};

		this.getPrice = this.getPrice.bind(this);
	}

	componentDidMount() {
		this.reloadRateCard();
	}

	reloadRateCard() {
		// TODO load rate card in here
		this.setState({
			availableRates: EXAMPLE_RATES
		});
	}

	onChangePrice(item, price) {
		var updatedMarketplaces = update(this.props.marketplaces, {$apply: (marketplaces) => {
			if (!marketplaces[this.props.selectedMarketplace.id]) {
				marketplaces[this.props.selectedMarketplace.id] = this.props.selectedMarketplace;
			}
	
			if (!marketplaces[this.props.selectedMarketplace.id].prices) {
				marketplaces[this.props.selectedMarketplace.id].prices = {};
			}
	
			marketplaces[this.props.selectedMarketplace.id].prices[item.id] = price;
	
			return marketplaces;
		}});
		
		this.props.onChangeMarketplaces(updatedMarketplaces);
	}

	getPrice(item) {
		if (this.props.marketplaces[this.props.selectedMarketplace.id] && this.props.marketplaces[this.props.selectedMarketplace.id].prices && this.props.marketplaces[this.props.selectedMarketplace.id].prices[item.id]) {
			return this.props.marketplaces[this.props.selectedMarketplace.id].prices[item.id];
		}

		return 0;
	}

	renderRow(item) {
		return (
			<View style={localStyles.row}>
				<Text style={localStyles.title} numberOfLines={3}>{item.title}</Text>
				<PriceSelector price={this.getPrice(item)} onChangePrice={(price) => this.onChangePrice(item, price)}/>
			</View>
		)
	}

	render() {
		return (
			<Modal visible={this.props.visible != null} animationType="slide" transparent={true}>
				<StatusBar hidden={true}/>
				<View style={localStyles.overlay}>
					<View style={localStyles.container}>
						<View style={localStyles.content}>
							<Text style={Styles.styles.smallTitle}>Build your rate card</Text>
							<Text style={[Styles.styles.description, localStyles.description]}>Set prices for your work</Text>
							<FlatList
								overScrollMode="never"
								alwaysBounceVertical={false}
								data={this.state.availableRates}
								extraData={this.props.marketplaces}
								renderItem={(item) => this.renderRow(item.item)}
								keyExtractor={(item) => item.id}
								style={localStyles.list}
							/>
						
						</View>
						<Button title="Close" noBorder={false} onPress={this.props.onClose}/>
					</View>
				</View>
			</Modal>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		backgroundColor: Styles.colours.white
	},
	list: {
		marginTop: 10
	},
	row: {
		paddingTop: 20,
		paddingBottom: 10,
		borderTopColor: Styles.colours.lightBackground,
		borderTopWidth: 1,
		borderBottomColor: Styles.colours.lightBackground,
		borderBottomWidth: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between"
	},
	title: {
		fontSize: 18,
		fontFamily: Styles.fonts.default,
		color: Styles.colours.black,
		flex: 1,
		marginRight: 10
	},
	description: {
		marginTop: 0,
		color: Styles.colours.lightBackground,
		fontFamily: Styles.fonts.bold
	},
	overlay: {
		backgroundColor: "rgba(0,0,0,0.5)",
		flex: 1,
		padding: 20,
		paddingTop: 30,
		paddingBottom: 0
	},
	content: {
		flexDirection: "column",
		flex: 1
	}
});