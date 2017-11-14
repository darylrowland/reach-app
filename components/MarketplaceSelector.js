import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Modal,
	View,
	FlatList
} from 'react-native';

import Styles from "./styles/Styles";
import RateCard from "./RateCard";
import NextTextButton from "./NextTextButton";

const EXAMPLE_MARKETPLACES = [
	{id: "locksmiths", title: "Locksmiths"},
	{id: "homesecurity", title: "Home Security"},
	{id: "safety", title: "Home Safety"}
];

export default class MarketplaceSelector extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			selectedMarketplace: null
		};

		this.reloadMarketplaces = this.reloadMarketplaces.bind(this);
	}

	reloadMarketplaces() {
		// TODO call for a list of marketplaces
		this.setState({
			availableMarketplaces: EXAMPLE_MARKETPLACES
		});
	}

	componentDidMount() {
		this.reloadMarketplaces();
	}
	
	onShowMarketplaceDetails(marketplace) {
		this.setState({
			selectedMarketplace: marketplace
		});
	}

	renderRow(item) {
		var selectedSquare = null;

		if (this.props.marketplaces && this.props.marketplaces[item.id] && this.props.marketplaces[item.id].prices && Object.keys(this.props.marketplaces[item.id].prices).length > 0) {
			// Check that there is at least 1 > 0 price
			var validPriceList = false;

			var itemIds = Object.keys(this.props.marketplaces[item.id].prices);

			for(var i = 0; i < itemIds.length; i++) {
				if (this.props.marketplaces[item.id].prices[itemIds[0]]) {
					validPriceList = true;
					break;
				}
			}

			if (validPriceList) {
				selectedSquare = (
					<View style={localStyles.selectorSquareOn}>
					</View>
				);
			}
		
		}

		return (
			<TouchableOpacity style={localStyles.row} activeOpacity={Styles.activeOpacity} onPress={() => this.onShowMarketplaceDetails(item)}>
				<View style={localStyles.selectorSquare}>
					{selectedSquare}
				</View>
				<Text style={localStyles.title}>{item.title}</Text>
			</TouchableOpacity>
		)
	}

	onCloseRateCard() {
		this.setState({
			selectedMarketplace: null
		});
	}

	render() {
		return (
			<View style={localStyles.container}>
				<Text style={Styles.styles.mediumTitle}>Services you offer</Text>
				<FlatList
					overScrollMode="never"
					alwaysBounceVertical={false}
					data={this.state.availableMarketplaces}
					renderItem={(item) => this.renderRow(item.item)}
					keyExtractor={(item, index) => item.id}
					style={localStyles.list}
					showsVerticalScrollIndicator={false}
					contentInset={{bottom: 100}}
				/>
				<View>
					<NextTextButton title="Next"/>
				</View>
				<RateCard 
					visible={this.state.selectedMarketplace}
					selectedMarketplace={this.state.selectedMarketplace}
					onClose={() => this.onCloseRateCard()}
					marketplaces={this.props.marketplaces}
					onChangeMarketplaces={this.props.onChangeMarketplaces}/>
			</View>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		flex: 1
	},
	selectorSquare: {
		width: 22,
		height: 22,
		borderRadius: 1,
		borderColor: Styles.colours.lightBackground,
		borderWidth: 2,
		marginRight: 10,
		marginLeft: 2,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	selectorSquareOn: {
		width: 8,
		height: 8,
		borderRadius: 1,
		backgroundColor: Styles.colours.primary
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 20,
		paddingBottom: 10,
		borderTopColor: Styles.colours.lightBackground,
		borderTopWidth: 1
	},
	title: {
		marginTop: 8,
		fontSize: 18,
		fontFamily: Styles.fonts.default,
		color: Styles.colours.black
	}
});