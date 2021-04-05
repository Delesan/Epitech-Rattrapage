import React, { Component } from 'react';
import { Button, StyleSheet, SafeAreaView, View, TextInput, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Image } from 'react-native-elements'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lenght_img: '',
            ups: '',
            getData: null,
            isLoading: true,
            result: [],
            id: '',
        }
    }
	
    SearchFor = async (input) => {
        try {
	    var storeImage = [];
	    let i = 0;
            fetch("https://api.imgur.com/3/gallery/search?q=" + input, {
                method: 'GET',
                headers: {"Authorization": "Client-ID " + '11da77498871dbb'}
	    }).then(async res => {
		const responseJson = await res.json();
		this.setState({isLoading: false, getData: responseJson.data, lenght_img: responseJson.data, title: responseJson.data})
		while (i != this.state.lenght_img.length) {
		    if (responseJson.data[i] && responseJson.data[i].images && responseJson.data[i].images.length && responseJson.data[i].images[0].link && responseJson.data[i].images[0].link.endsWith('.jpg')) {
			storeImage.push(responseJson.data[i].images[0].link)
		    }
		    i++;
		}
		this.setState({result: storeImage, ups: responseJson.data.ups})
	    }).catch((err) => {
		console.error(err)
	    });
        } catch(err) {
	    console.error("test", err)
        }
    }
    render() {
	const img = this.state.result.map((data, index) => <Image key={`list-${index}`} style={styles.tinyLogo} source={data ?{ uri: data} : null}>
							       <Text>{this.state.ups}</Text>
		                                           </Image>);
        return (
            <SafeAreaView style={{flex:1}}>
                {this.isLoading ? <ActivityIndicator/>:(
                    <View style={styles.container}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={text => this.SearchFor(text)}
                            underlineColorAndroid="transparent"
                            placeholder="Search"
                        />
                            <Button title="Viral" onPress={() => this.props.navigation.navigate('Viral')}/>
                            <Button title="Image" onPress={() => this.props.navigation.navigate('Image')}/>
                            <Button title="Favorite" onPress={() => this.props.navigation.navigate('Favorite')}/>
			<ScrollView>
			    {img}
			</ScrollView>
                    </View>
                )}</SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
	backgroundColor: 'steelblue',
    alignItems:"center",
    justifyContent: "center",
    flexDirection: "column"
    },
    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
	width: 350,
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
    tinyLogo: {
        width: 200,
	height: 200,
	flex: 1,
	justifyContent: 'center',
        alignItems: 'center',
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
	borderBottomLeftRadius: 20,
	borderBottomRightRadius: 20,
	justifyContent: "space-between",
    },
    button: {
	marginTop: 20,
    },
    centered: {
        textAlign: 'center', // <-- the magic
    }
});
