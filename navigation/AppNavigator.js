import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Home from '../screens/Home';
import About from '../screens/About';
import Chart from '../screens/Chart';
import HomeScreen from '../screens/Home';
// import pedoMeterScreen from '../screens/pedoMeter';

const MainStack = createStackNavigator();
const Main = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<MainStack.Screen name="Home" component={Home} options={{ title: 'Welcome' }}/>
			<MainStack.Screen name="Chart" component={Chart} />
      <MainStack.Screen name="About" component={About} />
			{/* <MainStack.Screen name="pedoMeter" component={pedoMeterScreen} /> */}
		</MainStack.Navigator>
	);
};

const Tabs = createBottomTabNavigator();
export default function App() {
    return (
      <NavigationContainer>
        <Tabs.Navigator   
        screenOptions={({route})=>({
          tabBarActiveTintColor:"#19A78B",
          tabBarInactiveTintColor:"#A0A0A0",
          tabBarLabelStyle: {
              padding: 1
          },
          tabBarStyle: [{display: "flex"}, null],
          tabBarIcon:({focused,color, size})=>{
           let iconName;
           if (route.name=='Home') { 
            iconName='ios-home' 
           }else if(route.name=="Chart"){
             iconName="ios-aperture-outline"
           }
          //  else if (route.name == "pedoMeter"){

          //  }
           else if(route.name=="About"){
            iconName="ios-information-circle"
          }
          return <Ionicons name={iconName} size={size} color={color} />
          }
         }
         )}
        >
          <Tabs.Screen name="Home" component={HomeScreen}/>
          <Tabs.Screen name="Chart" component={Chart} />
          {/* <Tabs.Screen name="pedoMeter" component={pedoMeterScreen} /> */}
          <Tabs.Screen name="About" component={About} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
