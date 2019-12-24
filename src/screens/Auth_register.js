import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default class Auth_register extends Component {
  constructor(props) {
    super(props);
    state = {
      username: '',
      password: '',
      email: '',
    };
  }

  static navigationOptions = {
    title: 'Register',
  };

  submitRequest = async () => {
    await axios.post('http://192.168.1.6:8000/auth/register/', {
      'username' : this.state.username,
      'password' : this.state.password,
      'email' : this.state.email
    })
    alert('Done')
   } 

  render() {
    return (
      <ImageBackground
        source={require('../img/back.jpg')}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.container}>
          <Icon style={{fontSize: 70, marginBottom: 50}} name="paw" />
          <View style={styles.inputContainer}>
            <Icon name="user" style={{fontSize: 25, marginLeft: 15}} />
            <TextInput
              style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid="transparent"
              onChangeText={username => this.setState({username : username})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="eye" style={{fontSize: 25, marginLeft: 15}} />
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({password : password})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="envelope" style={{fontSize: 25, marginLeft: 15}} />
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({email : email})}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.submitRequest}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('Auth_login')}>
            <Text>Login</Text>
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
