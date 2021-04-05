import React, { Component } from 'react';
import { Button, StyleSheet, SafeAreaView, View, TextInput, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Image } from 'react-native-elements'

export default class Viral extends Component {
    constructor(props) {
        super(props);
        this.state = {
			lenght_img: '',
			img: '',
			title: '',
			getData: null,
			isLoading: true,
			result: []
        }
	}
		componentDidMount = async () => {
			console.log("ok");
			try {
				var storeImage = [];
				var storeTitle = [];
				let i = 0;
				fetch('https://api.imgur.com/3/gallery/hot/viral/day/1', {
				method: 'GET',
				headers: {"Authorization": "Client-ID" + '11da77498871dbb'}
			}).then(async res => {
				const responseJson = await res.json();
				this.setState({isLoading: false, getData: responseJson.data, lenght_img: responseJson.data, title: responseJson.data})
				while (i != this.state.lenght_img.length) {
					if (responseJson.data[i] && responseJson.data[i].images && responseJson.data[i].images.length && responseJson.data[i].images[0].link && responseJson.data[i].images[0].link.endsWith('.jpg'))
					storeImage.push(responseJson.data[i].images[0].link)
					i++;
				}
				this.setState({result: storeImage, title: storeTitle})
			}).catch((err) => {
				console.error(err)
			});
		} catch(err) {
			console.error("test", err)
		}
	}

    render() {
		const img = this.state.result.map((data, index) => <Image key={`list-${index}`} style={styles.tinyLogo} source={data ?{ uri: data} : null}></Image>);
        return (
            <View style={styles.container}>
				<ScrollView>
					{img}
				</ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
	container: {
	  backgroundColor: 'white',
	  alignItems:"center"
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
  