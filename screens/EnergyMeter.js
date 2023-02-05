// import { StatusBar } from 'expo-status-bar';
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

function EnergyScreen({ navigation }) {
// Set input for mqtt server and topic
var mqttServer = 'wss://txio.uitm.edu.my:8888/mqtt'
var mqttTopic1 = 'TRX/data/#'

// Set logic for button, input state for connected and disconnected
const [TotalExportkWh,setTotalExportkWh]  = useState(null);
const [PowerDemand,setPowerDemand]  = useState(null);
const [Volt,setVolt]  = useState(null);
const [Curr,setCurr]  = useState(null);
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
			if (topic === `TRX/data/sem`){
				let energyData= JSON.parse(message.toString())
				//Raw Data in PPT
				setTotalExportkWh(energyData.EAE)
                setPowerDemand(energyData.PD)
                setVolt(energyData.VOLT)
                setCurr(energyData.CURR)
				console.log(TotalExportkWh)
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
            colors={['#edc240', '#8a190f']}
            style={{width:'99%',height:100, backgroundColor:'#19A78B', justifyContent:'flex-end', paddingBottom:10, paddingLeft:15, borderRadius:10}}
            >
            <Text bold style={{color:'#faf3f2', fontSize:30, paddingBottom:5}}>Unit Fasiliti UiTM</Text>
            <Text style={{color:'#decab8', fontSize:16}}>ENERGY meter</Text>
				<Ionicons name="ios-flash-outline" size={90} color="#e9f0ef" style={{width: 150,
                  height: 120, borderRadius:10, position:'absolute', right:-40, top:5}}/>
          </LinearGradient>
		  		<View style = {styles.cardCenter}>
                    <Chart data={TotalExportkWh} sensor='Export Energy' max='100' unit='kWh' title='Total Export Energy'/>
                    <View style={styles.gaugeText}>
                    <Text style={styles.cardText} >Voltage: {Volt} V</Text>
                    <Text style={styles.cardText} >Current: {Curr} A</Text></View>
                </View>
				<View style = {styles.cardbottom}>

				<View style={styles.textContainer}>
					<Text bold style = {styles.infoText} >Energy Information</Text>
					<View style = {styles.cardChart}>
					<Text bold style={styles.bottomHeaderText}>Power Demand Status: {PowerDemand} W</Text>
					<Text bold style={styles.bottomHeaderText}>Voltage Reading: {Volt} V</Text>
					</View>
      				{/* <Text style={styles.bottomText}>Please make sure to have personal protection equipment on hand. </Text> */}
					<Text style={styles.bottomText}>Demand charges are calculated using the single highest 15-minute interval of power consumption over the billing cycle multiplied by the current per kW rate. As a point of reference, the average United Power residential demand is 7 kW. </Text>
				</View>
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
		margin:-15, 
		marginBottom:10
	},
	infoText: { 
		right:90,
		fontSize: 20,
		textAlign: 'center',
		color: "#0f5259", 
		marginBottom:2
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
		margin:5, 
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
		height:"52%", backgroundColor:"#decab8", width:"99%", alignItems: 'center', 
	  	justifyContent: 'center', marginTop:5,padding:5, borderRadius: 5, borderColor: '#ccc',
	},
	cardbottom:{
		height:"30%", backgroundColor:"#decab8", width:"99%", alignItems: 'center',
		justifyContent: 'center', marginTop:5,padding:5, borderRadius: 5, 
		borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: '#ccc',
	},
	cardChart:{
		height:"35%", backgroundColor:"#e1eef0", width:"99%", alignItems: 'center',
 	 	justifyContent: 'center', marginTop:2, padding:5, borderRadius: 15,
  	},
});

export default EnergyScreen;