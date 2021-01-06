import React from 'react';
import {Text, View, StyleSheet, Alert, StatusBar} from 'react-native';
import {Form, Item, Input, Label, Card, CardItem, Button} from 'native-base';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends React.Component {
   constructor(props){
       super(props);
       this.state = {
           pincode : '',
           first_line : '',
           second_line : '',
           phone : '', 
           email: '',
       }
   }

  async componentDidMount(){
    this.fetchDetails();
  }

  fetchDetails = async () => {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    await axios.get(`http://192.168.43.48:8000/api/profile/${username}`, {
        headers:{
            'Authorization': 'Token ' + token
        }
    })
          .then(res => res.data[0])
          .then(res => this.setState({pincode: res['pincode'], first_line: res['first_line'], second_line: res['second_line'],
              phone: res['phone'], email: res['email']}))
          .catch(err => console.log(err));
    }

  postDetails = async () => {
    const username = 'test';
    const params = {
        pincode: this.state.pincode, 
        first_line: this.state.first_line,
        second_line: this.state.second_line,
        phone: this.state.phone, 
        email: this.state.email, 
        username: this.state.username,
    }

    await axios.post(`http://192.168.43.48:8000/api/profile/${username}/`, params);
    this.fetchDetails();

    Alert.alert("Profile Details Updated successfully!");
  }

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      height: 80,
    },
  };

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#fff"/>
          <CustomHeader navigation={this.props.navigation} title="Profile"/>
        <Text style={styles.heading}>Complete Your Profile</Text>
        <Form>
         <Item stackedLabel>
            <Label>Phone*</Label>
            <Input value={this.state.phone} onChangeText = {(text) => this.setState({phone: text})} keyboardType="number-pad" />
        </Item>
         <Item stackedLabel>
            <Label>Email*</Label>
            <Input value={this.state.email} onChangeText = {(text) => this.setState({email: text})} keyboardType="email-pad" />
        </Item>
          <Item stackedLabel>
            <Label>Pincode*</Label>
            <Input value={this.state.pincode} onChangeText = {(text) => this.setState({pincode : text})} keyboardType="number-pad" />
          </Item>
          <Item stackedLabel>
            <Label>House No., Building Name*</Label>
            <Input value={this.state.first_line} onChangeText = {(text) => this.setState({first_line : text})} />
          </Item>
          <Item stackedLabel>
            <Label>Road Name, Area, Colony*</Label>
            <Input value={this.state.second_line} onChangeText = {(text) => this.setState({second_line : text})}/>
          </Item>
          <Button
            onPress = {this.postDetails}
            style={{marginTop: 40, marginLeft: 15, marginRight: 15}}
            block
            danger>
            <Text style={{color: '#fff'}}>Save</Text>
          </Button>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 15,
    fontSize: 20,
    alignSelf: 'center',
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#a9a9a9',
  },
});
