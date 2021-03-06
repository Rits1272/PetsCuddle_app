import React from 'react';
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions, 
  FlatList
} from 'react-native';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import Filter from '../components/Filter';
import AsyncStorage from '@react-native-community/async-storage';

export default class PetMedicine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  fetchData = async () => {
    this.setState({loading: true});
    const token = await AsyncStorage.getItem('token');
    await axios
      .get('http://192.168.43.48:8000/api/products/petmedicine', {
            headers: {
                "Authorization": "Token " + token
            }
      })
      .then(res =>
        this.setState({
          data: res.data,
        }),
      )
    .catch(err => console.log(err));
    this.setState({loading: false});
  }

  async componentDidMount() {
    this.fetchData();
  }

  onRefresh = () => {
    this.fetchData();
  }

  _renderItem = ({item}) => {
        return(
        <View style={{marginTop: 15}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('DetailProduct', {
                  data: item,
                })}
              >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingTop: 5,
                  paddingBottom: 8,
                  borderBottomColor: '#d3d3d3',
                  borderBottomWidth: 1,
                }}>
                <View style={{flex: 0.3, marginLeft: 10}}>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 150, width: null}}
                  />
                </View>
                <View style={{flex: 0.7, margin: 20}}>
                  <Text style={{fontSize: 22, marginBottom: 7}}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={2} style={{marginBottom: 15}}>
                    {item.description}
                  </Text>
                  <Icon name="rupee" size={18}>
                    <Text style={{fontWeight: 'bold'}}>{item.price}</Text>
                  </Icon>
                </View>
              </View>
            </TouchableOpacity>
        </View>
        );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View>
        <CustomHeader navigation={this.props.navigation} />
        <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('SearchQuery', {
            fulldata : this.state.data,
          })}
        >
            <View style={[styles.ItemContainer, {borderWidth : 2 ,borderColor : '#ee7600',flexDirection : "row"}]}>
              <Icon name='search' size={22} color='#ee7600'/>
              <Text style={{marginLeft : 10, fontSize : 18, color:'#a9a9a9'}}>Search</Text>
            </View>
        </TouchableOpacity>
       <Filter navigation={this.props.navigation} />
       <FlatList
           data={this.state.data}
           extraData={this.state}
           renderItem={this._renderItem}
           onRefresh={this.onRefresh}
           refreshing={this.state.loading}
           keyExtractor={(item) => item.$t}
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
   ItemContainer : {
    width : Dimensions.get('window').width * 0.9,
    padding : 12,
    alignSelf : 'center',
    marginBottom : 10,
  },
})
