import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Colors from '../constants/colors';
// import TabBarIcon from '../components/utils/TabBarIcon';
// import TabBarText from '../components/utils/TabBarText';

import Home from '../screens/Home';
import About from '../screens/About';
import Chart from '../screens/Chart';

const MainStack = createStackNavigator();
const Main = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<MainStack.Screen name="MainTabs" component={MainTabs} />
			<MainStack.Screen name="Chart" component={Chart} />
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
