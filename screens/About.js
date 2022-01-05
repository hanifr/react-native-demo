import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Layout from '../components/global/Layout';
// import Text from '../components/utils/UbuntuFont';
export default function ({ navigation }) {
	return (
		<Layout navigation={navigation} title="About">
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* This text using ubuntu font */}
				<Text bold>This is About tab</Text>

				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Chart');
					}}
					style={{
						backgroundColor: 'blue',
						padding: 10,
						paddingHorizontal: 20,
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Text style={{ color: 'white' }} bold>
						Chart Screen
					</Text>
				</TouchableOpacity>
			</View>
		</Layout>
	);
}
