/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Home from './Views/HomeScreen';
import Login from './Views/LoginScreen';
import Viral from './Views/ViralScreen';
//import Search from './Views/SearchScreen';
import Image from './Views/MyImageScreen';
import Favorite from './Views/FavoriScreen';

import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component {
	state = {
		isLog: false,
	};
	stateView = (log) => {
		this.setState({ isLog: log })
	}
	
	render() {
		if (this.state.isLog === false) {
			return <Login changeLog={this.stateView }/>
		} else {
			return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name= "Home" component={Home}/>
					<Stack.Screen name= "Viral" component={Viral}/>
					<Stack.Screen name= "Image" component={Image}/>
					<Stack.Screen name= "Favorite" component={Favorite}/>
				</Stack.Navigator>
			</NavigationContainer>
			)
		}
	}
}
