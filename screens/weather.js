import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, TextInput, Button, Dimensions  } from 'react-native';
import Layout from '../components/global/Layout';
import Text from '../components/utils/UbuntuFont';
import Chart from '../components/charts/chart'
import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
var mqtt = require('@taoqf/react-native-mqtt')

var client

export default function ({ navigation }) {
// Set input for mqtt server and topic
var mqttServer = 'wss://txio.uitm.edu.my:8888/mqtt'
var mqttTopic1 = 'TRX/data/#'

// Set logic for button, input state for connected and disconnected
const [edit, setEdit] = useState(true)
const [select, setSelect] = useState(true)

// const [textData, setTextData] = useState([])
const [station,setSID]  = useState(null);
const [LAT,setLAT]  = useState(null);
const [LON,setLON]  = useState(null);
const [City,setCity]  = useState(null);
const [TMP,setTMP]  = useState(null);
const [HMD,setHMD]  = useState(null);
const [ATM,setATM]  = useState(null);
const [Visible,setVisible]  = useState(null);
const [WindSpeed,setWindSpeed]  = useState(null);
const [WeatherDescription,setWeatherDescription]  = useState(null);
const [ReqWeatherData, setReqWeatherData] = useState(null);
//const [set] = useState(null);

useEffect(() => {
  try {
    setReqWeatherData(`TRX/data/weather/request`)
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
        if (topic === `TRX/data/gps/random`){
          let data= JSON.parse(message.toString())
          console.log(data)
          setSID(data.station)
          setLAT(data.LAT)
          setLON(data.LON)
          }
        if (topic === `TRX/data/weather/response`){
          let dhmd= JSON.parse(message.toString())
          console.log(dhmd)
          setCity(dhmd.CT)
          setTMP(dhmd.TMP)
          setHMD(dhmd.HMD)
          setWeatherDescription(dhmd.DESC)
          setVisible(dhmd.VCB)
          setATM(dhmd.ATM)
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
	<Layout navigation={navigation} name="weatherStation">
	    {/* <View style={styles.container}> */}
        <ScrollView>
		    <Text style={styles.headerText} bold>Weather Logs</Text>
        <View style={styles.columnSpace}>
            {/* <View>
              <Button
            title="Fill"
            onPress={() => {
              client.publish(ReqWeatherData,'10')
            }
            }
              color="#19A78B"
              />
            </View>
            <View>
              <Button
                title="Stop"
                onPress={() => client.publish(ReqWeatherData,'20')}
                color="#D83B28"
                />
            </View> */}
            <TextInput
                style={{height: 40,backgroundColor: 'azure', fontSize: 20, borderRadius: 5}}  
                placeholder='Insert City'
                onChangeText ={(text)=> (setCity(text))}
                editable={edit} selectTextOnFocus={select}
              />
              <TouchableOpacity
                      onPress={() => {
                        client.publish(ReqWeatherData, City)
                        }}
                        style={styles.touchBox}>
                        <Text style={{ color: 'white' }} bold>
                        Request Weather Data
                        </Text>
              </TouchableOpacity>
              
          </View>
            <View style = {styles.container}>
                <Text style={styles.summaryText} bold >City: {City}   Summary: {WeatherDescription}</Text>
            </View>
                    {/* Humidity and Temperature Data */}
                    <View style={styles.cardContainer}>
                        <View style={{flex:0.45}}>
                            <View>
                                <Chart data={HMD} sensor='HMD' max='100' unit='%' title='Humidity'/>
                                <View style={styles.cardbottom}>
                                <Text style={styles.cardText} bold >Pressure: {ATM} hPa</Text></View>
                            </View>
                        </View>
                        <View style={{flex:0.45}}>
                            <View >
                                <Chart data={TMP} sensor='TMP' max='40' unit='°C' title='Temperature'/>
                                <View style={styles.cardbottom}>
                                <Text style={styles.cardText} bold >Visibility: {Visible} km</Text></View>
                            </View>
                        </View>
                    {/* Humidity Temperature Data */}
                    </View>
                    <Text style={styles.summaryText} bold >LAT: {LAT}   LON: {LON}</Text>
                    <View style={styles.container}>
                          <MapView initialRegion={{
                          latitude: Number(LAT),
                          longitude: Number(LON),
                          // latitude: 3.084868430637176,
                          // longitude: 101.38259426398143,
                          latitudeDelta: 0.04,
                          longitudeDelta: 0.05,
                          }}
                          style={styles.map} />
                    </View>
            </ScrollView>
        {/* </View> */}
	</Layout>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex:1, 
    flexDirection:'row', 
    justifyContent:'space-evenly', 
    marginVertical:5
  },
  headerText: { 
    color: "#231d5e", 
    fontSize: 20,
    textAlign: 'center',
    margin:10, 
    marginBottom:3
  },
  cardtop:{height:"6.5%", backgroundColor:"#231d5e", width:"99%", alignItems: 'center',
  justifyContent: 'center', marginTop:10, marginBottom:5,padding:5, borderRadius: 5, borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  },
  cardCenter:{height:"7%", backgroundColor:"#231d5e", width:"99%", alignItems: 'center',
  justifyContent: 'center', marginTop:5, marginBottom:10,padding:5, borderRadius: 5, 
  },
  cardbottom:{height:"20%", backgroundColor:"#231d5e", width:"99%", alignItems: 'center',
  justifyContent: 'center', marginTop:5, marginBottom:10,padding:5, borderRadius: 5, 
  borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
  },
  touchBox: {
    backgroundColor: 'blue',
    padding: 10,
    paddingHorizontal: 10,
    // marginTop: 10,
    borderRadius: 10,
    },
    columnSpace: {display:'flex', 
    flexDirection:"row", 
    justifyContent:'space-evenly', 
    marginVertical:10
    },
  cardText: { 
    color: "#fcfcfc", 
    fontSize: 14,
    textAlign: 'center',
    margin:10, 
    marginBottom:10
  },
  summaryText: { 
    color: "grey",
    fontSize: 15,
    textAlign: 'center',
    margin:10, 
    marginBottom:5
  },
  map: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height - 500,
  },
});