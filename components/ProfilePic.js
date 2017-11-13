import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';

import Styles from "./styles/Styles";

import ImagePicker from "react-native-image-picker";

export default class ProfilePic extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	onChangePic() {
		ImagePicker.showImagePicker({title: "Choose a picture", noData: true}, (response) => {
			if (response.didCancel) {
			  console.log('User cancelled image picker');
			} else if (response.error) {
			  console.log('ImagePicker Error: ', response.error);
			} else if (response.uri) {
			  this.setState({
				chosenPic: {uri: response.uri}
			  }, () => {
				  this.props.onChangeFile(response.uri);
			  });
			}
		  });
	}

	render() {
		var pic;

		if (this.state.chosenPic) {
			pic = (
				<Image source={this.state.chosenPic} style={localStyles.profilePic}/>
			);
		} else {
			pic = (
				<View style={localStyles.cameraHolder}>
					<View style={localStyles.plusCircle}>
						<Image source={require("../images/add.png")}/>
					</View>
				</View>
			)
		}


		return (
			<TouchableOpacity style={localStyles.pic} onPress={() => this.onChangePic()}>
				{pic}
			</TouchableOpacity>	
		);
	}
}

const localStyles = StyleSheet.create({
	pic: {
		width: 120,
		height: 120,
		borderRadius: 10,
		backgroundColor: Styles.colours.primary,
		borderRadius: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden"
	},
	profilePic: {
		width: 120,
		height: 120
	},
	cameraHolder: {
		backgroundColor: Styles.colours.white,
		width: 60,
		height: 30,
		borderRadius: 2,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	plusCircle: {
		width: 22,
		height: 22,
		borderRadius: 11,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Styles.colours.primary
	}
});