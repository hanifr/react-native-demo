import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import Layout from '../components/global/Layout';
import { BarChart } from "react-native-chart-kit";
  
var mqtt = require('@taoqf/react-native-mqtt')

var client

export default function ({ navigation }) {

	const screenWidth = Dimensions.get("window").width;
	
	const chartConfig = {
		backgroundGradientFrom: "#1E2923",
		backgroundGradientFromOpacity: 0.6,
		backgroundGradientTo: "#08130D",
		backgroundGradientToOpacity: 0.4,
		color: (opacity = 1) => `rgba(26, 255, 16, ${opacity})`,
		strokeWidth: 2, // optional, default 3
		barPercentage: 0.5,
		useShadowColorFromDataset: false // optional
	  };  
	// Set input for mqtt server and topic
var mqttServer = 'wss://txio.uitm.edu.my:8888/mqtt'
var mqttTopic = 'TRX/data/#'

const [TMP,setTMP]  = useState(null);
const [HMD,setHMD]  = useState(null);
const [Geyzer,setGeyzer]  = useState(null);
	useEffect(() => {
		try {
		  client = mqtt.connect(mqttServer)
		  client.on('connect', ()=>
		{
		  client.subscribe(mqttTopic, function (err) {
			if (err) {
			  console.log(err)
			  client.end()
			}else{
			  console.log('connected',mqttTopic)        
			}
		  })
		  
		  client.on('message', function(topic,message) {
			try {
			  if (topic === `TRX/data/gps/random`){
				let data= JSON.parse(message.toString())
				console.log(data)
				}
			  if (topic === `TRX/data/hmd/random`){
				let dhmd= JSON.parse(message.toString())
				setHMD(dhmd.txHMD)
				setTMP(dhmd.txTMP)
				console.log(dhmd)
				}
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
		<Layout navigation={navigation}>
			<View style={styles.container}>
			<View style = {styles.cardChart}>
				<BarChart
					// style={graphStyle}
					data={{
						labels: ["TMP", "HMD", "GAS", "D4", "D5", "D6"],
						datasets: [
						  {
							data: [TMP, HMD, Geyzer, 30, 19, 43]
						  }
						]
					  }}
					width={screenWidth}
					height={280}
					// yAxisLabel="$"
					chartConfig={chartConfig}
					verticalLabelRotation={30}
					/>
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
	 cardtop:{
		height:"25%", backgroundColor:"gray", width:"99%", alignItems: 'center',
 	 	justifyContent: 'center', marginTop:10, padding:5, borderRadius: 15,
  	},
	cardChart:{
		height:"40%", backgroundColor:"gray", width:"99%", alignItems: 'center',
 	 	justifyContent: 'center', marginTop:10, padding:5, borderRadius: 15,
  	},
});