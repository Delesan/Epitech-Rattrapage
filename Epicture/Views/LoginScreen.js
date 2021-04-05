import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'

export default class Webview extends Component {
    _isMounted = false;
    
    constructor(props) {
	super(props);
	this.state = {
	    check: false,
	    accessToken: '',
	}
    }
    getAccessToken = async (token) => {
	try {
	    account_username = token.url.match(/&(?:account_username)\=([\S\s]*?)&/)[1];
	    access_token = token.url.match(/#(?:access_token)\=([\S\s]*?)&/)[1];
	    await AsyncStorage.setItem('accessToken', access_token)
	    await AsyncStorage.setItem('username', account_username)
	    console.log(access_token);
	    const username = await AsyncStorage.getItem('username');
	    console.log(username);
			this.props.changeLog(true)
			if (this._isMounted)
				this.setState({ accessToken: access_token, checked: true})
		} catch (err) {
			console.log('message error', err)
		}
	}
	componentDidMount = async () => {
		const token = await AsyncStorage.getItem('token');
        if (token !== null) {
			this._isMounted = true
            this.props.changeLog(true);
        }
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	renderWebView = () => {
		if (this.state.check) {
			return (
				<WebView
					ref="webview"
					source={{
					uri: 'https://api.imgur.com/oauth2/authorize?client_id=2601143234c8173&response_type=token'
				}}
				onNavigationStateChange={this.getAccessToken}
				style={{ marginTop: 20 }}
				/>
			);
		} else {
			return (
				<TouchableOpacity style={styles.button}
					onPress={() => this.setState({check:true})}>
					<Text>Connection</Text>
				</TouchableOpacity>
			)
		}
	}
	render() {
		return (
			<View style={styles.container}>
				{this.renderWebView()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 10
	},
	button: {
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		padding: 10
	},
});
