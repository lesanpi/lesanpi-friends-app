import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen({ navigation, storeId }) {

    console.log("storeIdFunction", storeId)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [status, setStatus] = useState({
        status: "",
        message: ""
    })

    const handleChange = (name, value) => setCredentials({ ...credentials, [name]: value })

    const handleSubmit = async () => {
        const url = "http://192.168.1.103:3000/signin";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json();
            setStatus(data)

            console.log('hola')
            if (status.status == "success") {
                console.log('success, store and navigate')
                storeId(data.user._id)
                navigation.navigate("Home")
                console.log('finish success, store and navigate')

            }
        } catch (error) {
            setStatus({
                status: "failed",
                message: "An error occurred"
            });
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#546574"
                onChangeText={(text) => handleChange('email', text)}
                value={credentials.email}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#546574"
                onChangeText={(text) => handleChange('password', text)}
                value={credentials.password}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.buttonSignIn} onPress={handleSubmit}>
                {
                    <Text style={styles.buttonText}>Sign In</Text>
                }
            </TouchableOpacity>
            {
                status.status ?
                    <Text style={{ color: status.status == "failed" ? "#f54254" : "#10ac84" }}>{status.message}</Text>
                    :
                    <View />
            }
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
    input: {
        width: '90%',
        marginBottom: 8,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#10ac84',
        height: 55,
        color: '#222',
        padding: 15,
        borderRadius: 15
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
