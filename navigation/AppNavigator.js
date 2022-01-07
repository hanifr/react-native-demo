import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Home from '../screens/Home';
import About from '../screens/pedoMeter';
import Chart from '../screens/Chart';
// import pedoMeter from '../screens/pedoMeter';

const MainStack = createStackNavigator();
const Main = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: true,
			}}
		>
			<MainStack.Screen name="Home" component={Home} options={{ title: 'Welcome' }}/>
			<MainStack.Screen name="Chart" component={Chart} />
      <MainStack.Screen name="About" component={About} />
			<MainStack.Screen name="pedoMeter" component={pedoMeter} />
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
           else if(route.name=="About"){
            iconName="ios-information-circle"
          }
          return <Ionicons name={iconName} size={size} color={color} />
          }
         }
         )}
        >
          <Tabs.Screen name="Home" component={Home}/>
          <Tabs.Screen name="Chart" component={Chart} />
          <Tabs.Screen name="About" component={About} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
