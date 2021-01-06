import React from 'react';
import CustomHeader from '../components/CustomHeader';
import {View, ActivityIndicator, StatusBar, FlatList, Image} from 'react-native';
import {Container, Card, CardItem, Text, Left, Right, H1, Button} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


export default class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [], 
            loading: true,
        };
    }

    async componentDidMount(){
        this.fetchData();
    }

    fetchData = async () => {
        const username = await AsyncStorage.getItem('username');
        const token = await AsyncStorage.getItem('token');
        this.setState({loading: true});
        await axios.get(`http://192.168.43.48:8000/api/cart/${username}`, {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
        .then(res => this.setState({data: res.data}))
        .catch(err => console.log(err));
        this.setState({loading: false});
    }

    onRefresh = () => {
        this.fetchData();
    }

    remove = async (name) => {
      const username = await AsyncStorage.getItem('username');
      const token = await AsyncStorage.getItem('token');
      const params = {
        name: name,
      };
      axios.post(`http://192.168.43.48:8000/api/cart/${username}/`, params, {
            headers:{
                'Authorization' : 'Token ' + token
            }
      });
      this.onRefresh()
  }
    
    _renderItem = ({item}) => {
        const name_of_product = item.name;
        return(
            <View style={{flex:1}}>
            <View style={{flex:1, flexDirection:'row', marginTop: 10}}>
                <View style={{flex: 0.7, marginLeft: 10, marginRight: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
                    <Text style={{color: "#a3a3a3", marginBottom: 15}}>{item.category}</Text>
                    <Icon name='rupee' size={18} style={{marginBottom: 10}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.price}</Text>
                    </Icon>
                    <Text numberOfLines={2}>{item.description}</Text>
                </View>
                <View style={{flex: 0.3, paddingRight: 10}}>
                   <Image
                       source={{uri: item.image}}
                       style={{height:120, width:null, flex:1}}
                    />
                </View>
            </View>
                <Button onPress={() => this.remove(name_of_product)} 
                    danger style={{flex: 1, margin: 5, marginTop: 10,  justifyContent: 'center'}}>
                    <Text>Remove</Text>
                </Button>
            </View>
        )
    }

    render(){
        if (this.state.loading){
            return(
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        }
        return(
            <Container style={{flex:1}}>
                <StatusBar backgroundColors="#fff"/>
                 <CustomHeader navigation={this.props.navigation} title="Cart"/>
                 <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.loading}
                    keyExtractor={(item) => item.$t}
                />
            </Container>
        );
    }
}
