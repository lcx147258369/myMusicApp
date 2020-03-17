import React from 'react'
import { createStackNavigator, createAppContainer } from "react-navigation"
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import color from '../unit/color'
import Home from '../view/Home/Home'
import User from '../view/User/User'
import MusicPlay from '../view/MusicPlay/MusicPlay'
import Icon from 'react-native-vector-icons/Feather'


const tabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
          Home: {
            screen: Home
          }
      }),
      navigationOptions: ({navigation}) => ({
        header: null,
        tabBarLabel: '首页',
        tabBarColor: color.theme,
        tabBarIcon: ({tintColor, focused}) => {
          return <Icon name={'list'} size={24} color={tintColor} />
        }
      })
    },
    User: {
      screen: createStackNavigator({
        screen: User
      }),
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '用户',
        tabBarColor: color.theme,
        tabBarIcon: ({tintColor, focused}) => {
          return <Icon name={'user'} size={24} color={tintColor}/>
        }
      })
    }
  },
  {
    tabBarOptions: {
      initialRouteName: 'Home',
      lazy: true,
      activeTintColor: color.theme,
      showIcon: true
    }
  }
)



const AppNavigator = createStackNavigator(
  { 
    Tab: {
      screen: tabNavigator,
      navigationOptions: {
        header: null
      }
    },
    MusicPlay: {
      screen: MusicPlay
    }
  },
  {
    navigationOptions: {
      showIcon: false,
      headerStyle: {
        backgroundColor: color.theme
      }
    }
  }
)

export {
  AppNavigator
}