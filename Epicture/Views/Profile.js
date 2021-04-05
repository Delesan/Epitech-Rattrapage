import React, { Component } from 'react';
import { Button, StyleSheet, SafeAreaView, View, TextInput, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Image } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Profile extends Component {
    constructor(props) {
		super(props);
		this.state = {
			check: false,
			accessToken: '',
		}
	}
	componentDidMount = async () => {
        try {
            const username = await AsyncStorage.getItem('accessToken')
            fetch('https://api.imgur.com/3/account/{{username}}')
        }
    }
}