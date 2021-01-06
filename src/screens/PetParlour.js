import React from 'react';
import {
  Text,
  Dimensions,
  Alert,
  TextInput,
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Label,
  Card,
  CardItem,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';


export default class PetParlour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: '',
      description: '',
      date: '',
      time: '',
    };
  }

  handleSubmit = async () => {
    var date = this.state.date.toString() + ' ' + this.state.time.toString();
    date = date.toString();
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
   
    const params = {
        problem: this.state.problem,
        description: this.state.description, 
        timeslot: date
    }
    axios.post('http://192.168.43.48:8000/api/appointment/', params, {
        headers:{
            'Authorization' : 'Token ' + token
        }
    });
    Alert.alert('Parlour Appointment Booked Succesfully!');
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <Container>
          <StatusBar backgroundColor="#fff"/>
        <CustomHeader navigation={this.props.navigation} title="Pet Parlour"/>
        <Content>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                margin: 10,
                borderBottomWidth: 2,
                borderBottomColor: '#d3d3d3',
              }}>  
              <Icon size={18} name="check-circle-outline" />
                 {''} Schedule an Appointment
            </Text>
          </View>
          <Form>
            <Card>
              <CardItem>
                <Item stackedLabel last>
                  <Label>Problem</Label>
                  <TextInput
                   placeholder="Short Description"
                    style={styles.inputStyle}
                    value={this.state.problem}
                    onChangeText={problem => this.setState({problem})
                  }
                  />
                </Item>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Item stackedLabel last>
                  <Label>Description</Label>
                  <TextInput
                    placeholder="Describe your problem"
                    style={styles.descriptionStyle}
                    value={this.state.description}
                    onChangeText={description => this.setState({description})}
                    multiline={true}
                  />
                </Item>
              </CardItem>
            </Card>
          </Form>
          <Card>
            <CardItem>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Pick Date</Text>
            </CardItem>
            <CardItem>
              <DatePicker
                style={{
                  width: Math.round(Dimensions.get('window').width) - 20,
                }}
                date={this.state.date}
                mode="date"
                // placeholder="select date"
                format="YYYY-MM-DD"
                // confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    marginLeft: 5,
                    borderColor: 'red',
                  },
                }}
                onDateChange={date => {
                  this.setState({date: date});
                }}
              />
            </CardItem>
            <CardItem>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Pick Time</Text>
            </CardItem>
            <CardItem>
              <DatePicker
                style={{
                  width: Math.round(Dimensions.get('window').width) - 20,
                }}
                date={this.state.time}
                mode="time"
                placeholder="select time"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require('../img/time_png.png')}
                customStyles={{
                  dateInput: {
                    marginLeft: 5,
                    borderColor: 'red',
                  },
                }}
                onDateChange={time => {
                  this.setState({time: time});
                }}
              />
            </CardItem>
          </Card>

          <Button onPress={this.handleSubmit} style={{margin: 20}} danger block>
            <Text style={{color: 'white', fontSize: 16}}>CONFIRM</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    width: Dimensions.get('window').width - 30,
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 10,
    borderColor: 'red',
    height: 50,
  },
  descriptionStyle: {
    width: Dimensions.get('window').width - 30,
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 10,
    borderColor: 'red',
    height: 70,
  },
});
