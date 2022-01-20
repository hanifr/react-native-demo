import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Pedometer } from 'expo-sensors';
import Layout from '../components/global/Layout';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { ProgressChart } from 'react-native-chart-kit';


function pedoMeterScreen({ navigation }) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  let currentStepCountPercentage = currentStepCount/10000;
  let pastStepCountPercentage = pastStepCount/10000;

  const data = {
    labels: ["C", "24H", "To go"], // optional
    data: [currentStepCountPercentage, pastStepCountPercentage, 0.8]
  };  
  let _subscription;

  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount(result => {
      setCurrentStepCount(result.steps);
      console.log(currentStepCount);
    });

    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable(result);
      },
      error => {
        setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error);
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        setPastStepCount(result.steps);
      },
      error => {
        setPastStepCount('Could not get stepCount: ' + error);
      }
    );
  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };


  useEffect(()=>{
    _subscribe();
    return ()=> _unsubscribe();
  },[])

    return (
      <Layout navigation={navigation} name="pedoMeter">
      <View style={styles.container}>
        <View style={styles.cardtop}>
        <View style={styles.cardContainer}>
            {/* <Text style={styles.cardText} bold >Pedometer is available: {isPedometerAvailable}    Current Step Counts: {currentStepCount}</Text> */}
            {/*Wheel Chart*/}
              <View style={{flex:0.25}}>
                <AnimatedProgressWheel 
                  size={70} 
                  width={15} 
                  color={'green'}
                  progress={(pastStepCount/100)}
                  backgroundColor={'#ccc'}
                  />
                <Text style={styles.cardText}>24 Hours</Text>
                <Text style={{justifyContent: 'center',left:15,}}>{(pastStepCount/100)}</Text>
                </View>
              <View style={{flex:0.25}}>
                <AnimatedProgressWheel 
                  size={70} 
                  width={15} 
                  color={'green'}
                  progress={(currentStepCount/100)}
                  backgroundColor={'#ccc'}
                  />
                <Text style={styles.cardText}>Current</Text>
                <Text style={{justifyContent: 'center',left:15,}}>{(currentStepCount/100)}</Text>
                </View>
                {/*Wheel Chart*/}
                </View>
          </View>
         <View style={styles.cardCenter}>
         <Text style={styles.cardText} bold >Steps Counts Progress</Text>
            <View style={styles.cardContainer}>
              
            {/* <lineChart title='Last 24 Hours' data={pastStepCount}/> */}
                {/*Progress Chart*/}
                <ProgressChart
                  data={data}
                  width={300}
                  height={220}
                  strokeWidth={16}
                  radius={32}
                  hideLegend={false}
                  chartConfig={{
                    bbackgroundGradientFrom: "#1E2923",
                    backgroundGradientFromOpacity: 1,
                    backgroundGradientTo: "#08130D",
                    backgroundGradientToOpacity: 0.1,
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }} />
               {/*Progress Chart*/}
            </View>
          </View>
          <View style={styles.cardbottom}>
            <Text style={styles.cardText} bold >Steps in last 24 Hours: {pastStepCount}    Current Step Counts: {currentStepCount}</Text>
		      </View>
        {/* <Text>Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}</Text>
        <Text>Steps taken in the last 24 hours: {this.state.pastStepCount}</Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text> */}
      </View>
      </Layout>
    );
}

const styles = StyleSheet.create({
  height: Platform.OS === 'android' ? 70 : 90,
  container: {
    flex: 1,
    // marginTop: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex:1, 
    flexDirection:'row', 
    justifyContent:'space-evenly', 
    marginVertical:15
  },
  cardtop:{height:"20%", backgroundColor:"gray", width:"99%", alignItems: 'center',
  justifyContent: 'center', marginTop:10, padding:5, borderRadius: 5, borderTopLeftRadius: 20,
  borderTopRightRadius: 15, borderColor: 'black',
  },
  cardCenter:{height:"45%", backgroundColor:"gray", width:"99%", alignItems: 'center',
  justifyContent: 'center', marginTop:5,padding:5, borderRadius: 5, borderColor: '#ccc',
  },
  cardbottom:{height:"35%", backgroundColor:"gray", width:"99%", alignItems: 'center',
  justifyContent: 'center', marginTop:5,padding:5, borderRadius: 5, 
  borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderColor: '#ccc',
  },
  cardText: { 
    color: "#fcfcfc", 
    fontSize: 14,
    margin:10, 
    marginBottom:10
  },
});

export default pedoMeterScreen;