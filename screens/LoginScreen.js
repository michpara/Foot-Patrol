import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Dimensions } from 'react-native';

import { InputField, ErrorMessage } from '../components';
import Welcome from '../components/Welcome.js';
import Arrow from '../components/Arrow.js';

import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '' && email.includes("@uottawa.ca")) {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Arrow/>
        
      <Welcome/>
      <View style={styles.container1}>
        <InputField
          style={styles.input}
          leftIcon='email'
          placeholder='Enter email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          autoFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={styles.style} />
      </View>
      <View style={styles.container2}>
        <InputField
          style={styles.input}
          leftIcon='lock'
          placeholder='Enter password'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType='password'
          rightIcon={rightIcon}
          value={password}
          onChangeText={text => setPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <View style={styles.style} />
      </View>
      <View style={styles.button}>
        <Button 
        onPress={onLogin}
        title='Log in' 
        color='#7C63E3'
        style={styles.text} 
        />
        <Button
          onPress={() => navigation.navigate('Signup')}
          title='Go to Signup'
          color='#7C63E3'
          style={styles.text} 
        />
      </View>
    </View>
  );
}


const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const scale_w1= SCREEN_WIDTH/12
const scale_h1=SCREEN_HEIGHT/3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  container1: {
    flex: 1,
    left: SCREEN_WIDTH/9.9,
    bottom:40
  },
  container2: {
    flex: 1,
    left: SCREEN_WIDTH/9.9,
    bottom: 110
  },
  container3: {
    flex: 1,
    left: SCREEN_WIDTH/9.9,
    bottom: 180
  },
  container4: {
    flex: 1,
    left: SCREEN_WIDTH/9.9,
    marginBottom: -160,
    bottom: 250
  },
  input: {
    fontSize: 20,
    width: 300,
    marginBottom: 5,
  },
  style: {
    alignItems:'flex-start',
    justifyContent:'center',
    borderBottomColor: '#7C63E3',
    borderBottomWidth: 2,
    width: 300,
  },
  button: {
    flex: 1,
    alignItems:'flex-start',
    justifyContent:'center',
    fontSize: 20,
    left: scale_w1,
    bottom: scale_h1,
  },
  text: {
    fontSize: 20
  }
});

