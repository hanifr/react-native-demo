import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Layout from '../components/global/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chart from '../components/charts/gauge'
// const HomeStack = createStackNavigator();
import Text from '../components/utils/UbuntuFont';
// import Colors from '../constants/colors';

var mqtt = require('@taoqf/react-native-mqtt')

var client

function HomeScreen({ navigation }) {
// Set input for mqtt server and topic
var mqttServer = 'wss://txio.uitm.edu.my:8888/mqtt'
var mqttTopic1 = 'TRX/data/#'

// Set logic for button, input state for connected and disconnected
const [Geyzer,setGeyzer]  = useState(null);
useEffect(() => {
	try {
	//   setReqWeatherData(`TRX/data/weather/request`)
	  client = mqtt.connect(mqttServer)
	  client.on('connect', ()=>
	{
	  client.subscribe(mqttTopic1, function (err) {
		if (err) {
		  console.log(err)
		  client.end()
		}else{
		  console.log('connected',mqttTopic1)        
		}
	  })
	  
	  client.on('message', function(topic,message) {
		try {
			if (topic === `TRX/data/bomba/geyzer`){
				let gasData= JSON.parse(message.toString())
				setGeyzer(gasData.D7)
					console.log(gasData)
					}
		  }catch (error) {
		  console.log('error parse')
		}
	  });
	}
	)
  
	} catch (error) {
	   console.log(error)
	}
  }, []) //re-run function if connect button is clicked
  
  useEffect(() => {
	
  }, [])
	return (
		<Layout navigation={navigation} name="Home">
			<View style={styles.container}>
			
			<LinearGradient
            // Button Linear Gradient
            colors={['#db1d3f', '#4a3e32']}
            style={{width:'99%',height:100, backgroundColor:'#19A78B', justifyContent:'flex-end', paddingBottom:10, paddingLeft:15, borderRadius:10}}
            >
            <Text bold style={{color:'#faf3f2', fontSize:18, paddingBottom:5}}>HARTAMAS FIRE DEPARTMENT</Text>
            <Text style={{color:'#decab8', fontSize:16}}>GAS Detector</Text>
            {/* <Image
                style={{width: 150,
                  height: 100, borderRadius:10, position:'absolute', right:10, top:10}}            
                  source={require('../assets/adaptive-icon.png')}
				
                resizeMode="cover"
              /> */}
				<Ionicons name="ios-flash-outline" size={90} color="#e9f0ef" style={{width: 150,
                  height: 120, borderRadius:10, position:'absolute', right:-40, top:5}}/>
				   {/* <View style={styles.container}>
      				<Ionicons name="md-checkmark-circle" size={32} color="green" />
    			</View> */}
          </LinearGradient>
		  		<View style = {styles.cardCenter}>
                    <Chart data={Geyzer} sensor='Methane' max='500' unit='ppt' title='Methane'/>
                    <View style={styles.gaugeText}>
                    <Text style={styles.cardText} bold >Gas Concentration: {Geyzer} ppt</Text></View>
				</View>
				<View style = {styles.cardbottom}>

				<View style={styles.textContainer}>
					<Text bold style={styles.bottomHeaderText}>Intensity level: {(Geyzer/500)*100} %</Text>
      				<Text style={styles.bottomText}>Please make sure to have personal protection equipment on hand. </Text>
					<Text style={styles.bottomText}>Keep an eye on the gas concentration and avoid approaching the area if it is higher than 25%. </Text>
				</View>
				{/* <Text bold>This is Profile tab</Text>
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
				</TouchableOpacity> */}
				</View>
			</View>
		</Layout>
	);
}

// Styling Module

const styles = StyleSheet.create({
	height: Platform.OS === 'android' ? 70 : 90,
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
	cardText: { 
		color: "#755044", 
		fontSize: 18,
		textAlign: 'center',
		margin:-20, 
		marginBottom:10
	},
	textContainer: { 
		// flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
		color: "#fcfcfc", 
	},
	bottomHeaderText: { 
		color: "#5c5b28", 
		fontSize: 18,
		textAlign: 'left',
		margin:10, 
	},
	bottomText: { 
		color: "#755044", 
		fontSize: 16,
		textAlign: 'justify',
		margin:5, 
	},
	gaugeText:{
		height:"20%", backgroundColor:"#decab8", width:"99%", alignItems: 'center', 
	  	justifyContent: 'center', marginTop:5,padding:5, borderRadius: 5, borderColor: '#ccc',
	},
	 cardtop:{
		height:"25%", backgroundColor:"gray", width:"99%", alignItems: 'center',
 	 	justifyContent: 'center', marginTop:10, padding:5, borderRadius: 15,
  	},
	cardCenter:{
		height:"50%", backgroundColor:"#decab8", width:"99%", alignItems: 'center', 
	  	justifyContent: 'center', marginTop:5,padding:5, borderRadius: 5, borderColor: '#ccc',
	},
	cardbottom:{
		height:"30%", backgroundColor:"#decab8", width:"99%", alignItems: 'center',
		justifyContent: 'center', marginTop:5,padding:5, borderRadius: 5, 
		borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: '#ccc',
	},
	cardChart:{
		height:"40%", backgroundColor:"gray", width:"99%", alignItems: 'center',
 	 	justifyContent: 'center', marginTop:10, padding:5, borderRadius: 15,
  	},
});

export default HomeScreen;