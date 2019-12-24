import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/screens/Home';
import PetFood from './src/screens/PetFood';
import PetMedicine from './src/screens/PetMedicine';
import PetParlour from './src/screens/PetParlour';
import PetAccessories from './src/screens/PetAccessories';
import DetailProduct from './src/screens/DetailProduct';
import SplashScreen from './src/screens/SplashScreen';
import Auth_login from './src/screens/Auth_login';
import Auth_register from './src/screens/Auth_register';



const MainNavigator = createStackNavigator({
  Auth_login : {screen : Auth_login},
  Auth_register : {screen : Auth_register},
  Home : {screen : Home},
  PetFood : {screen : PetFood},
  PetMedicine : {screen : PetMedicine},
  PetParlour : {screen : PetParlour},
  PetAccessories : {screen : PetAccessories},
  DetailProduct : {screen : DetailProduct},
},{
defaultNavigationOptions:{
  headerStyle:{
    backgroundColor : '#021592',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight : 'bold',
  }
}
})

const InitialNavigator = createSwitchNavigator({
  Splash : SplashScreen,
  App : MainNavigator
})

export default createAppContainer(InitialNavigator);