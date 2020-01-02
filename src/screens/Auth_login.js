import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default class Auth_login extends Component {
  constructor(props) {
    super(props);
    state = {
      username: '',
      password: '',
    };
  }

  static navigationOptions = {
    title: 'Login',
  };

  requestLogin = async () => {
    var token = '';
    await axios.post(`http://192.168.43.48:8000/auth/login/`, {
        'username' : this.state.username,
        'password' : this.state.password
    })
    .then(response => {
        token = response.data.token;
    // We set the returned token as the default authorization header
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    })
    .catch(err => console.log(err));

   if(token){
    this.props.navigation.navigate('Home');
   }

   else{
     alert("Credentials Invalid!")
   }
   }

  
   render() {
    return (
      <ImageBackground
        source={require('../img/back.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text style={{fontSize: 50, marginBottom: 50, fontFamily: 'Arial'}}>
            Pet Care
          </Text>
          <View style={styles.inputContainer}>
            <Icon name="user" style={{fontSize: 25, marginLeft: 15}} />
            <TextInput
              style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid="transparent"
              onChangeText={username => this.setState({username})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="eye" style={{fontSize: 25, marginLeft: 15}} />
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({password})}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.requestLogin()}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('Auth_register')}>
            <Text>New Customer? Register</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});
