import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Layout from '../components/global/Layout';
// import Text from '../components/utils/UbuntuFont';
// import Colors from '../constants/colors';
export default function ({ navigation }) {
	return (
		<Layout navigation={navigation} name="Home">
			<View style={styles.container}>
			
			<LinearGradient
            // Button Linear Gradient
            colors={['#115757', '#07a6a6']}
            style={{width:'99%',height:120, backgroundColor:'#19A78B', justifyContent:'flex-end', paddingBottom:10, paddingLeft:15, borderRadius:10}}
            >
            <Text style={{color:'white', fontSize:18, fontWeight:'bold', paddingBottom:5}}>usernameDisplay</Text>
            <Text style={{color:'white', fontSize:18}}>stationDisplay</Text>
            <Image
                style={{width: 150,
                  height: 100, borderRadius:10, position:'absolute', right:10, top:10}}            
                  source={require('../assets/adaptive-icon.png')}
                resizeMode="cover"
              />
          </LinearGradient>
		  <View style = {styles.cardtop}>
				<Text bold>This is Profile tab</Text>
				<Text>This tab not using Top navigation</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('pedoMeter');
					}}
					style={styles.touchButton}
				>
					<Text style={styles.touchText} bold>
						pedoMETER
					</Text>
				</TouchableOpacity>
				</View>
				<View style = {styles.cardtop}>
				<Text bold>This is Profile tab</Text>
				<Text>This tab not using Top navigation</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('About');
					}}
					style={styles.touchButton}
				>
					<Text style={styles.touchText} bold>
						Go to second screen
					</Text>
				</TouchableOpacity>
				</View>
			</View>
		</Layout>
	);
}

// Styling Module

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	touchButton: {
		backgroundColor: 'gray',
		padding: 10,
		paddingHorizontal: 20,
		marginTop: 10,
		borderRadius: 10,
	},
	touchText: { 
		color: 'white',
		fontSize: 14,
    	margin:10, 
   	 	marginBottom:10

 	},
	 cardtop:{
		height:"25%", backgroundColor:"gray", width:"99%", alignItems: 'center',
 	 	justifyContent: 'center', marginTop:10, padding:5, borderRadius: 15,
  	},
	cardChart:{
		height:"40%", backgroundColor:"gray", width:"99%", alignItems: 'center',
 	 	justifyContent: 'center', marginTop:10, padding:5, borderRadius: 15,
  	},
});
