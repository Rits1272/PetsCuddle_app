import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/screens/Home';

const MainNavigator = createStackNavigator({
  Home : {screen : Home}
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