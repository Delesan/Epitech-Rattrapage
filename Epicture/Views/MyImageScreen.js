import React, { Component } from 'react';
import { Button, StyleSheet, SafeAreaView, View, TextInput, Text, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { Image } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class img extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: null,
            dataLength: 0,
            imageName: null,
            link: [],
            token: null,
            username: null,
            isLoading: false,
        }
    }
    myImages = async () => {
        try {
            await fetch("https://api.imgur.com/3/account/me/images", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
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
            if (this.state.res[i] && this.state.res[i].link) {
                storeImage.push(this.state.res[i].link);
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
        this.myImages();
    }

    render() {
        return(
            (this.state.link.map((data, index) => {
                console.log(data);
                console.log(index);
                return <Image key={`list-${index}`} style={styles.container} source={data ?{ uri: data} : null}></Image>
            }))
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 600,
        height: 400
    },
});
