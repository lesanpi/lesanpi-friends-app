import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation, logOut }) {


    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TouchableOpacity style={styles.buttonSignIn} onPress={logOut}>
                {
                    <Text style={styles.buttonText}>Log out</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSignIn: {
        width: '90%',
        paddingVertical: 20,
        backgroundColor: '#10ac84',
        borderRadius: 15,
        marginBottom: 10,
        color: '#fff'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    }
});
