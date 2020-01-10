import React from 'react';
import {Text, Dimensions, Alert} from 'react-native';
import {
  Container,
  Input,
  Button,
  Content,
  Form,
  Item,
  Label,
  H1,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';

export default class Treatment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: '',
      description: '',
      date: '',
      time: '',
    };
  }

  handleSubmit = () => {    
      var date = this.state.date.toString() + ' ' + this.state.time.toString()
      date = date.toString();
      axios.post('http://192.168.43.48:8000/api/appointment/', {
          problem : this.state.problem,
          description : this.state.description,
          timeslot : date
      })
      Alert.alert('Appointment Booked Succesfully!');
      this.props.navigation.navigate('Home');

    }

  render() {
    return (
      <Container>
        <CustomHeader navigation={this.props.navigation} />
        <Content>
          <H1
            style={{
              textAlign: 'center',
              marginTop: 15,
              marginBottom: 20,
              fontFamily: 'serif',
              width : Dimensions.get('window').width
            }}>
            Schedule An Appointment
          </H1>
          <Form>
            <Item stackedLabel last>
              <Label>Problem</Label>
              <Input 
              value={this.state.problem}
              onChangeText={(problem) => this.setState({problem})} />
            </Item>
            <Item stackedLabel last>
              <Label>Description</Label>
              <Input
                value={this.state.description}
                onChangeText={(description) => this.setState({description})}
                multiline={true}
              />
            </Item>
          </Form>

          <DatePicker
            style={{
              width: Math.round(Dimensions.get('window').width) - 5,
              marginTop: 15,
            }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={date => {
              this.setState({date: date});
              }
            }
          />
          <DatePicker
            style={{
              width: Math.round(Dimensions.get('window').width) - 5,
              marginTop: 15,
              marginBottom: 20,
            }}
            date={this.state.time}
            mode="time"
            placeholder="select time"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require('../img/time.jpg')}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={time => {
              this.setState({time: time});
            }}
          />
          <Button 
          onPress = {this.handleSubmit}
          style={{margin: 12}} success block>
            <Text style={{color: 'white', fontSize: 19}}>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
