// App.js
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Cart from './components/cart';
import Shop from './components/shop';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator(
  {
    ShopScr: {
      screen: Shop,
    },
    CartScr: {
      screen: Cart,
    },
  },
  {
    initialRouteName: 'ShopScr',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);
