import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Container, Button} from 'native-base';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <Container style={{flex: 1, flexDirection: 'column'}}>
        <Button 
        onPress = {() => this.props.navigation.navigate('Treatment')}
        style={styles.btn} full danger>
          <Text style={{margin: 2, fontSize: 24, color: '#fff'}}>
            Treatment
          </Text>
        </Button>

        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Button
              onPress={() => this.props.navigation.navigate('PetFood')}
              style={styles.btn}
              block
              primary>
              <Text style={styles.btntext}>Pet Food</Text>
            </Button>
          </View>

          <View style={{flex: 1}}>
            <Button
              onPress={() => this.props.navigation.navigate('PetMedicine')}
              style={styles.btn}
              block
              primary>
              <Text style={styles.btntext}>Pet Medicine</Text>
            </Button>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Button
              onPress={() => this.props.navigation.navigate('PetParlour')}
              style={styles.btn}
              block
              primary>
              <Text style={styles.btntext}>Pet Parlour</Text>
            </Button>
          </View>

          <View style={{flex: 1}}>
            <Button
              onPress={() => this.props.navigation.navigate('PetFood')}
              style={styles.btn}
              block
              primary>
              <Text style={styles.btntext}>Pet Accessories</Text>
            </Button>
          </View>
        </View>
        <Button
          onPress={() => this.props.navigation.navigate('Contact')}
          style={{flex: 0.5, margin: 1}}
          full
          warning>
          <Text style={{margin: 2, fontSize: 24, color: '#fff'}}>Contact</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 0.8,
  },

  btntext: {
    color: '#fff',
    fontSize: 20,
  },

  btn: {
    margin: 0.6,
    flex: 1,
  },
});
