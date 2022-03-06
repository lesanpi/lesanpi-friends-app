import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const headerOption = {
  title: "",
  headerStyle: {
    backgroundColor: '#222f3e',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: { color: "#fff" },
  headerShadowVisible: false,
  headerTintColor: '#fff'
}

export default function App() {

  const [signedIn, setSignedIn] = useState(false)
  useEffect(() => {
    isSignedIn();
  }, [])

  const storeId = async (value) => {
    try {
      await AsyncStorage.setItem('userId', value)
      setSignedIn(true);
      print('stored id')

    } catch (e) {
      console.log(e);
    }
  }

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      setSignedIn(false);
    } catch (error) {

    }
  }

  const isSignedIn = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId')
      console.log("userId", userId)
      if (userId !== null) {
        setSignedIn(true);
      }
    } catch (e) {
      console.error(e)
      setSignedIn(false);
    }
  }

  if (signedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} logOut={logOut} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator >
    </NavigationContainer >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
