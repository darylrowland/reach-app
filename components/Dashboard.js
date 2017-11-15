import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import DashboardHeader from "./DashboardHeader";
import Tabs from "./Tabs";
import Settings from "./Settings";

const TABS = [
	{id: "profile", title: "Profile", iconOn: require("../images/profile_on.png"), iconOff: require("../images/profile_off.png")},
	{id: "jobs", title: "Jobs", iconOn: require("../images/jobs_on.png"), iconOff: require("../images/jobs_off.png")},
	{id: "quotes", title: "Quotes", iconOn: require("../images/quotes_on.png"), iconOff: require("../images/quotes_off.png")},
	{id: "settings", title: "Settings", iconOn: require("../images/settings_on.png"), iconOff: require("../images/settings_off.png")}
];

export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTabIndex: 0
		};
	}

	onChangeTab(tab, index) {
		this.setState({
			selectedTabIndex: index
		});
	}

	renderTab(index) {
		var tabToRender = TABS[index];

		if (tabToRender.id == "settings") {
			return  (
				<Settings onLogout={this.props.onLogout}/>
			);
		} else {
			return null;
		}

	}

	render() {
		return  (
			<View style={localStyles.container}>
				<DashboardHeader title={TABS[this.state.selectedTabIndex].title}/>
				<View style={localStyles.tabContent}>
					{this.renderTab(this.state.selectedTabIndex)}
				</View>
				<Tabs 
					selectedTabIndex={this.state.selectedTabIndex} 
					tabs={TABS}
					onChangeTab={(tab, index) => this.onChangeTab(tab, index)}/>
			</View>
		);
	}
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1
	},
	tabContent: {
		flex: 1
	}
});