import React from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Left,
  Right,
  H1,
} from 'native-base';
import {Text, Image, ScrollView, TouchableHighlight, ActivityIndicator, View} from 'react-native';
import axios from 'axios';
import Search from '../components/Search';

export default class PetFood extends React.Component {
  static navigationOptions = {
    title: 'Pet Food',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading : true,
    };
  }

  async componentDidMount() {
    await axios.get('http://192.168.43.48:8000/api/products/petfood')
      .then(res =>
        this.setState({
          data: res.data,
          loading : false
        }),
      )
      .catch(err => console.log(err));
  }

  render() {
      if(this.state.loading){
          return (
          <View style={{flex: 1,
            alignItems: 'center', 
            justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>)
      }
    return (
      <ScrollView>
          <Search />
        {this.state.data.map(data => (
            <TouchableHighlight
            onPress={()=> this.props.navigation.navigate('DetailProduct', {
              data : data
            })}
            >
           <Content>
           <Card>
             <CardItem cardBody>
               <Image 
               source={{uri: data.image}} style={{height: 350, width: null, flex: 1}}/>
             </CardItem>
             <CardItem>
               <Left>
                 <Button bordered dark>
                   <H1 style={{margin : 5}}>{data.name}</H1>
                 </Button>
               </Left>
               <Right>
                   <Button bordered success >
                 <H1 style={{margin : 5}}>Rs. {data.price}</H1>
                 </Button>
               </Right>
             </CardItem>
           </Card>
         </Content>
         </TouchableHighlight>
        ))}
      </ScrollView>
    );
  }
}
