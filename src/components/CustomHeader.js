import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const W = Dimensions.get('window').width - 50;

const CustomHeader = ({navigation}) => (
  <View style={styles.container}>
      <Icon
        style={{padding: 15, marginTop: 20}}
        name="menufold"
        size={28}
        color="#000"
        onPress={() => navigation.openDrawer()}
      />
    <Text
      style={{marginTop: 33, fontSize: 23, marginLeft: 10, fontWeight: 'bold'}}>
      {navigation.state.routeName}
    </Text>
    {navigation.state.routeName == 'Home' ?
        <View>
            <TouchableOpacity onPress = {() => navigation.navigate('Cart')} 
                style={{position: 'absolute', marginLeft: 180, marginTop: 32}}>
                <Icon name='shoppingcart' size={32}/>
            </TouchableOpacity>
        </View>
      : <View></View>}
  </View>
);

const styles = StyleSheet.create({
    container : {
    height : 80,
    flexDirection: 'row',
    },
})

export default CustomHeader;
