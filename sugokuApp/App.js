import React from 'react';
import { View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

import Home from './screens/Home';
import Games from './screens/Games';
import HowToPlay from './screens/HowToPlay'

const Stack = createStackNavigator();

export default function App() {
  return(
    <>
      <View style={styles.statusBar} />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false,}}></Stack.Screen>
            <Stack.Screen name="Games" component={Games} options={{headerShown: false,}}></Stack.Screen>
            <Stack.Screen name="HowToPlay" component={HowToPlay} options={{headerShown: false,}}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    </>
  )
}
const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#b19cff",
    height: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: "#b19cff",
    height: 50
  }
})