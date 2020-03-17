/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react'
import { createStackNavigator, createAppContainer, TabBarBottom } from "react-navigation"
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { AppNavigator } from './src/router/Navigator'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './src/redux/reducer';
import Player from './src/view/MusicPlay/Player'

const AppContainer = createAppContainer(AppNavigator);
const store = createStore(reducer)


const App = () => {
  return(
    <Provider store={store}>
        <AppContainer/>
        <Player/>
    </Provider>
  )
}

export default App
