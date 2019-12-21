import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/screens/Home';
import PetFood from './src/screens/PetFood';

const MainNavigator = createStackNavigator({
  Home : {screen : Home},
  PetFood : {screen : PetFood}
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

const App = createAppContainer(MainNavigator);

export default App;