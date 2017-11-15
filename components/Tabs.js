import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import Styles from "./styles/Styles";
import Tab from "./Tab";

export default class Tabs extends Component {
	render() {
		return (
			<View style={localStyles.container}>
				{this.props.tabs.map((tab, index) => {
					return (
						<Tab 
							onPress={() => this.props.onChangeTab(tab, index)}
							key={tab.id} 
							tab={tab} 
							selected={index == this.props.selectedTabIndex}/>
					);
				})}
			</View>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		paddingTop: 5,
		paddingBottom: 5,
		flexDirection: "row",
		justifyContent: "space-around",
		borderTopWidth: 1,
		borderTopColor: Styles.colours.lightBackground
	}
});