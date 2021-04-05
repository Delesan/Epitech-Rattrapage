import React, { Component } from 'react';
import { Button, StyleSheet, SafeAreaView, View, TextInput, Text, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { Image } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Fav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: null,
            dataLength: 0,
            link: [],
            token: null,
            username: null,
            isLoading: false,
        }
    }
    myFavorites = async () => {
        try {
            await fetch("https://api.imgur.com/3/account/" + this.state.username + "/gallery_favorites", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer" + this.state.token
                },
            }).then(async response => {
                const responseJson = await response.json()
                this.setState({res: responseJson.data, dataLength: responseJson.data.length, isLoading: true})
                this.getImage();
            })
        } catch (err) {
            console.log("error")
        }
    }

    async getImage(){
        let i = 0;
        var storeImage = [];
        while (i != this.state.dataLength) {
            if (this.state.res[i] && this.state.res[i].images && this.state.res[i].images[0].link) {
                storeImage.push(this.state.res[i].images[0].link);
            }
            i++;
        }
        this.setState({link: storeImage,})

        return storeImage;
    }

    async componentDidMount() {
        this.setState({
            token: await AsyncStorage.getItem('accessToken'),
            username: await AsyncStorage.getItem('username'),
        })
        this.myFavorites();
    }

    render() {
        const img = this.state.link.map((data, index) =>
                <Image
                    key={`list-${index}`}
                    style={styles.container}
                    source={{ uri: data}}>
                </Image>);
            return (
                <View style={styles.container}>
	    			<ScrollView>
					{img}
		    		</ScrollView>
                </View>
            )
        }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 412,
        height: 800
    },
});
